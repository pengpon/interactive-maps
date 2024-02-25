<script setup>
import { ref, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'

const initialMap = ref(null);

onMounted(() => {
  // 初始化地圖
  initialMap.value = L.map('map').setView([25.088321, 121.537219], 11)

  // 使用 tile layer (openstreetmap)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      // zoomControl: true
    }).addTo(initialMap.value)

    L.marker([24.972663, 121.443671]).addTo(initialMap.value)
})

const addCircleMarker = () => {
  let circleMarker = L.circleMarker([24.987105, 121.425453], {
      color: '#FFF',
      weight: 3,
      fillColor: '#FABF2D',
      radius: 8,
      fillOpacity: 1
    })

    circleMarker.addTo(initialMap.value)
}
</script>

<template>
  <div>
    <div id="map"></div>
    <button @click="addCircleMarker">增加 Marker</button>
  </div>
</template>

<style scoped>
#map {
  height: 80vh;
}
</style>