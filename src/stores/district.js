import { ref } from 'vue'
import { defineStore } from 'pinia'
// import api from '@/service/api'
import { statusToast } from '@/helpers/swal'
import geoLocationData from '@/assets/geoLocation.json' // For Demo 假資料

export const useDistrictStore = defineStore('district', () => {
  const searchDistrict = ref('tucheng')
  const regionInfos = ref({})

  const fetchRegionInfos = async () => {
    // let params = searchDistrict.value ? { directory: `${searchDistrict.value}.json` } : ''
    try {
      // const data = await api.get(`/geolocation-json`, params)
      // 使用本地 json 檔案
      const data = geoLocationData // For Demo 假資料
      regionInfos.value = data.result
    } catch (error) {
      console.error(error)
      statusToast('error', 'error', `無法取得都更區域資料`, 3000)
    }
  }

  return { searchDistrict, regionInfos, fetchRegionInfos }
})
