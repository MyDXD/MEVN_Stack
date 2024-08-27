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
        component: HomeView,
      },
      {
        path: "/me",
        name: "me",
        component: () => import("../views/Me.vue"),
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
      {
        path: "/products",
        name: "/products",
        component: () => import("../views/Products.vue"),
      },
      {
        path: "/products/:id",
        name: "productDetails",
        component: () => import("../views/ProductDetails.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("Token");

  if (!token && to.name !== "Login") {
    // ถ้าไม่มี token และไม่ใช่หน้า login ให้ redirect ไปยังหน้า login
    next({ name: "Login" });
  } else {
    // ถ้ามี token หรือเป็นหน้า login ให้ดำเนินการต่อ
    next();
  }
});

export default router;
