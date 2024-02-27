import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/service/api'

export const useDistrictStore = defineStore('district', () => {
  const searchDistrict = ref('tucheng')
  const regionInfos = ref({ })

  const fetchRegionInfos = async () => {
    let params = searchDistrict.value ? { directory: `${searchDistrict.value}.json` } : ''
    try {
      const data = await api.get(`/geolocation-json`, params)
      regionInfos.value = data.result
    } catch (error) {
      console.error(error)
    }
  }

  return { searchDistrict, regionInfos, fetchRegionInfos }
})
