import { createRouter, createWebHashHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'location',
      meta: { layout: AppLayout },
      component: () => import('@/views/LocationView.vue')
    },
    {
      path: '/district',
      name: 'district',
      meta: { layout: AppLayout },
      component: () => import('@/views/DistrictView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: BlankLayout },
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/account',
      name: 'account',
      meta: { layout: BlankLayout },
      component: () => import('@/views/AccountView.vue')
    }
  ]
})

// Demo 跳過 google 登入檢查
// router.beforeEach((to) => {
//   const authStore = useAuthStore()
//   // 完成 google 登入才可進入帳號頁連結 facebook
//   if (authStore.isGoogleAuthenticated && to.name === 'account') return
//   if (!authStore.isAuthenticated && to.name !== 'login') return { name: 'login' }
// })
export default router
