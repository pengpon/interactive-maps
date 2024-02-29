<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scope>
.container {
  width: 100vw;
  height: 100vh;
  background-color: var(--nude);
}
</style>
