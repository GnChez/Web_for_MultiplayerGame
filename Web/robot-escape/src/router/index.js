
import { createRouter, createWebHashHistory } from 'vue-router/auto'

import { useAppStore } from '../stores/app.js'


const requireAuth = (to, from, next) => {
  const store = useAppStore()
  if (store.auth) {
    next()
  } else {
    store.hasCookieId()
    .then((isAuthenticated) => {
      if (isAuthenticated) {
        next()
      } else {
        next({name: "Home" })
      }
    });
  }

}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Home.vue') 
  },
  {
    path:'/login',
    name:'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/pages/Login.vue'),
  },
  {
    path:'/register',
    name:'Register',
    component: () => import(/* webpackChunkName: "register" */ '@/pages/Register.vue'),
  },
  {
    path:'/forgotpassword',
    name:'ForgotPassword',
    component: () => import(/* webpackChunkName: "forgot-password" */ '@/pages/ForgotPassword.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "perfil" */ '@/pages/Profile.vue'),
    beforeEnter: requireAuth
  },
  {
    path:'/faq',
    name:'FAQ',
    component: () => import(/* webpackChunkName: "faq" */ '@/pages/Faq.vue'),
  },
  {
    path:'/rankings',
    name:'Rankings',
    component: () => import(/* webpackChunkName: "rankings" */ '@/pages/Rankings.vue'),
  },
  {
    path:'/aboutus',
    name:'AboutUs',
    component: () => import(/* webpackChunkName: "about_us" */ '@/pages/AboutUs.vue'),
  },
  {
    path:'/contactus',
    name: "ContactUs",
    component: () => import(/* webpackChunkName: "contact_us" */ '@/pages/ContactUs.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes

})

export default router
