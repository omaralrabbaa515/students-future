-- ============================================================================
-- منصة الطلاب والمستقبل | سكربت التهيئة الكامل لقاعدة بيانات Supabase
-- تشغيل هذا السكربت في Supabase SQL Editor لإنشاء كافة الجداول والسياسات والصلاحيات
-- ============================================================================

-- 1. تفعيل الإضافات اللازمة
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. إنشاء نوع دور المستخدم
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. جدول أدوار المستخدمين (User Roles)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users read own roles" ON public.user_roles;
CREATE POLICY "users read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- دالة التحقق من دور المستخدم
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 4. جدول عمليات الفحص (Scan Runs)
CREATE TABLE IF NOT EXISTS public.scan_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  trigger text NOT NULL DEFAULT 'cron',
  status text NOT NULL DEFAULT 'running',
  sources_checked integer NOT NULL DEFAULT 0,
  links_checked integer NOT NULL DEFAULT 0,
  broken_links integer NOT NULL DEFAULT 0,
  changes_found integer NOT NULL DEFAULT 0,
  reviewed_majors integer NOT NULL DEFAULT 0,
  status_changes integer NOT NULL DEFAULT 0,
  error text
);
GRANT SELECT ON public.scan_runs TO anon, authenticated;
GRANT ALL ON public.scan_runs TO service_role;
ALTER TABLE public.scan_runs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read scan runs" ON public.scan_runs;
CREATE POLICY "public read scan runs" ON public.scan_runs
  FOR SELECT TO anon, authenticated USING (true);

-- 5. جدول القيم المعتمدة الظاهرة للطلبة (Data Overrides)
CREATE TABLE IF NOT EXISTS public.data_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  field text NOT NULL,
  value text NOT NULL,
  source_url text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by text NOT NULL DEFAULT 'admin',
  UNIQUE (entity_type, entity_id, field)
);
-- منح القراءة العامة للزوار حتى تظهر التحديثات ولا تبقى معلقة بـ "لم يُسجَّل بعد"
GRANT SELECT ON public.data_overrides TO anon, authenticated;
GRANT ALL ON public.data_overrides TO service_role;
ALTER TABLE public.data_overrides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read overrides" ON public.data_overrides;
CREATE POLICY "public read overrides" ON public.data_overrides
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admins manage overrides" ON public.data_overrides;
CREATE POLICY "admins manage overrides" ON public.data_overrides
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- 6. جدول التغييرات المقترحة (Pending Changes)
CREATE TABLE IF NOT EXISTS public.pending_changes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_run_id uuid REFERENCES public.scan_runs(id) ON DELETE SET NULL,
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  entity_label text NOT NULL,
  field text NOT NULL,
  field_label text NOT NULL,
  old_value text NOT NULL DEFAULT '',
  new_value text NOT NULL,
  source_url text,
  note text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  decided_at timestamptz,
  decided_by uuid
);
GRANT SELECT, INSERT, UPDATE ON public.pending_changes TO authenticated;
GRANT ALL ON public.pending_changes TO service_role;
ALTER TABLE public.pending_changes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admins manage pending changes" ON public.pending_changes;
CREATE POLICY "admins manage pending changes" ON public.pending_changes
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- 7. سجل التحديثات الدائم (Change Log)
CREATE TABLE IF NOT EXISTS public.change_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  entity_label text NOT NULL,
  field text NOT NULL,
  field_label text NOT NULL,
  old_value text NOT NULL DEFAULT '',
  new_value text NOT NULL DEFAULT '',
  action text NOT NULL,
  actor text NOT NULL,
  source_url text,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.change_log TO authenticated;
GRANT ALL ON public.change_log TO service_role;
ALTER TABLE public.change_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admins read change log" ON public.change_log;
CREATE POLICY "admins read change log" ON public.change_log
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "admins append change log" ON public.change_log;
CREATE POLICY "admins append change log" ON public.change_log
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- 8. جدول فحص روابط الشهادات (Link Checks)
CREATE TABLE IF NOT EXISTS public.link_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  certification_id text NOT NULL UNIQUE,
  url text NOT NULL,
  ok boolean NOT NULL DEFAULT true,
  http_status integer,
  error text,
  checked_at timestamptz NOT NULL DEFAULT now(),
  last_ok_at timestamptz
);
GRANT SELECT ON public.link_checks TO anon, authenticated;
GRANT ALL ON public.link_checks TO service_role;
ALTER TABLE public.link_checks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read link checks" ON public.link_checks;
CREATE POLICY "public read link checks" ON public.link_checks
  FOR SELECT TO anon, authenticated USING (true);

-- 9. جدول المصادر الرسمية (Sources)
CREATE TABLE IF NOT EXISTS public.sources (
  key text PRIMARY KEY,
  name text NOT NULL,
  url text NOT NULL,
  last_reviewed_at timestamptz,
  last_status text,
  last_note text
);
GRANT SELECT ON public.sources TO anon, authenticated;
GRANT ALL ON public.sources TO service_role;
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read sources" ON public.sources;
CREATE POLICY "public read sources" ON public.sources
  FOR SELECT TO anon, authenticated USING (true);

-- إدخال المصادر الرسمية المحدثة (مع استبدال ديوان الخدمة برابط هيئة الخدمة والإدارة العامة الجديد)
INSERT INTO public.sources (key, name, url) VALUES
  ('spac', 'هيئة الخدمة والإدارة العامة (ديوان الخدمة سابقاً)', 'https://www.spac.gov.jo'),
  ('dos', 'دائرة الإحصاءات العامة', 'https://dosweb.dos.gov.jo'),
  ('mohe', 'وزارة التعليم العالي والبحث العلمي', 'https://mohe.gov.jo'),
  ('sajjil', 'منصة سجّل الوطنية للتشغيل', 'https://sajjil.gov.jo'),
  ('bayt', 'منصات تحليل سوق العمل الإقليمية', 'https://www.bayt.com')
ON CONFLICT (key) DO UPDATE SET
  name = EXCLUDED.name,
  url = EXCLUDED.url;

-- 10. جدول مراجعة التخصصات (Major Reviews)
CREATE TABLE IF NOT EXISTS public.major_reviews (
  slug text PRIMARY KEY,
  last_reviewed_at timestamp with time zone NOT NULL DEFAULT now(),
  last_scan_run_id uuid REFERENCES public.scan_runs(id) ON DELETE SET NULL,
  inferred_classification text,
  inferred_risk text,
  inferred_employment_rate text,
  evidence text,
  source_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT SELECT ON public.major_reviews TO anon, authenticated;
GRANT ALL ON public.major_reviews TO service_role;
ALTER TABLE public.major_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read major reviews" ON public.major_reviews;
CREATE POLICY "public read major reviews" ON public.major_reviews
  FOR SELECT TO anon, authenticated USING (true);

-- دالة ومحفز تحديث التاريخ
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

DROP TRIGGER IF EXISTS update_major_reviews_updated_at ON public.major_reviews;
CREATE TRIGGER update_major_reviews_updated_at
BEFORE UPDATE ON public.major_reviews
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 11. دالة تفعيل المشرف تلقائياً للحساب المحدد
-- تقوم هذه الدالة بتعيين الحساب المحدد كمشرف تلقائياً بمجرد تسجيله
CREATE OR REPLACE FUNCTION public.handle_admin_assignment()
RETURNS trigger AS $$
BEGIN
  IF lower(NEW.email) IN ('jowmahmoud6@gmail.com', 'mralrba0@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::public.app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_assign_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_assign_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_admin_assignment();

-- في حال كان الحساب موجوداً بالفعل مسبقاً في auth.users يتم تعيينه فوراً
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::public.app_role FROM auth.users u
WHERE lower(u.email) IN ('jowmahmoud6@gmail.com', 'mralrba0@gmail.com')
ON CONFLICT (user_id, role) DO NOTHING;
