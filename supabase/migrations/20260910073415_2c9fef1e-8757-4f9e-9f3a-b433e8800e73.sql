-- الأدوار
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- القيم المعتمدة الظاهرة للطلبة
CREATE TABLE public.data_overrides (
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
GRANT SELECT ON public.data_overrides TO anon, authenticated;
GRANT ALL ON public.data_overrides TO service_role;
ALTER TABLE public.data_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read overrides" ON public.data_overrides FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins manage overrides" ON public.data_overrides FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- عمليات الفحص
CREATE TABLE public.scan_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  trigger text NOT NULL DEFAULT 'cron',
  status text NOT NULL DEFAULT 'running',
  sources_checked integer NOT NULL DEFAULT 0,
  links_checked integer NOT NULL DEFAULT 0,
  broken_links integer NOT NULL DEFAULT 0,
  changes_found integer NOT NULL DEFAULT 0,
  error text
);
GRANT SELECT ON public.scan_runs TO anon, authenticated;
GRANT ALL ON public.scan_runs TO service_role;
ALTER TABLE public.scan_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read scan runs" ON public.scan_runs FOR SELECT TO anon, authenticated USING (true);

-- التغييرات المقترحة
CREATE TABLE public.pending_changes (
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
CREATE POLICY "admins manage pending changes" ON public.pending_changes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- سجل التحديثات الدائم
CREATE TABLE public.change_log (
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
CREATE POLICY "admins read change log" ON public.change_log FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins append change log" ON public.change_log FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- فحص روابط الشهادات
CREATE TABLE public.link_checks (
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
CREATE POLICY "public read link checks" ON public.link_checks FOR SELECT TO anon, authenticated USING (true);

-- المصادر الرسمية وتاريخ آخر مراجعة
CREATE TABLE public.sources (
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
CREATE POLICY "public read sources" ON public.sources FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.sources (key, name, url) VALUES
  ('csb', 'ديوان الخدمة المدنية والإدارة العامة', 'https://csb.gov.jo'),
  ('dos', 'دائرة الإحصاءات العامة', 'https://dosweb.dos.gov.jo'),
  ('mohe', 'وزارة التعليم العالي والبحث العلمي', 'https://mohe.gov.jo'),
  ('sajjil', 'منصة سجّل الوطنية للتشغيل', 'https://sajjil.gov.jo'),
  ('bayt', 'منصات تحليل سوق العمل الإقليمية', 'https://www.bayt.com');
