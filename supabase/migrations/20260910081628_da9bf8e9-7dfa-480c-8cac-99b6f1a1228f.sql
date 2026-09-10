-- data_overrides: الزائر يرى القيمة ومصدرها وتاريخها فقط
REVOKE SELECT ON public.data_overrides FROM anon;
GRANT SELECT (entity_type, entity_id, field, value, source_url, updated_at) ON public.data_overrides TO anon;

-- scan_runs: الزائر يرى التواريخ والأعداد فقط (بلا رسائل خطأ أو مصدر التشغيل)
REVOKE SELECT ON public.scan_runs FROM anon;
GRANT SELECT (id, started_at, finished_at, status, sources_checked, links_checked, broken_links, changes_found) ON public.scan_runs TO anon;

-- link_checks: الزائر يرى حالة الرابط وتواريخه فقط (بلا رسالة الخطأ الداخلية)
REVOKE SELECT ON public.link_checks FROM anon;
GRANT SELECT (certification_id, url, ok, http_status, checked_at, last_ok_at) ON public.link_checks TO anon;