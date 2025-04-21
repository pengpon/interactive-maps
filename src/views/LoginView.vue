<script setup>
import GoogleLogin from '../components/GoogleLogin.vue'
</script>

<template>
  <main class="main">
    <h1 class="title">都市更新查詢地圖 Demo</h1>
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
  font-size: 20px;
  font-weight: 800;
  text-align: center;
  color: var(--black-dark);
}

@media (min-width: 768px) {
  .title {
    font-size: 40px;
  }
}
</style>
