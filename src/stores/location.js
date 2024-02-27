import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/service/api'

export const useLocationStore = defineStore('location', () => {
  const defaultUserPosition = ref([
    24.970480365942308,
    121.44361857661913
  ])
  const userLocation = ref([])
  const stopLocations = ref([])
  const selectedLocationId = ref(null)
  const selectedLocationIndex = ref(null)

  const fetchStopLocations = async () => {
    let sendData = {
      lat: userLocation.value[0],
      lng: userLocation.value[1]
    }

    try {
      // production: POST; dev: GET
      const data = await api.get(`/calc-distance`, sendData)
      stopLocations.value = data.result
    } catch (error) {
      console.error(error)
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
        navigator.geolocation.getCurrentPosition(onSuccess, onError )
    }

    if (!navigator.geolocation) userLocation.value = defaultUserPosition.value
  }

  return { userLocation, stopLocations, selectedLocationId, selectedLocationIndex, fetchStopLocations, getUserPosition }
})
