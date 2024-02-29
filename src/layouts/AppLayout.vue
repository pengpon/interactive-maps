<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <NavBar />
  <RouterView class="content"/>
</template>

<style scoped>
.content {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
