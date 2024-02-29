import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const name = ref(null)
  const avatar = ref({
    google: '',
    facebook: ''
  })

  const isGoogleAuthenticated = ref(false)
  const isFacebookAuthenticated = ref(false)
  const isAuthenticated = computed(() => isGoogleAuthenticated.value && isFacebookAuthenticated.value )

  return {
    name,
    avatar,
    isGoogleAuthenticated,
    isFacebookAuthenticated,
    isAuthenticated
  }
})
