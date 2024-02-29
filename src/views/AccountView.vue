<script setup>
import FacebookLogin from '@/components/FacebookLogin.vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import logoFb from '@/assets/logo-fb.png'
import { dialog } from '@/helpers/swal'

const authStore = useAuthStore()
const onSuccess = (response) => {
  // 取得 token 和 info
  authStore.isFacebookAuthenticated = true
  authStore.avatar.facebook = response.authInfo.picture.data.url
  router.push({ path: '/' })
}

const onFailure = async (error) => {
  // 登入失敗 or 登入動作未完成
  console.error(error)
  // TODO: 應用程式需商家驗證具有進階存取權限, 才可供一般用戶使用，暫解：提供略過選項
  const result = await dialog(
    `Oops! Something went wrong`,
    `是否略過 Facebook 帳號連結。`,
    '略過',
    '取消'
  )

  if (result.isConfirmed) {
    authStore.isFacebookAuthenticated = true
    router.push({ path: '/' })
  }
}

const handleSkip = () => {
  authStore.isFacebookAuthenticated = true
  router.push({ name: 'location' })
}
</script>
<template>
  <main class="main">
    <p class="description">連結社群帳號</p>
    <div class="action-container">
      <FacebookLogin
        v-slot="fbLogin"
        app-id="381380281309079"
        scope="public_profile"
        fields="id,name,picture"
        @onSuccess="onSuccess"
        @onFailure="onFailure"
      >
        <button @click="fbLogin.initFBLogin" class="fb-button">
          <img class="logo" :src="logoFb" alt="facebook-logo" />
          連結 Facebook
        </button>
      </FacebookLogin>
      <a class="skip-button" @click="handleSkip"> 略過此步驟 </a>
    </div>
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
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  color: var(--white);
  background-color: #1278f2;
  cursor: pointer;
}

.fb-button .logo {
  width: 20px;
  border-radius: 50%;
  background-color: var(--white);
}

.action-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.skip-button {
  display: inline-block;
  width: 100%;
  border-radius: 4px;
  background-color: var(--gray-dark);
  color: var(--white);
  font-weight: 600;
  font-size: 16px;
  padding: 10px;
  text-align: center;
  line-height: 16px;
  cursor: pointer;
}
</style>
