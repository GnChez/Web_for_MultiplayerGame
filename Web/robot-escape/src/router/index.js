import { createRouter, createWebHistory } from "vue-router/auto";

import { useAppStore } from "../stores/app.js";

const requireAuth = (to, from, next) => {
  const store = useAppStore();
  if (store.auth) {
    next();
  } else {
    store.hasCookieId().then((isAuthenticated) => {
      if (isAuthenticated) {
        next();
      } else {
        next({ path: "/home" });
      }
    });
  }
};

const auth = (to, from, next) => {
  const store = useAppStore();
  if (!store.isAuthenticated) {
    store.hasCookieId().then((isAuthenticated) => {
      next();
    });
  }
};

const checkAuth = (to, from, next) => {
  const store = useAppStore();
  if (store.isAuthenticated) {
    next({ path: "/home" });
  } else {
    store.hasCookieId().then((isAuthenticated) => {
      if (isAuthenticated) {
        next({ path: "/home" });
      } else {
        next();
      }
    });
  }
};
const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: */ "@/pages/Home.vue"),
    beforeEnter: auth,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/pages/Login.vue"),
    beforeEnter: checkAuth,
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "@/pages/Register.vue"),
    beforeEnter: auth,
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: () =>
      import(
        /* webpackChunkName: "forgot-password" */ "@/pages/ForgotPassword.vue"
      ),
    beforeEnter: auth,
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "perfil" */ "@/pages/Profile.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () => import(/* webpackChunkName: "faq" */ "@/pages/Faq.vue"),
    beforeEnter: auth,
  },
  {
    path: "/rankings",
    name: "Rankings",
    component: () =>
      import(/* webpackChunkName: "rankings" */ "@/pages/Rankings.vue"),
    beforeEnter: auth,
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: () =>
      import(/* webpackChunkName: "about_us" */ "@/pages/AboutUs.vue"),
    beforeEnter: auth,
  },
  {
    path: "/contactus",
    name: "ContactUs",
    component: () =>
      import(/* webpackChunkName: "contact_us" */ "@/pages/ContactUs.vue"),
    beforeEnter: auth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
