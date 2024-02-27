<script setup>
import { ref, onMounted, watch } from 'vue';
import { useLocationStore } from '../stores/location'
import { storeToRefs } from 'pinia'
import InteractiveMap from '@/components/InteractiveMap.vue'
import LocationTable from '@/components/LocationTable.vue'
const locationStore = useLocationStore()
const { userLocation, stopLocations, selectedLocationId, selectedLocationIndex } = storeToRefs(useLocationStore())
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

const onRowSelected = (targetIndex, targetId) => {
  map.value.zoomToShow(targetId)
  selectedLocationId.value = targetId
  selectedLocationIndex.value = targetIndex
}

const onMarkerSelected = (id) => {
  selectedLocationId.value = id
  selectedLocationIndex.value = stopLocations.value.findIndex(ele => ele.id === id)
}
</script>

<template>
  <main>
    <InteractiveMap ref="map" class="location-map-container" @onMarkerSelected="onMarkerSelected"/>
    <LocationTable :data="stopLocations" @onRowSelected="onRowSelected" :seletedIndex="selectedLocationIndex"/>
  </main>
</template>
