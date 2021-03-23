import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/register.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/login.vue"),
  },
  {
    path: "/feed",
    name: "feed",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/feed.vue"),
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem("token");
      if (token) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/profile.vue"),
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem("token");
      if (token) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
  {
    path: "/oneMessage/:id",
    name: "oneMessage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/oneMessage.vue"),
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem("token");
      if (token) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
