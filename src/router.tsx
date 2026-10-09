import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 دقائق كاش للبيانات لتجنب إعادة الجلب عند التنقل
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: "intent", // تحميل مسبق فوري عند تحريك المؤشر أو اللمس
    defaultPreloadDelay: 35, // 35ms فقط لبدء التحميل المسبق فائق السرعة
    defaultPreloadStaleTime: 60_000, // كاش التحميل المسبق لمدة دقيقة
    defaultViewTransition: true, // انتقالات صفحات سلسة وناعمة عبر View Transitions API
  });

  return router;
};
