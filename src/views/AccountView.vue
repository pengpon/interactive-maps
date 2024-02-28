<script setup>
import FacebookLogin from '@/components/FacebookLogin.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import logoFb from '@/assets/logo-fb.png'

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
  <main class="main">
    <p class="description">連結 Facebook 帳號</p>
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
      >
      <img class="logo" :src="logoFb" alt="facebook-logo">
      Continue with Facebook</button>
    </FacebookLogin>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.description {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: var(--black-dark);
}

.fb-button {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border: none;
  font-size: 16px;
  border-radius: 4px;
  font-weight: 600;
  color: var(--white);
  background-color: #1278F2;
  cursor: pointer;
}


.fb-button .logo {
  width: 20px;
  border-radius: 50%;
  background-color: var(--white);
}
</style>
