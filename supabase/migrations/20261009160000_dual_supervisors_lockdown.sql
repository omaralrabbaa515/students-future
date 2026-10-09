-- ==============================================================================
-- الهجرة الأمنية: اعتماد المشرفين بالتساوي وإلغاء تصنيف الحساب التنفيذي
-- المشرفون المعتمدون: mralrba0@gmail.com و jowmahmoud6@gmail.com
-- كلاهما يتمتعان بكامل الصلاحيات الإشرافية المتساوية ومحميان بنظام القفل الأمني
-- ==============================================================================

-- 1) إلغاء أي صلاحيات إشرافية لأي حسابات غير المشرفين المعتمدين
DELETE FROM public.user_roles
WHERE role = 'admin'
  AND user_id NOT IN (
    SELECT id FROM auth.users WHERE lower(email) IN ('mralrba0@gmail.com', 'jowmahmoud6@gmail.com')
  );

-- 2) منح وتأكيد صلاحية الإشراف للمشرفين الاثنين إذا كانا مسجلين في auth.users
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::public.app_role
FROM auth.users u
WHERE lower(u.email) IN ('mralrba0@gmail.com', 'jowmahmoud6@gmail.com')
ON CONFLICT (user_id, role) DO NOTHING;

-- 3) تحديث سياسات الأمان (RLS) لجدول security_alerts لتشمل كلا المشرفين
DROP POLICY IF EXISTS "admin view security alerts" ON public.security_alerts;
CREATE POLICY "admin view security alerts" ON public.security_alerts
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN auth.users u ON u.id = ur.user_id
    WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
      AND lower(u.email) IN ('mralrba0@gmail.com', 'jowmahmoud6@gmail.com')
  ));

DROP POLICY IF EXISTS "admin update security alerts" ON public.security_alerts;
CREATE POLICY "admin update security alerts" ON public.security_alerts
  FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN auth.users u ON u.id = ur.user_id
    WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
      AND lower(u.email) IN ('mralrba0@gmail.com', 'jowmahmoud6@gmail.com')
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN auth.users u ON u.id = ur.user_id
    WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
      AND lower(u.email) IN ('mralrba0@gmail.com', 'jowmahmoud6@gmail.com')
  ));

-- 4) تحديث دالة وقفل أمان المشرفين (Database Lock Trigger) لحماية كلا المشرفين
CREATE OR REPLACE FUNCTION public.lock_supervisors_accounts()
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
    IF NEW.role = 'admin' AND coalesce(v_target_email, '') NOT IN ('mralrba0@gmail.com', 'jowmahmoud6@gmail.com') THEN
      INSERT INTO public.security_alerts (
        alert_type,
        attempted_by,
        target_account,
        details
      ) VALUES (
        'UNAUTHORIZED_ADMIN_ELEVATION_ATTEMPT',
        v_actor_email,
        v_target_email,
        'محاولة غير مصرح بها لمنح صلاحيات إشراف للحساب: ' || coalesce(v_target_email, 'unknown')
      );
      RAISE EXCEPTION 'محظور أمنياً: صلاحيات الإشراف على المنصة مقفلة حصرياً للمشرفين المعتمدين (mralrba0@gmail.com و jowmahmoud6@gmail.com).';
    END IF;
    RETURN NEW;
  END IF;

  -- عند الحذف
  IF (TG_OP = 'DELETE') THEN
    SELECT lower(email) INTO v_target_email FROM auth.users WHERE id = OLD.user_id;
    IF OLD.role = 'admin' AND coalesce(v_target_email, '') IN ('mralrba0@gmail.com', 'jowmahmoud6@gmail.com') THEN
      INSERT INTO public.security_alerts (
        alert_type,
        attempted_by,
        target_account,
        details
      ) VALUES (
        'SUPERVISOR_ACCOUNT_REMOVAL_ATTEMPT',
        v_actor_email,
        v_target_email,
        'محاولة محظورة لسحب الصلاحيات الإشرافية من المشرف المعتمد: ' || coalesce(v_target_email, 'unknown')
      );
      RAISE EXCEPTION 'محظور أمنياً: لا يمكن حذف أو تعديل صلاحيات مشرفي المنصة المعتمدين.';
    END IF;
    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$;

-- استبدال وتحديث الـ Trigger القديم
DROP TRIGGER IF EXISTS trg_lock_executive_account ON public.user_roles;
DROP TRIGGER IF EXISTS trg_lock_supervisors_accounts ON public.user_roles;

CREATE TRIGGER trg_lock_supervisors_accounts
BEFORE INSERT OR UPDATE OR DELETE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.lock_supervisors_accounts();

-- توثيق العملية في سجل التغييرات والتدقيق
INSERT INTO public.change_log (
  entity_type,
  entity_id,
  entity_label,
  field,
  field_label,
  old_value,
  new_value,
  action,
  actor,
  note
) VALUES (
  'security',
  'supervisors_lockdown',
  'مشرفو المنصة',
  'supervisors_role',
  'اعتماد المشرفين',
  'حساب تنفيذي منفرد',
  'mralrba0@gmail.com, jowmahmoud6@gmail.com',
  'اعتماد مشرفي المنصة بالتساوي',
  'النظام الأمني',
  'تم اعتماد كلا البريدين كمشرفين رسميين للمنصة بكامل الصلاحيات المتساوية وإلغاء تصنيف الحساب التنفيذي وتفعيل القفل الأمني المشدد.'
);
