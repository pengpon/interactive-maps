import { createRouter, createWebHistory } from 'vue-router'
import LocationView from '../views/LocationView.vue'
import DistrictView from '../views/DistrictView.vue'
import AccountView from '../views/AccountView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'location',
      component: LocationView
    },
    {
      path: '/district',
      name: 'district',
      component: DistrictView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
