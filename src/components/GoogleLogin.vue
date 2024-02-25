<script setup>
import { ref, onMounted } from 'vue'
import { decodeCredential } from '@/utils'
import { useRouter } from 'vue-router'

const googleLoginBtn = ref(null)
const router = useRouter()

onMounted(() => {
  const gClientId = '967031631783-l9uhera9os5a16crubus9tav24cmetpp.apps.googleusercontent.com'

  window.google.accounts.id.initialize({
    client_id: gClientId,
    callback: handleCredentialResponse,
  })

  window.google.accounts.id.renderButton(
    googleLoginBtn.value, {
      text: 'continue_with',  // signup_with | continue_with | signin
      size: 'large',          // small | medium | large
      theme: 'outline',       // filled_black | filled_blue | outline
      logo_alignment: 'left', // center | left
      shape: 'pill',
      type: 'standard'
    }
  )
})

  const handleCredentialResponse = async (response) => {
    const responsePayload = JSON.parse(decodeCredential(response.credential))
    console.log('Google login success', responsePayload.name, responsePayload.picture)
  }

</script>

<template>
  <div>
    登入
    <div ref="googleLoginBtn"></div>
  </div>
</template>

<style scoped>
</style>