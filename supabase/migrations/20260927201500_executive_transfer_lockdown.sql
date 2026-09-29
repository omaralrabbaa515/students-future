-- 1) تأكيد الصلاحيات الإدارية الكاملة للحسابات المعتمدة
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::public.app_role
FROM auth.users u
WHERE lower(u.email) IN ('jowmahmoud6@gmail.com', 'mralrba0@gmail.com')
ON CONFLICT (user_id, role) DO NOTHING;

-- 3) إنشاء جدول التنبيهات الأمنية وسجل محاولات العبث بالحساب التنفيذي
CREATE TABLE IF NOT EXISTS public.security_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type text NOT NULL,
  attempted_by text,
  target_account text,
  details text NOT NULL,
  ip_address text,
  created_at timestamptz NOT NULL DEFAULT now(),
  is_resolved boolean NOT NULL DEFAULT false
);

GRANT SELECT, INSERT, UPDATE ON public.security_alerts TO authenticated;
GRANT ALL ON public.security_alerts TO service_role;
ALTER TABLE public.security_alerts ENABLE ROW LEVEL SECURITY;

-- سياسة قراءة التنبيهات الأمنية: للمشرف التنفيذي المعتمد فقط
CREATE POLICY "admin view security alerts" ON public.security_alerts
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN auth.users u ON u.id = ur.user_id
    WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
      AND lower(u.email) IN ('jowmahmoud6@gmail.com', 'mralrba0@gmail.com')
  ));

CREATE POLICY "admin update security alerts" ON public.security_alerts
  FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN auth.users u ON u.id = ur.user_id
    WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
      AND lower(u.email) IN ('jowmahmoud6@gmail.com', 'mralrba0@gmail.com')
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN auth.users u ON u.id = ur.user_id
    WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
      AND lower(u.email) IN ('jowmahmoud6@gmail.com', 'mralrba0@gmail.com')
  ));

-- 4) دالة قفل الحساب التنفيذي ومنع أي محاولة تغيير أو ترقية أو حذف للحسابات الإدارية المعتمدة
CREATE OR REPLACE FUNCTION public.lock_executive_account()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  v_target_email text;
  v_actor_email text;
BEGIN
  v_actor_email := coalesce(current_setting('request.jwt.claims', true)::jsonb ->> 'email', 'system');

  -- عند الإضافة أو التعديل
  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
    SELECT lower(email) INTO v_target_email FROM auth.users WHERE id = NEW.user_id;
    IF NEW.role = 'admin' AND coalesce(v_target_email, '') NOT IN ('jowmahmoud6@gmail.com', 'mralrba0@gmail.com') THEN
      INSERT INTO public.security_alerts (
        alert_type,
        attempted_by,
        target_account,
        details
      ) VALUES (
        'UNAUTHORIZED_ADMIN_ELEVATION_ATTEMPT',
        v_actor_email,
        v_target_email,
        'محاولة غير مصرح بها لمنح صلاحيات تنفيذية للحساب: ' || coalesce(v_target_email, 'unknown')
      );
      RAISE EXCEPTION 'محظور أمنياً: الحساب التنفيذي للمنصة مقفل للمشرفين المعتمدين ويمنع تعيين أي حساب آخر.';
    END IF;
    RETURN NEW;
  END IF;

  -- عند الحذف
  IF (TG_OP = 'DELETE') THEN
    SELECT lower(email) INTO v_target_email FROM auth.users WHERE id = OLD.user_id;
    IF OLD.role = 'admin' AND coalesce(v_target_email, '') IN ('jowmahmoud6@gmail.com', 'mralrba0@gmail.com') THEN
      INSERT INTO public.security_alerts (
        alert_type,
        attempted_by,
        target_account,
        details
      ) VALUES (
        'EXECUTIVE_ACCOUNT_REMOVAL_ATTEMPT',
        v_actor_email,
        v_target_email,
        'محاولة محظورة لسحب الصلاحيات التنفيذية من الحساب الإداري المعتمد: ' || coalesce(v_target_email, '')
      );
      RAISE EXCEPTION 'محظور أمنياً: لا يمكن حذف أو تعديل صلاحيات الحسابات التنفيذية المعتمدة.';
    END IF;
    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$;

-- ربط الـ Trigger بجدول user_roles
DROP TRIGGER IF EXISTS trg_lock_executive_account ON public.user_roles;
CREATE TRIGGER trg_lock_executive_account
BEFORE INSERT OR UPDATE OR DELETE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.lock_executive_account();
