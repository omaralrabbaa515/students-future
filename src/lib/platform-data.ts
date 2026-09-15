/** الحقول القابلة للتحديث الآلي في بيانات التخصصات */
export const MAJOR_FIELDS = ["employmentRate", "classification", "risk"] as const;
export type MajorField = (typeof MAJOR_FIELDS)[number];

export const FIELD_LABELS: Record<string, string> = {
  employmentRate: "تقدير نسبة التشغيل (أول سنتين)",
  classification: "التصنيف في سوق العمل",
  risk: "مستوى الخطر",
  url: "رابط الشهادة",
  content: "محتوى صفحة المصدر",
};

export const ENTITY_LABELS: Record<string, string> = {
  major: "تخصص",
  certification: "شهادة",
  source: "مصدر رسمي",
};

export type OverrideRow = {
  entity_type: string;
  entity_id: string;
  field: string;
  value: string;
  source_url: string | null;
  updated_at: string;
};

export type LinkCheckRow = {
  certification_id: string;
  ok: boolean;
  http_status: number | null;
  error?: string | null;
  checked_at: string;
  last_ok_at: string | null;
};

export type SourceRow = {
  key: string;
  name: string;
  url: string;
  last_reviewed_at: string | null;
  last_status: string | null;
};

export type ScanRunRow = {
  id: string;
  started_at: string;
  finished_at: string | null;
  trigger?: string;
  status: string;
  sources_checked: number;
  links_checked: number;
  broken_links: number;
  changes_found: number;
  reviewed_majors?: number;
  status_changes?: number;
  error?: string | null;
};

export type MajorReviewRow = {
  slug: string;
  last_reviewed_at: string;
};

export type PlatformMeta = {
  overrides: OverrideRow[];
  linkChecks: LinkCheckRow[];
  sources: SourceRow[];
  lastScan: ScanRunRow | null;
  majorReviews: MajorReviewRow[];
};

export const EMPTY_PLATFORM_META: PlatformMeta = {
  overrides: [],
  linkChecks: [],
  sources: [],
  lastScan: null,
  majorReviews: [],
};

/** تاريخ آخر مراجعة آلية لحالة تخصص معيّن */
export function majorReviewedAt(meta: PlatformMeta, slug: string): string | null {
  return meta.majorReviews.find((row) => row.slug === slug)?.last_reviewed_at ?? null;
}

/** يبني خريطة القيم المعتمدة لعنصر واحد */
export function overridesFor(
  meta: PlatformMeta,
  entityType: string,
  entityId: string,
): Record<string, OverrideRow> {
  const map: Record<string, OverrideRow> = {};
  for (const row of meta.overrides) {
    if (row.entity_type === entityType && row.entity_id === entityId) {
      map[row.field] = row;
    }
  }
  return map;
}

/** أحدث تاريخ تحديث لعنصر معيّن، أو تاريخ آخر فحص عام */
export function lastUpdatedFor(
  meta: PlatformMeta,
  entityType: string,
  entityId: string,
): string | null {
  const dates = meta.overrides
    .filter((row) => row.entity_type === entityType && row.entity_id === entityId)
    .map((row) => row.updated_at);
  if (dates.length > 0) return dates.sort().at(-1) ?? null;
  return meta.lastScan?.finished_at ?? meta.lastScan?.started_at ?? null;
}

const AR_DATE = new Intl.DateTimeFormat("ar-JO", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const AR_DATE_TIME = new Intl.DateTimeFormat("ar-JO", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(value: string | null | undefined): string {
  if (!value) return "لم يُسجَّل بعد";
  return AR_DATE.format(new Date(value));
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return "لم يُسجَّل بعد";
  return AR_DATE_TIME.format(new Date(value));
}
