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

/** قراءة عامة للبيانات المعتمدة وحالة الروابط وتواريخ آخر تحديث */
export const getPlatformMeta = createServerFn({ method: "GET" }).handler(
  async (): Promise<PlatformMeta> => {
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

      return {
        overrides: (overrides.data ?? []) as OverrideRow[],
        linkChecks: (linkChecks.data ?? []) as LinkCheckRow[],
        sources: (sources.data ?? []) as SourceRow[],
        lastScan: ((scans.data ?? [])[0] ?? null) as ScanRunRow | null,
        majorReviews: (reviews.data ?? []) as MajorReviewRow[],
      };
    } catch {
      return EMPTY_PLATFORM_META;
    }
  },
);
