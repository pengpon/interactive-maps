<script setup>
import { useDistrictStore } from '../stores/district'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import InteractiveMap from '@/components/InteractiveMap.vue'
import SelectElement from '@/components/SelectElement.vue'
import { NEW_TAIPEI_CITY } from '../../constant/REGION'
import { convertToSelectOption } from '@/utils'

const districtStore = useDistrictStore()
const { searchDistrict, regionInfos } = storeToRefs(useDistrictStore())

const map = ref(null)
const allowOptions = ['tucheng']
const setOptionDisabled = (data) => {
  // set option disabled
  return data.map((item) => {
    if (allowOptions.includes(item.value)) return item
    return {...item, 'disabled': true}
  })
}
let districtOptions = setOptionDisabled(convertToSelectOption(NEW_TAIPEI_CITY))

onMounted(() => {
  districtStore.fetchRegionInfos()
})

watch(regionInfos, () => {
  map.value.addGeoJson(regionInfos.value)
})

const changeDistrict = (value) => {
  searchDistrict.value = value
  districtStore.fetchRegionInfos()
}
</script>

<template>
  <SelectElement
    text="行政區"
		:options="districtOptions"
    :selected="searchDistrict"
		@changeValue="changeDistrict"
	/>
  <InteractiveMap ref="map"/>
</template>
