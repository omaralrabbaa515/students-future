CREATE TABLE public.scan_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.scan_tokens TO service_role;
ALTER TABLE public.scan_tokens ENABLE ROW LEVEL SECURITY;
INSERT INTO public.scan_tokens (token) VALUES (encode(gen_random_bytes(32), 'hex'));