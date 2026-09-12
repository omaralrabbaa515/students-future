-- 1) إسقاط السياسات المعتمدة على دالة has_role والدالة نفسها (SECURITY DEFINER)
DROP POLICY IF EXISTS "admins append change log" ON public.change_log;
DROP POLICY IF EXISTS "admins read change log" ON public.change_log;
DROP POLICY IF EXISTS "admins manage overrides" ON public.data_overrides;
DROP POLICY IF EXISTS "admins manage pending changes" ON public.pending_changes;
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- 2) إسقاط سياسات القراءة العامة للجداول الداخلية
DROP POLICY IF EXISTS "public read overrides" ON public.data_overrides;
DROP POLICY IF EXISTS "public read link checks" ON public.link_checks;
DROP POLICY IF EXISTS "public read scan runs" ON public.scan_runs;

-- 3) إلغاء منح القراءة للزوار غير المسجلين
REVOKE SELECT ON public.data_overrides FROM anon;
REVOKE SELECT ON public.link_checks FROM anon;
REVOKE SELECT ON public.scan_runs FROM anon;

-- 4) سياسات المشرفين بتحقق مباشر من جدول الأدوار (بدون SECURITY DEFINER)
CREATE POLICY "admins append change log" ON public.change_log
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "admins read change log" ON public.change_log
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "admins manage overrides" ON public.data_overrides
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "admins manage pending changes" ON public.pending_changes
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "admins read link checks" ON public.link_checks
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "admins read scan runs" ON public.scan_runs
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- 5) سياسة صريحة تمنع أي وصول برمجي لرموز الفحص (الخادم يتجاوزها بصلاحية service_role)
CREATE POLICY "deny all api access to scan tokens" ON public.scan_tokens
  FOR ALL TO anon, authenticated
  USING (false)
  WITH CHECK (false);