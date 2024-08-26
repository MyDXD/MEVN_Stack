import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "navbar",
    component: () => import("../components/Navbar.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/me",
        name: "me",
        component: () => import("../views/Me.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
      },
      {
        path: "/simple",
        name: "simple",
        component: () => import("../views/Simple.vue"),
      },
      {
        path: "/pokemon",
        name: "pokemon",
        component: () => import("../views/Pokemon.vue"),
      },
      {
        path: "/grade",
        name: "/grade",
        component: () => import("../views/Grade.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
