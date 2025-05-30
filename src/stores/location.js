import { ref } from 'vue'
import { defineStore } from 'pinia'
// import api from '@/service/api'
import { statusToast } from '@/helpers/swal'
import calDistanceData from '@/assets/calDistance.json' // For Demo 假資料

export const useLocationStore = defineStore('location', () => {
  // 預設使用者位置: 總統府
  const defaultUserPosition = ref([25.040310154316238, 121.51190579542796])
  const userLocation = ref([])
  const stopLocations = ref([])
  const selectedLocationId = ref(null)
  const selectedLocationIndex = ref(null)

  const fetchStopLocations = async () => {
    // let sendData = {
    //   lat: userLocation.value[0],
    //   lng: userLocation.value[1]
    // }

    try {
      // production: POST; dev: GET
      // const data = await api.get(`/calc-distance`, sendData)
      const data = calDistanceData // For Demo 假資料
      stopLocations.value = data.result
    } catch (error) {
      console.error(error)
      statusToast('error', 'error', `無法取得附近都更地點`, 3000)
    }
  }

  const getUserPosition = () => {
    const onSuccess = (position) => {
      userLocation.value = [position.coords.latitude, position.coords.longitude]
    }

    const onError = (error) => {
      userLocation.value = defaultUserPosition.value
      console.error(error)
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }

    if (!navigator.geolocation) userLocation.value = defaultUserPosition.value
  }

  const $reset = () => {
    selectedLocationId.value = null
    selectedLocationIndex.value = null
    stopLocations.value = []
  }

  return {
    userLocation,
    stopLocations,
    selectedLocationId,
    selectedLocationIndex,
    fetchStopLocations,
    getUserPosition,
    $reset
  }
})
