import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("../views/Shop.vue"),
  },
  {
    path: "/error",
    name: "Error",
    component: () => import("../views/Error.vue"),
  },
  { path: "*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
});

router.beforeEach(() => {
  // 捲動到頁頂
  window.scrollTo(0, 0);
});

export default router;
