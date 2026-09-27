import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        throw redirect({ to: "/auth" });
      }
      return { user: data.user };
    } catch (err) {
      if (typeof err === "object" && err !== null && "to" in err) {
        throw err;
      }
      throw redirect({ to: "/auth" });
    }
  },
  errorComponent: () => {
    if (typeof window !== "undefined") {
      window.location.assign("/auth");
    }
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-6 text-center">
        <p className="text-sm text-muted-foreground">جارٍ تحويلك إلى صفحة الدخول…</p>
      </div>
    );
  },
  component: () => <Outlet />,
});
