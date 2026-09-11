import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">٤٠٤</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          الصفحة التي تبحث عنها غير متوفرة أو تم نقلها إلى مكان آخر.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          تعذّر تحميل هذه الصفحة
        </h1>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          حدث خطأ غير متوقع من جانبنا. يمكنك إعادة المحاولة أو العودة إلى الصفحة الرئيسية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            إعادة المحاولة
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            العودة إلى الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}


export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "الطلاب والمستقبل | مستشار المسار الأكاديمي والمهني" },
      {
        name: "description",
        content:
          "منصة عربية تحلل نسب التشغيل للتخصصات في الجامعات الأردنية وتوجه الطلبة إلى شهادات عالمية مجانية معتمدة.",
      },
      { property: "og:title", content: "الطلاب والمستقبل" },
      {
        property: "og:description",
        content: "تحليل نسب التشغيل للتخصصات الأردنية ودليل شهادات مجانية معتمدة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@500;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const navLinks = [
  { to: "/", label: "الرئيسية" },
  { to: "/advisor", label: "المستشار الذكي" },
  { to: "/majors", label: "دليل التخصصات" },
  { to: "/certifications", label: "الشهادات المجانية" },
  { to: "/sources", label: "المصادر الرسمية" },
] as const;

function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("saf-theme");
    const initial =
      stored === "dark" ||
      (stored === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(initial);
  }, []);

  useEffect(() => {
    if (dark === null) return;
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("saf-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((value) => !value)}
      aria-label="تبديل النمط الليلي"
      title="تبديل النمط الليلي"
      className="border-border/70 text-foreground/80 hover:border-brand hover:text-foreground ms-1 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors"
    >
      {dark ? "نمط نهاري" : "نمط ليلي"}
    </button>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-background flex min-h-screen flex-col">
        <header className="border-border/70 bg-background/85 sticky top-0 z-50 border-b backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
            <Link to="/" className="group flex items-center gap-2.5">
              <span className="from-brand to-accent grid size-9 place-items-center rounded-xl bg-gradient-to-br text-sm font-extrabold text-white shadow-[var(--shadow-card)]">
                طم
              </span>
              <span className="font-display text-base font-extrabold tracking-tight">
                الطلبة <span className="text-brand">والمستقبل</span>
              </span>
            </Link>
            <nav className="flex flex-wrap items-center gap-0.5 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-muted-foreground hover:text-foreground hover:bg-surface rounded-full px-3 py-1.5 transition-colors"
                  activeProps={{
                    className: "bg-surface-2 text-foreground font-bold",
                  }}
                  activeOptions={{ exact: link.to === "/" }}
                >
                  {link.label}
                </Link>
              ))}
              <ThemeToggle />
            </nav>
          </div>
        </header>

        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="border-border/70 bg-surface/70 mt-16 border-t">
          <div className="text-muted-foreground mx-auto max-w-6xl px-4 py-10 text-sm">
            <p className="font-display text-foreground text-base font-bold">
              منصة الطلاب والمستقبل
            </p>
            <p className="mt-3 max-w-3xl leading-8">
              جميع نِسَب التشغيل والتصنيفات تقديرات استرشادية مبنية على أحدث البيانات الرسمية
              المتاحة من ديوان الخدمة المدنية ودائرة الإحصاءات العامة ووزارة التعليم العالي ومنصة
              سجّل، وليست أرقاماً لحظية.
            </p>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

