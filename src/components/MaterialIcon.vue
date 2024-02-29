<template>
  <span :style="{ 'font-size': props.size + 'px' }" class="material-symbols-rounded"
    ><slot></slot>
  </span>
</template>

<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 20
  }
})
</script>
