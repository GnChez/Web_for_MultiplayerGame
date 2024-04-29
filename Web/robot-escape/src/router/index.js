
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { useAppStore } from '../stores/app.js'


const requireAuth = (to, from, next) => {
  const store = useAppStore()
  if (store.authenticated) {
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
    path: '/perfil',
    name: 'Perfil',
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
    path:'/about_us',
    name:'AboutUs',
    component: () => import(/* webpackChunkName: "about_us" */ '@/pages/AboutUs.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes

})

export default router
