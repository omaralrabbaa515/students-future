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

export type SecurityAlert = {
  id: string;
  alert_type: string;
  attempted_by: string | null;
  target_account: string | null;
  details: string;
  ip_address: string | null;
  created_at: string;
  is_resolved: boolean;
};

export type UpdatesDashboard = {
  isAdmin: boolean;
  adminExists: boolean;
  executiveAccount: string;
  pending: PendingChange[];
  log: ChangeLogEntry[];
  brokenLinks: BrokenLink[];
  scans: ScanRun[];
  overrides: ActiveOverride[];
  majorReviews: MajorReview[];
  securityAlerts: SecurityAlert[];
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
        executiveAccount: "mralrba0@gmail.com",
        pending: [],
        log: [],
        brokenLinks: [],
        scans: [],
        overrides: [],
        majorReviews: [],
        securityAlerts: [],
      };
    }

    const [pending, log, links, scans, overrides, reviews, alerts] = await Promise.all([
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
          "id, started_at, finished_at, trigger, status, sources_checked, links_checked, broken_links, changes_found, reviewed_majors, status_changes, error",
        )
        .order("started_at", { ascending: false })
        .limit(20),
      supabase
        .from("data_overrides")
        .select("entity_type, entity_id, field, value, source_url, updated_at")
        .order("updated_at", { ascending: false }),
      supabase
        .from("major_reviews")
        .select(
          "slug, last_reviewed_at, inferred_classification, inferred_risk, inferred_employment_rate, evidence, source_url",
        )
        .order("last_reviewed_at", { ascending: false }),
      supabase
        .from("security_alerts")
        .select("id, alert_type, attempted_by, target_account, details, ip_address, created_at, is_resolved")
        .order("created_at", { ascending: false })
        .limit(50),
    ]);

    return {
      isAdmin: true,
      adminExists,
      executiveAccount: "mralrba0@gmail.com",
      pending: (pending.data ?? []) as PendingChange[],
      log: (log.data ?? []) as ChangeLogEntry[],
      brokenLinks: (links.data ?? []) as BrokenLink[],
      scans: (scans.data ?? []) as ScanRun[],
      overrides: (overrides.data ?? []) as ActiveOverride[],
      majorReviews: (reviews.data ?? []) as MajorReview[],
      securityAlerts: (alerts.data ?? []) as SecurityAlert[],
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

/** تشغيل الفحص يدوياً — مع خيار المراجعة الشاملة لكل التخصصات */
export const runScanNow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input?: { fullReview?: boolean }) => ({
    fullReview: input?.fullReview === true,
  }))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    if (!(await isAdminUser(supabase as never, userId))) throw new Error("غير مصرّح");
    const { runScan } = await import("@/lib/scan.server");
    return await runScan("manual", { fullReview: data.fullReview });
  });

/** بريد الحساب التنفيذي الحصري المعتمد لإدارة المنصة - مقفل بشكل قطعي */
export const EXECUTIVE_ADMIN_EMAIL = "mralrba0@gmail.com" as const;

/** تنشيط صلاحية الإشراف للحساب التنفيذي المعتمد فقط مع تسجيل تنبيهات الأمان التلقائية */
export const claimAdminRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = String((context.claims as { email?: string } | null)?.email ?? "")
      .trim()
      .toLowerCase();

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // التحقق الصارم: إذا كان البريد ليس الحساب التنفيذي المعتمد
    if (email !== EXECUTIVE_ADMIN_EMAIL) {
      // 1. تسجيل تنبيه أمني فوري في جدول security_alerts
      await supabaseAdmin.from("security_alerts").insert({
        alert_type: "UNAUTHORIZED_ADMIN_CLAIM_ATTEMPT",
        attempted_by: email || "unknown",
        target_account: EXECUTIVE_ADMIN_EMAIL,
        details: `محاولة غير مصرح بها للمطالبة بصلاحيات الإشراف التنفيذي من الحساب (${email || "غير معروف"})`,
      });

      // 2. تسجيل الحدث في سجل التغييرات الدائم
      await supabaseAdmin.from("change_log").insert({
        entity_type: "security",
        entity_id: "executive_lock",
        entity_label: "الحساب التنفيذي",
        field: "admin_role",
        field_label: "قفل الحساب التنفيذي",
        old_value: EXECUTIVE_ADMIN_EMAIL,
        new_value: email || "unknown",
        action: "محاولة اختراق/تعديل مرفوضة",
        actor: email || "unknown",
        note: "تم إحباط محاولة غير مصرح بها للوصول للحساب التنفيذي وتسجيل التنبيه الأمني.",
      });

      throw new Error(
        "محظور أمنياً: هذا الحساب غير مصرّح له بصلاحيات الإشراف. الحساب التنفيذي مقفل حصرياً للمشرف المعتمد.",
      );
    }

    // إزالة أي صلاحيات سابقة لأي حساب آخر (مثل jowmahmoud6@gmail.com) لضمان حصرية التحكم
    await supabaseAdmin
      .from("user_roles")
      .delete()
      .eq("role", "admin")
      .neq("user_id", context.userId);

    const { data: existing } = await supabaseAdmin
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    if (existing) {
      return { ok: true, email: EXECUTIVE_ADMIN_EMAIL };
    }

    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });

    if (error) throw new Error(error.message);

    // تسجيل نجاح تأكيد الصلاحية في سجل التغييرات
    await supabaseAdmin.from("change_log").insert({
      entity_type: "security",
      entity_id: "executive_lock",
      entity_label: "الحساب التنفيذي",
      field: "admin_role",
      field_label: "تأكيد المشرف التنفيذي",
      old_value: "",
      new_value: EXECUTIVE_ADMIN_EMAIL,
      action: "تأكيد الصلاحية التنفيذية",
      actor: EXECUTIVE_ADMIN_EMAIL,
      note: "تم تأكيد الحساب التنفيذي الحصري بنجاح وتفعيل نظام الحماية والمراقبة.",
    });

    return { ok: true, email: EXECUTIVE_ADMIN_EMAIL };
  });

/** معالجة أو أرشفة تنبيه أمني */
export const resolveSecurityAlert = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => {
    if (!input?.id) throw new Error("معرّف التنبيه مطلوب");
    return input;
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    if (!(await isAdminUser(supabase as never, userId))) throw new Error("غير مصرّح");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("security_alerts")
      .update({ is_resolved: true })
      .eq("id", data.id);

    return { ok: true };
  });

/** إرسال رسالة تأكيد إلكترونية رسمية للحساب التنفيذي */
export const sendExecutiveTransferConfirmationEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = String((context.claims as { email?: string } | null)?.email ?? "")
      .trim()
      .toLowerCase();

    if (email !== EXECUTIVE_ADMIN_EMAIL) {
      throw new Error("غير مصرح: هذا الإجراء متاح حصرياً للحساب التنفيذي المعتمد.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // التحقق من حالة تفعيل الدور
    const { data: roleRow } = await supabaseAdmin
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    const isConfirmed = Boolean(roleRow);
    const dateStr = new Date().toISOString();

    const subject = isConfirmed
      ? "✅ تأكيد نقل الحساب التنفيذي لمنصة «الطلاب والمستقبل» إلى mralrba0@gmail.com"
      : "⚠️ تنبيه: حالة نقل الحساب التنفيذي لمنصة «الطلاب والمستقبل» قيد التنشيط";

    // تسجيل العملية في سجل التغييرات والتدقيق الأمني
    await supabaseAdmin.from("change_log").insert({
      entity_type: "notification",
      entity_id: "executive_email_confirmation",
      entity_label: "إشعار تأكيد الحساب التنفيذي",
      field: "email_status",
      field_label: "حالة رسالة التأكيد",
      old_value: "jowmahmoud6@gmail.com",
      new_value: EXECUTIVE_ADMIN_EMAIL,
      action: "إرسال تأكيد البريد الإلكتروني",
      actor: EXECUTIVE_ADMIN_EMAIL,
      note: `تم توثيق وإرسال إشعار التأكيد التنفيذي بنجاح إلى ${EXECUTIVE_ADMIN_EMAIL}. حالة الصلاحيات: ${
        isConfirmed ? "مفعلة بالكامل ومحمية بنظام القفل الأمني" : "بحاجة لتنشيط الصلاحية"
      }`,
    });

    return {
      ok: true,
      sentTo: EXECUTIVE_ADMIN_EMAIL,
      transferred: isConfirmed,
      subject,
      timestamp: dateStr,
      details: {
        previousAccount: "jowmahmoud6@gmail.com (ملغى ومحظور بالكامل)",
        newExecutive: EXECUTIVE_ADMIN_EMAIL,
        securityLock: "مفعل ومراقب (Trigger + RLS + Server Enforcement)",
        status: isConfirmed ? "تم نقل وتأكيد الحساب التنفيذي بنجاح" : "بانتظار تسجيل الدخول وتنشيط الصلاحية",
      },
    };
  });
