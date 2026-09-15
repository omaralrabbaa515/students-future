import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type PendingChange = {
  id: string;
  entity_type: string;
  entity_id: string;
  entity_label: string;
  field: string;
  field_label: string;
  old_value: string;
  new_value: string;
  source_url: string | null;
  note: string | null;
  created_at: string;
};

export type ChangeLogEntry = {
  id: string;
  entity_type: string;
  entity_id: string;
  entity_label: string;
  field: string;
  field_label: string;
  old_value: string;
  new_value: string;
  action: string;
  actor: string;
  source_url: string | null;
  note: string | null;
  created_at: string;
};

export type BrokenLink = {
  certification_id: string;
  url: string;
  http_status: number | null;
  error: string | null;
  checked_at: string;
  last_ok_at: string | null;
};

export type ScanRun = {
  id: string;
  started_at: string;
  finished_at: string | null;
  trigger: string;
  status: string;
  sources_checked: number;
  links_checked: number;
  broken_links: number;
  changes_found: number;
  reviewed_majors: number;
  status_changes: number;
  error: string | null;
};

export type MajorReview = {
  slug: string;
  last_reviewed_at: string;
  inferred_classification: string | null;
  inferred_risk: string | null;
  inferred_employment_rate: string | null;
  evidence: string | null;
  source_url: string | null;
};

export type ActiveOverride = {
  entity_type: string;
  entity_id: string;
  field: string;
  value: string;
  source_url: string | null;
  updated_at: string;
};

export type UpdatesDashboard = {
  isAdmin: boolean;
  adminExists: boolean;
  pending: PendingChange[];
  log: ChangeLogEntry[];
  brokenLinks: BrokenLink[];
  scans: ScanRun[];
  overrides: ActiveOverride[];
  majorReviews: MajorReview[];
};

async function isAdminUser(supabase: {
  from: (table: "user_roles") => {
    select: (
      columns: string,
      options?: { count?: "exact"; head?: boolean },
    ) => {
      eq: (column: string, value: string) => {
        eq: (column: string, value: string) => Promise<{ count: number | null }>;
      };
    };
  };
}, userId: string) {
  const { count } = await supabase
    .from("user_roles")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("role", "admin");
  return (count ?? 0) > 0;
}

/** كل بيانات لوحة التحديثات */
export const getUpdatesDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<UpdatesDashboard> => {
    const { supabase, userId } = context;
    const admin = await isAdminUser(supabase as never, userId);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    const adminExists = (count ?? 0) > 0;

    if (!admin) {
      return {
        isAdmin: false,
        adminExists,
        pending: [],
        log: [],
        brokenLinks: [],
        scans: [],
        overrides: [],
        majorReviews: [],
      };
    }

    const [pending, log, links, scans, overrides, reviews] = await Promise.all([
      supabase
        .from("pending_changes")
        .select(
          "id, entity_type, entity_id, entity_label, field, field_label, old_value, new_value, source_url, note, created_at",
        )
        .eq("status", "pending")
        .order("created_at", { ascending: false }),
      supabase
        .from("change_log")
        .select(
          "id, entity_type, entity_id, entity_label, field, field_label, old_value, new_value, action, actor, source_url, note, created_at",
        )
        .order("created_at", { ascending: false })
        .limit(300),
      supabase
        .from("link_checks")
        .select("certification_id, url, http_status, error, checked_at, last_ok_at")
        .eq("ok", false)
        .order("checked_at", { ascending: false }),
      supabase
        .from("scan_runs")
        .select(
          "id, started_at, finished_at, trigger, status, sources_checked, links_checked, broken_links, changes_found, error",
        )
        .order("started_at", { ascending: false })
        .limit(20),
      supabase
        .from("data_overrides")
        .select("entity_type, entity_id, field, value, source_url, updated_at")
        .order("updated_at", { ascending: false }),
    ]);

    return {
      isAdmin: true,
      adminExists,
      pending: (pending.data ?? []) as PendingChange[],
      log: (log.data ?? []) as ChangeLogEntry[],
      brokenLinks: (links.data ?? []) as BrokenLink[],
      scans: (scans.data ?? []) as ScanRun[],
      overrides: (overrides.data ?? []) as ActiveOverride[],
    };
  });

/** اعتماد أو رفض تغيير مقترح */
export const decidePendingChange = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; decision: "approve" | "reject" }) => {
    if (!input?.id || (input.decision !== "approve" && input.decision !== "reject")) {
      throw new Error("طلب غير صحيح");
    }
    return input;
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId, claims } = context;
    if (!(await isAdminUser(supabase as never, userId))) throw new Error("غير مصرّح");

    const { data: change, error } = await supabase
      .from("pending_changes")
      .select("*")
      .eq("id", data.id)
      .eq("status", "pending")
      .single();
    if (error || !change) throw new Error("التغيير غير موجود أو تمّت معالجته");

    const actor = (claims as { email?: string })?.email ?? "المشرف";

    if (data.decision === "approve" && change.entity_type === "major") {
      const { error: overrideError } = await supabase.from("data_overrides").upsert(
        {
          entity_type: change.entity_type,
          entity_id: change.entity_id,
          field: change.field,
          value: change.new_value,
          source_url: change.source_url,
          updated_at: new Date().toISOString(),
          updated_by: actor,
        },
        { onConflict: "entity_type,entity_id,field" },
      );
      if (overrideError) throw new Error(overrideError.message);
    }

    await supabase
      .from("pending_changes")
      .update({
        status: data.decision === "approve" ? "approved" : "rejected",
        decided_at: new Date().toISOString(),
        decided_by: userId,
      })
      .eq("id", data.id);

    await supabase.from("change_log").insert({
      entity_type: change.entity_type,
      entity_id: change.entity_id,
      entity_label: change.entity_label,
      field: change.field,
      field_label: change.field_label,
      old_value: change.old_value,
      new_value: change.new_value,
      action: data.decision === "approve" ? "اعتماد" : "رفض",
      actor,
      source_url: change.source_url,
      note: change.note,
    });

    return { ok: true };
  });

/** التراجع عن قيمة معتمدة — يُسجَّل كسطر جديد في السجل */
export const revertOverride = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { entityType: string; entityId: string; field: string }) => {
    if (!input?.entityId || !input?.field || !input?.entityType) throw new Error("طلب غير صحيح");
    return input;
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId, claims } = context;
    if (!(await isAdminUser(supabase as never, userId))) throw new Error("غير مصرّح");

    const { data: row } = await supabase
      .from("data_overrides")
      .select("*")
      .eq("entity_type", data.entityType)
      .eq("entity_id", data.entityId)
      .eq("field", data.field)
      .single();
    if (!row) throw new Error("القيمة غير موجودة");

    await supabase
      .from("data_overrides")
      .delete()
      .eq("entity_type", data.entityType)
      .eq("entity_id", data.entityId)
      .eq("field", data.field);

    await supabase.from("change_log").insert({
      entity_type: data.entityType,
      entity_id: data.entityId,
      entity_label: data.entityId,
      field: data.field,
      field_label: data.field,
      old_value: row.value,
      new_value: "",
      action: "تراجع",
      actor: (claims as { email?: string })?.email ?? "المشرف",
      note: "أُعيدت القيمة الأصلية المخزّنة في المنصة",
    });

    return { ok: true };
  });

/** تشغيل الفحص يدوياً */
export const runScanNow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    if (!(await isAdminUser(supabase as never, userId))) throw new Error("غير مصرّح");
    const { runScan } = await import("@/lib/scan.server");
    return await runScan("manual");
  });

/** بريد المشرف الوحيد المسموح له بإدارة المنصة */
const ADMIN_EMAIL = "mralrba0@gmail.com";

/** تنشيط صلاحية الإشراف لحساب المشرف المعتمد فقط */
export const claimAdminRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = String((context.claims as { email?: string } | null)?.email ?? "")
      .trim()
      .toLowerCase();
    if (email !== ADMIN_EMAIL) {
      throw new Error("هذا الحساب غير مصرّح له بصلاحية الإشراف على المنصة");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existing } = await supabaseAdmin
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (existing) return { ok: true };

    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
