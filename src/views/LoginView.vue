<script setup>
import GoogleLogin from '../components/GoogleLogin.vue'
</script>

<template>
  <main class="main">
    <h1 class="title">新北市都市更新查詢地圖 Demo</h1>
    <GoogleLogin />
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.title {
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: 800;
  text-align: center;
  color: var(--black-dark);
}
</style>
