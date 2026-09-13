import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";

import { certifications } from "@/data/certifications";
import { majors } from "@/data/majors";
import { supabase } from "@/integrations/supabase/client";
import {
  claimAdminRole,
  decidePendingChange,
  getUpdatesDashboard,
  revertOverride,
  runScanNow,
} from "@/lib/admin.functions";
import { ENTITY_LABELS, formatDate, formatDateTime } from "@/lib/platform-data";

export const Route = createFileRoute("/_authenticated/updates")({
  head: () => ({
    meta: [
      { title: "لوحة التحديثات | الطلاب والمستقبل" },
      {
        name: "description",
        content:
          "لوحة داخلية لمراجعة التحديثات المقترحة من المصادر الرسمية واعتمادها، ومتابعة سجل التغييرات وحالة روابط الشهادات.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "لوحة التحديثات | الطلاب والمستقبل" },
      {
        property: "og:description",
        content: "مراجعة التحديثات المقترحة وسجل التغييرات وحالة الروابط.",
      },
    ],
  }),
  component: UpdatesPage,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-12 text-sm leading-8">
      <h1 className="font-display text-xl font-bold">تعذّر تحميل لوحة التحديثات</h1>
      <p className="text-muted-foreground mt-2">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm">الصفحة غير موجودة.</p>
    </div>
  ),
});

const TABS = [
  { key: "pending", label: "التغييرات المقترحة" },
  { key: "links", label: "حالة الروابط" },
  { key: "log", label: "سجل التحديثات" },
  { key: "scans", label: "عمليات الفحص" },
] as const;

const majorNames = new Map(majors.map((major) => [major.slug, major.name]));
const certTitles = new Map(certifications.map((cert) => [cert.id, cert.title]));

function UpdatesPage() {
  const queryClient = useQueryClient();
  const fetchDashboard = useServerFn(getUpdatesDashboard);
  const decide = useServerFn(decidePendingChange);
  const revert = useServerFn(revertOverride);
  const scan = useServerFn(runScanNow);
  const claim = useServerFn(claimAdminRole);

  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("pending");
  const [logFilter, setLogFilter] = useState("");
  const [logType, setLogType] = useState("الكل");
  const [notice, setNotice] = useState<string | null>(null);

  const dashboard = useQuery({
    queryKey: ["updates-dashboard"],
    queryFn: () => fetchDashboard(),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["updates-dashboard"] });

  const decideMutation = useMutation({
    mutationFn: (input: { id: string; decision: "approve" | "reject" }) => decide({ data: input }),
    onSuccess: (_result, input) => {
      setNotice(input.decision === "approve" ? "تم اعتماد التغيير وظهر للطلبة." : "تم رفض التغيير.");
      void invalidate();
    },
    onError: (error: Error) => setNotice(error.message),
  });

  const revertMutation = useMutation({
    mutationFn: (input: { entityType: string; entityId: string; field: string }) =>
      revert({ data: input }),
    onSuccess: () => {
      setNotice("تمّت العودة إلى القيمة الأصلية، وسُجّل ذلك في السجل.");
      void invalidate();
    },
    onError: (error: Error) => setNotice(error.message),
  });

  const scanMutation = useMutation({
    mutationFn: () => scan(),
    onSuccess: (result) => {
      setNotice(
        `انتهى الفحص: ${result.linksChecked} رابطاً و${result.sourcesChecked} مصدراً، ` +
          `${result.brokenLinks} رابطاً معطّلاً، ${result.changesFound} تغييراً جديداً للمراجعة.`,
      );
      void invalidate();
    },
    onError: (error: Error) => setNotice(error.message),
  });

  const claimMutation = useMutation({
    mutationFn: () => claim(),
    onSuccess: () => {
      setNotice("تم تعيينك مشرفاً للمنصة.");
      void invalidate();
    },
    onError: (error: Error) => setNotice(error.message),
  });

  const data = dashboard.data;

  const filteredLog = useMemo(() => {
    if (!data) return [];
    const term = logFilter.trim();
    return data.log.filter(
      (entry) =>
        (logType === "الكل" || entry.entity_type === logType) &&
        (!term || entry.entity_label.includes(term) || entry.field_label.includes(term)),
    );
  }, [data, logFilter, logType]);

  if (dashboard.isLoading) {
    return <p className="mx-auto max-w-4xl px-4 py-12 text-sm">جارٍ تحميل اللوحة…</p>;
  }

  if (dashboard.isError) {
    return (
      <p className="mx-auto max-w-4xl px-4 py-12 text-danger text-sm">
        تعذّر تحميل اللوحة: {(dashboard.error as Error).message}
      </p>
    );
  }

  if (data && !data.isAdmin) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-sm leading-8">
        <h1 className="font-display text-2xl font-extrabold">لوحة التحديثات</h1>
        <p className="text-muted-foreground mt-3">
          هذه اللوحة مخصّصة لحساب المشرف الوحيد للمنصة. إن كنت المشرف فاضغط الزر أدناه لتنشيط
          صلاحيتك، وإلا فلا صلاحية لهذا الحساب.
        </p>
        <button
          onClick={() => claimMutation.mutate()}
          disabled={claimMutation.isPending}
          className="bg-brand text-brand-foreground mt-5 rounded-xl px-5 py-2.5 text-sm font-bold disabled:opacity-60"
        >
          تنشيط صلاحية الإشراف
        </button>
        {notice && <p className="mt-4 text-danger text-sm">{notice}</p>}
        <button
          onClick={() => void supabase.auth.signOut().then(() => window.location.assign("/auth"))}
          className="text-brand-ink mt-6 block text-sm underline"
        >
          تسجيل الخروج
        </button>
      </div>
    );
  }

  const lastScan = data?.scans[0] ?? null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold">لوحة التحديثات</h1>
          <p className="text-muted-foreground mt-2 text-sm leading-7">
            آخر فحص: {formatDateTime(lastScan?.finished_at ?? lastScan?.started_at)}
            {lastScan ? ` · ${lastScan.trigger === "manual" ? "فحص يدوي" : "فحص مجدول"}` : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => scanMutation.mutate()}
            disabled={scanMutation.isPending}
            className="bg-brand text-brand-foreground rounded-xl px-5 py-2.5 text-sm font-bold disabled:opacity-60"
          >
            {scanMutation.isPending ? "جارٍ الفحص…" : "افحص الآن"}
          </button>
          <button
            onClick={() => void supabase.auth.signOut().then(() => window.location.assign("/auth"))}
            className="border-border rounded-md border px-5 py-2.5 text-sm font-bold"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>

      {notice && (
        <p className="border-border bg-secondary mt-4 rounded-md border p-3 text-sm leading-7">
          {notice}
        </p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <Stat label="تغييرات بانتظار المراجعة" value={String(data?.pending.length ?? 0)} />
        <Stat label="روابط معطّلة" value={String(data?.brokenLinks.length ?? 0)} />
        <Stat label="قيم معتمدة ظاهرة للطلبة" value={String(data?.overrides.length ?? 0)} />
        <Stat label="سجلات في سجل التحديثات" value={String(data?.log.length ?? 0)} />
      </div>

      <div className="border-border mt-8 flex flex-wrap gap-1 border-b">
        {TABS.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`rounded-t-md px-4 py-2 text-sm font-bold ${
              tab === item.key ? "bg-surface-2 text-foreground font-bold" : "text-muted-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "pending" && (
        <div className="mt-6 space-y-3">
          {(data?.pending.length ?? 0) === 0 && (
            <p className="text-muted-foreground text-sm">لا توجد تغييرات بانتظار المراجعة.</p>
          )}
          {data?.pending.map((change) => (
            <div key={change.id} className="card-surface p-4">
              <p className="text-muted-foreground text-xs">
                {ENTITY_LABELS[change.entity_type] ?? change.entity_type} · {change.field_label} ·
                تاريخ الفحص {formatDateTime(change.created_at)}
              </p>
              <h3 className="font-display mt-1 font-bold">{change.entity_label}</h3>
              <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <p className="bg-secondary rounded-md px-3 py-2 leading-7">
                  <span className="font-bold">القيمة الحالية: </span>
                  {change.old_value || "—"}
                </p>
                <p className="tone-good rounded-xl px-3 py-2 leading-7">
                  <span className="font-bold">القيمة الجديدة: </span>
                  {change.new_value || "—"}
                </p>
              </div>
              {change.note && <p className="mt-2 text-sm leading-7">{change.note}</p>}
              {change.source_url && (
                <a
                  href={change.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-ink mt-2 inline-block text-xs break-all underline"
                >
                  {change.source_url}
                </a>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => decideMutation.mutate({ id: change.id, decision: "approve" })}
                  disabled={decideMutation.isPending}
                  className="bg-brand text-brand-foreground rounded-xl px-4 py-2 text-xs font-bold disabled:opacity-60"
                >
                  اعتماد
                </button>
                <button
                  onClick={() => decideMutation.mutate({ id: change.id, decision: "reject" })}
                  disabled={decideMutation.isPending}
                  className="border-border rounded-md border px-4 py-2 text-xs font-bold disabled:opacity-60"
                >
                  رفض
                </button>
              </div>
            </div>
          ))}

          {(data?.overrides.length ?? 0) > 0 && (
            <div className="border-border mt-8 border-t pt-6">
              <h2 className="font-display text-foreground text-lg font-bold">
                القيم المعتمدة الظاهرة للطلبة
              </h2>
              <div className="mt-3 space-y-2">
                {data?.overrides.map((row) => (
                  <div
                    key={`${row.entity_id}-${row.field}`}
                    className="border-border bg-card flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3 text-sm"
                  >
                    <span>
                      <span className="font-bold">
                        {majorNames.get(row.entity_id) ?? row.entity_id}
                      </span>{" "}
                      — {row.field}: {row.value}
                      <span className="text-muted-foreground text-xs">
                        {" "}
                        (آخر تحديث {formatDate(row.updated_at)})
                      </span>
                    </span>
                    <button
                      onClick={() =>
                        revertMutation.mutate({
                          entityType: row.entity_type,
                          entityId: row.entity_id,
                          field: row.field,
                        })
                      }
                      disabled={revertMutation.isPending}
                      className="border-border rounded-md border px-3 py-1.5 text-xs font-bold disabled:opacity-60"
                    >
                      تراجع
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "links" && (
        <div className="mt-6 space-y-3">
          {(data?.brokenLinks.length ?? 0) === 0 && (
            <p className="text-muted-foreground text-sm">
              لا توجد روابط معطّلة في آخر فحص. تُفحَص جميع روابط الشهادات في كل عملية فحص.
            </p>
          )}
          {data?.brokenLinks.map((link) => (
            <div key={link.certification_id} className="tone-bad border-danger/30 rounded-xl border p-4">
              <h3 className="font-display font-bold">
                {certTitles.get(link.certification_id) ?? link.certification_id}
              </h3>
              <p className="mt-1 text-xs leading-6">
                سبب العطل: {link.error ?? "غير معروف"}
                {link.http_status ? ` (رمز ${link.http_status})` : ""} · تاريخ الفحص{" "}
                {formatDateTime(link.checked_at)} · آخر فحص ناجح {formatDate(link.last_ok_at)}
              </p>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-xs break-all underline"
              >
                {link.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {tab === "log" && (
        <div className="mt-6">
          <div className="flex flex-wrap gap-3">
            <input
              value={logFilter}
              onChange={(event) => setLogFilter(event.target.value)}
              placeholder="ابحث باسم التخصص أو الحقل"
              className="border-border bg-card rounded-md border px-4 py-2 text-sm"
            />
            <select
              value={logType}
              onChange={(event) => setLogType(event.target.value)}
              className="border-border bg-card rounded-md border px-4 py-2 text-sm"
            >
              <option value="الكل">كل الأنواع</option>
              <option value="major">تخصص</option>
              <option value="certification">شهادة</option>
              <option value="source">مصدر رسمي</option>
            </select>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="border-border border p-2 text-right">التاريخ والوقت</th>
                  <th className="border-border border p-2 text-right">العنصر</th>
                  <th className="border-border border p-2 text-right">الحقل</th>
                  <th className="border-border border p-2 text-right">القيمة القديمة</th>
                  <th className="border-border border p-2 text-right">القيمة الجديدة</th>
                  <th className="border-border border p-2 text-right">الإجراء</th>
                  <th className="border-border border p-2 text-right">المنفّذ</th>
                  <th className="border-border border p-2 text-right">المصدر</th>
                </tr>
              </thead>
              <tbody>
                {filteredLog.map((entry) => (
                  <tr key={entry.id}>
                    <td className="border-border border p-2 whitespace-nowrap">
                      {formatDateTime(entry.created_at)}
                    </td>
                    <td className="border-border border p-2">{entry.entity_label}</td>
                    <td className="border-border border p-2">{entry.field_label}</td>
                    <td className="border-border border p-2">{entry.old_value || "—"}</td>
                    <td className="border-border border p-2">{entry.new_value || "—"}</td>
                    <td className="border-border border p-2">{entry.action}</td>
                    <td className="border-border border p-2">{entry.actor}</td>
                    <td className="border-border border p-2">
                      {entry.source_url ? (
                        <a
                          href={entry.source_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-ink break-all underline"
                        >
                          الرابط
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredLog.length === 0 && (
            <p className="text-muted-foreground mt-4 text-sm">
              لا توجد سجلات مطابقة. يُسجَّل كل اعتماد أو رفض أو تراجع هنا ولا يُحذف أبداً.
            </p>
          )}
        </div>
      )}

      {tab === "scans" && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-secondary">
                <th className="border-border border p-2 text-right">وقت البدء</th>
                <th className="border-border border p-2 text-right">النوع</th>
                <th className="border-border border p-2 text-right">الحالة</th>
                <th className="border-border border p-2 text-right">المصادر</th>
                <th className="border-border border p-2 text-right">الروابط</th>
                <th className="border-border border p-2 text-right">روابط معطّلة</th>
                <th className="border-border border p-2 text-right">تغييرات مكتشفة</th>
                <th className="border-border border p-2 text-right">العطل</th>
              </tr>
            </thead>
            <tbody>
              {data?.scans.map((run) => (
                <tr key={run.id}>
                  <td className="border-border border p-2 whitespace-nowrap">
                    {formatDateTime(run.started_at)}
                  </td>
                  <td className="border-border border p-2">
                    {run.trigger === "manual" ? "يدوي" : "مجدول"}
                  </td>
                  <td className="border-border border p-2">
                    {run.status === "completed"
                      ? "مكتمل"
                      : run.status === "failed"
                        ? "فشل"
                        : "قيد التنفيذ"}
                  </td>
                  <td className="border-border border p-2">{run.sources_checked}</td>
                  <td className="border-border border p-2">{run.links_checked}</td>
                  <td className="border-border border p-2">{run.broken_links}</td>
                  <td className="border-border border p-2">{run.changes_found}</td>
                  <td className="border-border border p-2">{run.error ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {(data?.scans.length ?? 0) === 0 && (
            <p className="text-muted-foreground mt-4 text-sm">لم تُنفَّذ أي عملية فحص بعد.</p>
          )}
        </div>
      )}

      <p className="text-muted-foreground mt-10 text-xs leading-7">
        الفحص المجدول يعمل تلقائياً كل أسبوع. لا يظهر أي تغيير للطلبة قبل اعتمادك، عدا حالة الروابط
        المعطّلة التي تُعلَّم فوراً.{" "}
        <Link to="/sources" className="text-brand-ink underline">
          عرض المصادر الرسمية
        </Link>
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-surface p-4">
      <p className="text-muted-foreground text-xs leading-6">{label}</p>
      <p className="font-display mt-1 text-2xl font-extrabold">{value}</p>
    </div>
  );
}
