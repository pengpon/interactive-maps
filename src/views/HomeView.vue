<script setup>
import { ref, onMounted, watch } from 'vue';
import { useLocationStore } from '../stores/location'
import { storeToRefs } from 'pinia'
import InteractiveMap from '@/components/InteractiveMap.vue'

const { userLocation, stopLocations } = storeToRefs(useLocationStore())
const locationStore = useLocationStore()
const map = ref(null)

onMounted(() => {
  locationStore.getUserPosition()
})

watch(userLocation, async() => {
  // add user pin
  map.value.addUserLocation(userLocation.value)

  // get cal distance
  await locationStore.fetchStopLocations()

  // add stop marker
  map.value.addStopMarker(stopLocations.value)
})
</script>

<template>
  <main>
    首頁
    <InteractiveMap ref="map" />
  </main>
</template>
