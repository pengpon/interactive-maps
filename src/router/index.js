import { createRouter, createWebHistory } from 'vue-router'
import LocationView from '../views/LocationView.vue'
import DistrictView from '../views/DistrictView.vue'
import AccountView from '../views/AccountView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

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
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  // 完成 google 登入才可進入帳號頁登入 facebook
  if (authStore.isGoogleAuthenticated && to.name === 'account') return
  if (!authStore.isAuthenticated && to.name !== 'login') return { name: 'login'}
})
export default router
