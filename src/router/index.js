import { createRouter, createWebHistory } from "vue-router";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../components/Home.vue"),
    },
    {
      path: "/job-post/:id",
      component: () => import("../components/SingleJobPost.vue"),
    },
  ],
});

export default router;
