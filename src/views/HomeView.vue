<script setup>
import InteractiveMap from '@/components/InteractiveMap.vue'
import { useLocationStore } from '../stores/location'
import { storeToRefs } from "pinia"

const { stopLocations } = storeToRefs(useLocationStore())
const locationStore = useLocationStore()

const getPoint = async() => {
  await locationStore.fetchStopLocations()
}
</script>

<template>
  <main>
    首頁
    <InteractiveMap />
    <button @click="getPoint">取得附近都更點</button>
    <div>總計：{{stopLocations.length}}站</div>
  </main>
</template>
