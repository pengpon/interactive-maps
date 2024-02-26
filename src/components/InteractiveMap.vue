<script setup>
import { shallowRef, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'

const initialMap = shallowRef(null);

onMounted(() => {
  // 初始化地圖
  initialMap.value = L.map('map').setView([25.088321, 121.537219], 11)

  // 使用 tile layer (openstreetmap)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(initialMap.value)
})

const addUserLocation = (location) => {
  // create icon
  let pin = L.icon({
    iconUrl: './runway.png',
    iconSize: [50, 50],
    iconAnchor:   [25, 50],
  })

  L.marker(location, {icon: pin})
    .addTo(initialMap.value).bindTooltip('I am here')

}

// location cluster
const addStopMarker = (data) => {
  let markers = L.markerClusterGroup({
    showCoverageOnHover: false
  }).addTo((initialMap.value))

  for (let i=0; i < data.length; i++) {
    markers.addLayer(
      L.marker([data[i].latitude, data[i].longitude])
        .bindPopup(`${data[i].stop_name} (${data[i].name})`)
    )

    initialMap.value.addLayer(markers)
  }
}

defineExpose({
  addUserLocation,
  addStopMarker
})
</script>

<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<style scoped>
#map {
  height: 80vh;
}
</style>