import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "دخول المشرف | الطلبة والمستقبل" },
      {
        name: "description",
        content: "صفحة دخول خاصة بمشرف المنصة للوصول إلى لوحة التحديثات وسجل التغييرات.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "دخول المشرف | الطلبة والمستقبل" },
      {
        property: "og:description",
        content: "دخول خاص بإدارة تحديثات منصة الطلبة والمستقبل.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/updates" });
    });
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/updates` },
        });
        if (error) throw error;
        setMessage("تم إنشاء الحساب. إن طُلب تأكيد البريد فافتح الرسالة الواردة ثم عد لتسجيل الدخول.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        void navigate({ to: "/updates" });
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "تعذّر إكمال الطلب");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    setMessage(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setMessage("تعذّر الدخول بحساب Google");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    void navigate({ to: "/updates" });
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <h1 className="font-display text-2xl font-extrabold">دخول المشرف</h1>
      <p className="text-muted-foreground mt-2 text-sm leading-7">
        هذه الصفحة مخصصة لإدارة المنصة: مراجعة التحديثات المقترحة واعتمادها، ومتابعة سجل التغييرات.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="البريد الإلكتروني"
          className="border-border bg-card w-full rounded-md border px-4 py-2.5 text-sm"
        />
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="كلمة المرور (٨ أحرف على الأقل)"
          className="border-border bg-card w-full rounded-md border px-4 py-2.5 text-sm"
        />
        <button
          type="submit"
          disabled={busy}
          className="bg-primary text-primary-foreground w-full rounded-md px-4 py-2.5 text-sm font-bold disabled:opacity-60"
        >
          {mode === "signin" ? "تسجيل الدخول" : "إنشاء حساب المشرف"}
        </button>
      </form>

      <button
        onClick={handleGoogle}
        disabled={busy}
        className="border-border mt-3 w-full rounded-md border px-4 py-2.5 text-sm font-bold disabled:opacity-60"
      >
        الدخول بحساب Google
      </button>

      <button
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="text-primary mt-4 text-sm underline"
      >
        {mode === "signin" ? "ليس لديك حساب؟ أنشئ حساب المشرف" : "لديك حساب؟ سجّل الدخول"}
      </button>

      {message && <p className="mt-4 text-sm leading-7 text-rose-700">{message}</p>}
    </div>
  );
}
