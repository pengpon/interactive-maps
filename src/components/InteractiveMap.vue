<script setup>
import { shallowRef, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'

const initialMap = shallowRef(null);
let markers = L.markerClusterGroup({ showCoverageOnHover: false })
let markerList = {}

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
  for (let i = 0; i < data.length; i++) {
    let marker = L.marker([data[i].latitude, data[i].longitude])
    marker.bindPopup(`${data[i].stop_name} (${data[i].name})`)
    markers.addLayer(marker)
    markerList[data[i].id] = marker
  }
  initialMap.value.addLayer(markers)
}

const zoomToShow = (targetId) => {
  markers.zoomToShowLayer(markerList[targetId], function () {
    markerList[targetId].openPopup();
  })
}

defineExpose({
  addUserLocation,
  addStopMarker,
  zoomToShow
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