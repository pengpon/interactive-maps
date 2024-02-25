import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/service/api'

export const useLocationStore = defineStore('location', () => {
  const userLocation = ref({
    lat: 24.970480365942308,
    lng: 121.44361857661913
  })

  const stopLocations = ref([])

  const fetchStopLocations = async () => {
    let sendData = userLocation.value
    try {
      // production: POST; dev: GET
      const data = await api.get(`/calc-distance`, sendData)
      stopLocations.value = data.result
    } catch (error) {
      console.error(error)
    }
  }

  return { userLocation, stopLocations, fetchStopLocations }
})
