import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
  type RouteLocationNormalized
} from "vue-router";
import routes from "./routes";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import NProgress from "@/utils/progress";
import setPageTitle from "@/utils/set-page-title";

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as RouteRecordRaw[]
});

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string;
    noCache?: boolean;
  };
}

// router.beforeEach((to: toRouteType, from, next) => {
//   NProgress.start();
//   useCachedViewStoreHook().addCachedView(to);
//   setPageTitle(to.meta.title);
//   next();
// });
router.beforeResolve((to: toRouteType, from, next) => {
  const token = localStorage.getItem("common_token");
  const hasLogin = token != null && token != "";
  NProgress.start();
  useCachedViewStoreHook().addCachedView(to);
  setPageTitle(to.meta.title);
  if (to.name !== "Login" && !hasLogin) {
    next({ name: "Login" });
  } else {
    next();
  }
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
