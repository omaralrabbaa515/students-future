import { createServerFn } from "@tanstack/react-start";

import {
  EMPTY_PLATFORM_META,
  type LinkCheckRow,
  type MajorReviewRow,
  type OverrideRow,
  type PlatformMeta,
  type ScanRunRow,
  type SourceRow,
} from "@/lib/platform-data";

let cachedPlatformMeta: { data: PlatformMeta; timestamp: number } | null = null;
const CACHE_TTL_MS = 1000 * 60 * 5; // كاش خادمي فوري لمدة 5 دقائق لضمان سرعة التنقل 0ms

/** قراءة عامة للبيانات المعتمدة وحالة الروابط وتواريخ آخر تحديث مع كاش فوري */
export const getPlatformMeta = createServerFn({ method: "GET" }).handler(
  async (): Promise<PlatformMeta> => {
    if (cachedPlatformMeta && Date.now() - cachedPlatformMeta.timestamp < CACHE_TTL_MS) {
      return cachedPlatformMeta.data;
    }

    // قراءة خادمية بصلاحيات كاملة — الجداول الداخلية لم تعد متاحة للقراءة العامة المباشرة
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const supabase = supabaseAdmin;

    try {
      const [overrides, linkChecks, sources, scans, reviews] = await Promise.all([
        supabase
          .from("data_overrides")
          .select("entity_type, entity_id, field, value, source_url, updated_at"),
        supabase
          .from("link_checks")
          .select("certification_id, ok, http_status, checked_at, last_ok_at"),
        supabase.from("sources").select("key, name, url, last_reviewed_at, last_status"),
        supabase
          .from("scan_runs")
          .select(
            "id, started_at, finished_at, status, sources_checked, links_checked, broken_links, changes_found, reviewed_majors, status_changes",
          )
          .order("started_at", { ascending: false })
          .limit(1),
        supabase.from("major_reviews").select("slug, last_reviewed_at"),
      ]);

      const data: PlatformMeta = {
        overrides: (overrides.data ?? []) as OverrideRow[],
        linkChecks: (linkChecks.data ?? []) as LinkCheckRow[],
        sources: (sources.data ?? []) as SourceRow[],
        lastScan: ((scans.data ?? [])[0] ?? null) as ScanRunRow | null,
        majorReviews: (reviews.data ?? []) as MajorReviewRow[],
      };

      cachedPlatformMeta = { data, timestamp: Date.now() };
      return data;
    } catch {
      return cachedPlatformMeta?.data ?? EMPTY_PLATFORM_META;
    }
  },
);
