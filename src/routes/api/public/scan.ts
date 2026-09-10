import { createFileRoute } from "@tanstack/react-router";

/** نقطة الفحص الأسبوعي المجدول — محمية بمفتاح سري */
export const Route = createFileRoute("/api/public/scan")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const provided =
          request.headers.get("x-scan-secret") ??
          request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
          "";
        if (provided.length < 16) {
          return new Response(JSON.stringify({ error: "غير مصرّح" }), {
            status: 401,
            headers: { "content-type": "application/json" },
          });
        }

        const envSecret = process.env["SCAN_SECRET"];
        let authorized = Boolean(envSecret) && provided === envSecret;
        if (!authorized) {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data } = await supabaseAdmin
            .from("scan_tokens")
            .select("id")
            .eq("token", provided)
            .maybeSingle();
          authorized = Boolean(data);
        }
        if (!authorized) {
          return new Response(JSON.stringify({ error: "غير مصرّح" }), {
            status: 401,
            headers: { "content-type": "application/json" },
          });
        }

        try {
          const { runScan } = await import("@/lib/scan.server");
          const result = await runScan("cron");
          return Response.json({ ok: true, ...result });
        } catch (error) {
          console.error(error);
          return new Response(
            JSON.stringify({
              ok: false,
              error: error instanceof Error ? error.message : "خطأ غير معروف",
            }),
            { status: 500, headers: { "content-type": "application/json" } },
          );
        }
      },
    },
  },
});
