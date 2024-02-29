<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useLocationStore } from '../stores/location'
import { storeToRefs } from 'pinia'
import InteractiveMap from '@/components/InteractiveMap.vue'
import LocationTable from '@/components/LocationTable.vue'
import { statusToast } from '@/helpers/swal'

const locationStore = useLocationStore()
const { userLocation, stopLocations, selectedLocationId, selectedLocationIndex } =
  storeToRefs(useLocationStore())
const { avatar } = storeToRefs(useAuthStore())
const map = ref(null)
let isLoaded = ref(false)

onMounted(() => {
  locationStore.getUserPosition()
})

onUnmounted(() => {
  userLocation.value = []
})

watch(userLocation, async () => {
  // add user pin
  map.value.addUserLocation(userLocation.value)
  // get cal distance
  await locationStore.fetchStopLocations()
  // add stop marker
  map.value.addStopMarker(stopLocations.value)
  isLoaded.value = true
})

const onRowSelected = (targetIndex, targetId) => {
  map.value.zoomToShow(targetId)
  selectedLocationId.value = targetId
  selectedLocationIndex.value = targetIndex
}

const onMarkerSelected = (id) => {
  selectedLocationId.value = id
  selectedLocationIndex.value = stopLocations.value.findIndex((ele) => ele.id === id)
}

const clearUserLocation = () => {
  statusToast('success', 'info', `點擊地圖可重新設置地點`, 3000)
  locationStore.$reset()
}

const onUserLocationChange = (position) => {
  statusToast('success', 'info', `已設置地點`, 3000)
  userLocation.value = position
}
</script>

<template>
  <main>
    <Transition>
      <SpinnerOverlay v-show="!isLoaded" />
    </Transition>
    <InteractiveMap
      ref="map"
      class="location-map-container"
      @onMarkerSelected="onMarkerSelected"
      @onUserLocationChange="onUserLocationChange"
      @clearUserLocation="clearUserLocation"
      :userAvatar="avatar"
    />
    <LocationTable
      :data="stopLocations"
      @onRowSelected="onRowSelected"
      :seletedIndex="selectedLocationIndex"
    />
  </main>
</template>

<style>
.location-map-container #map {
  width: 100%;
  height: 40vh;
  margin: 0 auto 20px;
}

@media (min-width: 768px) {
  .location-map-container #map {
    width: 80vw;
    height: 55vh;
    margin: 0 auto 20px;
  }
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
