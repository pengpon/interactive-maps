<script setup>
import FacebookLogin from '@/components/FacebookLogin.vue'
import router from '@/router';
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const onSuccess = (response) => {
  // 取得 token 和 info
  authStore.isFacebookAuthenticated = true
  authStore.avatar.facebook = response.authInfo.picture.data.url
  router.push({path: '/'})
}

const onFailure = (error) => {
  // 登入失敗
  console.error(error)
}
</script>
<template>
  <div>social
    <FacebookLogin
      v-slot="fbLogin"
      app-id="381380281309079"
      scope="public_profile"
      fields="id,name,picture"
      @onSuccess="onSuccess"
      @onFailure="onFailure"
    >
      <button
        @click="fbLogin.initFBLogin"
        class="fb-button"
      >Continue with Facebook</button>
    </FacebookLogin>
  </div>
</template>