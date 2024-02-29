<script setup>
import { onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  appId: {
    type: String,
    required: true
  },
  version: {
    type: String,
    default: 'v19.0'
  },
  scope: {
    type: String,
    default: ''
  },
  fields: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['onSuccess', 'onFailure'])

onMounted(() => {
  loadFacebookSDK(document, "script", "facebook-jssdk")
  initFacebook();
})

const loadFacebookSDK = async (d, s, id) => {
  var js,
    fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s)
  js.id = id
  js.src = "https://connect.facebook.net/en_US/sdk.js"
  fjs.parentNode.insertBefore(js, fjs)
}

const initFacebook = async () => {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: props.appId,
      cookie: true,
      xfbml: true,
      version: props.version,
    });
    window.FB.AppEvents.logPageView()
  };
}

const initFacebookLogin = async () => {
  logInWithFacebook()
}

const logInWithFacebook = async () => {
  try {
    if (props.appId) {
      await loadFacebookSDK(document, "script", "facebook-jssdk")
      await initFacebook(props.appId, props.version)

      // 檢查登入狀態
      // connected: 用戶已登入，也已經登入您的應用程式 Facebook/not_authorized
      // not_authorized: 用戶已登入 Facebook，但尚未登入您的應用程式
      // unknown: 用戶沒有登入 Facebook
      window.FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          return extractInfo(response)
        } else {
          // 未登入應用程式，觸發登入流程
          window.FB.login(function(response) {
            if (response.authResponse) {
              // 若狀態是 connected，會包含 authResponse
              return extractInfo(response)
            } else {
              // 登入失敗
              return emits('onFailure')
            }
          }, {scope: props.scope})
        }
      });

      return false;
    } else {
      return emits('onFailure', 'appId is required')
    }
  } catch (error) {
    return emits('onFailure')
  }
}

const extractInfo = async (response) => {
  if (props.fields) {
    let authInfo = {}
    if (props.fields) {
      authInfo = await getAuthInfo(response.authResponse.accessToken)
    }
    return emits('onSuccess', {...response, authInfo})
  } else {
    return emits('onSuccess', {...response})
  }
}

const getAuthInfo = async (accessToken) => {
  const response = await axios.get(`https://graph.facebook.com/v19.0/me?fields=${props.fields}&access_token=${accessToken}`)
  return response?.data
}
</script>

<template>
  <div>
    <slot :initFBLogin="initFacebookLogin" />
  </div>
</template>