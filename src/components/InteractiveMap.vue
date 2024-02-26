<script setup>
import { shallowRef, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'

const initialMap = shallowRef(null)
const geoJson = shallowRef(null)
const info = L.control();
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

const showAreaInfoOnHover = () => {
  info.onAdd = function () {
    console.log(this)
    this._div = L.DomUtil.create('div', 'info')
    this.update();
    return this._div;
  };

  info.update = function (props) {
    const contents = props ? `<b>名稱：${props.TxtMemo}</b>/${props.分區}<br/>面積：${props.SHAPE_Area} m<sup>2</sup>` : 'Hover over a area';
    this._div.innerHTML = `<p>--- 都更區資訊 ---</p>${contents}`;
  };
  info.addTo(initialMap.value)
}

const highlightFeature = (e) => {
  const layer = e.target;
  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });

  layer.bringToFront();
  info.update(layer.feature.properties);
}

const resetHighlight = (e) => {
  geoJson.value.resetStyle(e.target);
    info.update();
}

const zoomToFeature = (e) => {
  initialMap.value.fitBounds(e.target.getBounds());
}

const onEachFeature = (feature, layer) => {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

const addGeoJson = (data) => {
  geoJson.value = L.geoJson(data, { onEachFeature }).addTo(initialMap.value);
  showAreaInfoOnHover()
}

defineExpose({
  addUserLocation,
  addStopMarker,
  zoomToShow,
  addGeoJson
})
</script>

<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<style>
#map {
  height: 80vh;
}

.info {
  background-color: #fff;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px;
}
</style>