// Composables
import { createRouter, createWebHistory } from 'vue-router'

import { useAppStore } from "../stores/app.js";

//FOR THE ROUTES THAT ARE NOT ACCESIBLE WITHOUT AUTHENTICATION
const requireAuth = (to, from, next) => {
  const store = useAppStore();
  if (store.auth) {
    next();
  } else {
    store.hasCookieId().then((isAuthenticated) => {
      if (isAuthenticated) {
        next();
      } else {
        next({ path: "/" });
      }
    });
  }
};

//FOR THE AUTOLOGIN FUNCTION IN EVERY ROUTE
const auth = (to, from, next) => {
  console.log("auth function triggered");
  const store = useAppStore();
  if (!store.isAuthenticated) {
    console.log("Trying to auth")
    store.hasCookieId().then(() => {
      next();
    });
  }
  else {
    console.log("Already authenticated")
    next();
  }
};

//FOR THE ROUTES THAT ARE AVOIDED IF THE USER IS ALREADY AUTHENTICATED
const checkAuth = (to, from, next) => {
  const store = useAppStore();
  if (store.isAuthenticated) {
    next({ path: "/" });
  } else {
    store.hasCookieId().then((isAuthenticated) => {
      if (isAuthenticated) {
        next({ path: "/" });
      } else {
        next();
      }
    });
  }
};

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/pages/Home.vue'),
        beforeEnter: auth,
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/pages/Login.vue'),
        beforeEnter: checkAuth,
      },
    ],
  },
  {
    path: '/register',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'Register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/pages/Register.vue'),
        beforeEnter: auth,
      },
    ],
  },
  {
    path: '/changeusername',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'ChangeUsername',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/pages/ChangeUsername.vue'),
        beforeEnter: requireAuth,
      },
    ],
  },
  {
    path: '/forgotpassword',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'ForgotPassword',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/pages/ForgotPassword.vue'),
      },
    ],
  },
  {
    path: '/profile',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'Profile',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/pages/Profile.vue'),
        beforeEnter: requireAuth,
      },
    ],
  },
  {
    path: '/faq',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'FAQ',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/pages/Faq.vue'),
        beforeEnter: auth,
      },
    ],
  },
  {
    path: '/rankings',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'Rankings',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/pages/Rankings.vue'),
        beforeEnter: auth,
      },
    ],
  },
  {
    path: '/aboutus',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'AboutUs',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/pages/AboutUs.vue'),
        beforeEnter: auth,
      },
    ],
  },
  {
    path: '/contactus',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'ContactUs',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/pages/ContactUs.vue'),
        beforeEnter: auth,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
