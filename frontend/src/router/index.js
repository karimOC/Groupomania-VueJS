import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../components/register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../components/login.vue')
  },
  {
    path: '/feed',
    name: 'feed',
    component: () => import(/* webpackChunkName: "about" */ '../components/feed.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
