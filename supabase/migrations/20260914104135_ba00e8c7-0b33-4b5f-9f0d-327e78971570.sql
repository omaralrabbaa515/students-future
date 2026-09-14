CREATE TABLE public.major_reviews (
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

GRANT SELECT ON public.major_reviews TO anon;
GRANT SELECT ON public.major_reviews TO authenticated;
GRANT ALL ON public.major_reviews TO service_role;

ALTER TABLE public.major_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read major reviews" ON public.major_reviews
  FOR SELECT TO anon, authenticated USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_major_reviews_updated_at
BEFORE UPDATE ON public.major_reviews
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.scan_runs ADD COLUMN reviewed_majors integer NOT NULL DEFAULT 0;
ALTER TABLE public.scan_runs ADD COLUMN status_changes integer NOT NULL DEFAULT 0;