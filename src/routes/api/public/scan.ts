import { createFileRoute } from "@tanstack/react-router";

/** نقطة الفحص الأسبوعي المجدول — محمية بمفتاح سري */
export const Route = createFileRoute("/api/public/scan")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["SCAN_SECRET"];
        if (!secret) {
          return new Response(JSON.stringify({ error: "الفحص غير مهيأ" }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }

        const provided =
          request.headers.get("x-scan-secret") ??
          request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
          "";
        if (provided !== secret) {
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
