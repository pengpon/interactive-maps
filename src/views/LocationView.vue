<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAuthStore } from '../stores/auth'
import { useLocationStore } from '../stores/location'
import { storeToRefs } from 'pinia'
import InteractiveMap from '@/components/InteractiveMap.vue'
import LocationTable from '@/components/LocationTable.vue'

const locationStore = useLocationStore()
const { userLocation, stopLocations, selectedLocationId, selectedLocationIndex } = storeToRefs(useLocationStore())
const { avatar } = storeToRefs(useAuthStore())
const map = ref(null)
let isLoading = ref(true)

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
  isLoading.value = false
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

const clearUserLocation = () => {
  locationStore.$reset()
}

const onUserLocationChange = (position) => {
  userLocation.value = position
}

</script>

<template>
  <main >
    <Transition>
      <SpinnerOverlay v-show="isLoading"/>
    </Transition>
    <InteractiveMap
      ref="map"
      class="location-map-container"
      @onMarkerSelected="onMarkerSelected"
      @onUserLocationChange="onUserLocationChange"
      @clearUserLocation="clearUserLocation"
      :userAvatar="avatar"/>
    <LocationTable :data="stopLocations" @onRowSelected="onRowSelected" :seletedIndex="selectedLocationIndex"/>
  </main>
</template>

<style>
.location-map-container #map {
  width: 80vw;
  height: 50vh;
  margin: 0 auto 20px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
