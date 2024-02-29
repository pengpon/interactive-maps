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
    return { ...item, disabled: true }
  })
}
let districtOptions = setOptionDisabled(convertToSelectOption(NEW_TAIPEI_CITY))
let isLoaded = ref(false)

onMounted(() => {
  districtStore.fetchRegionInfos()
  isLoaded.value = true
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
  <main>
    <Transition>
      <SpinnerOverlay v-show="!isLoaded" />
    </Transition>
    <SelectElement
      text="請選擇查詢的區域："
      :options="districtOptions"
      :selected="searchDistrict"
      @changeValue="changeDistrict"
      class="select-container"
    />
    <InteractiveMap ref="map" class="district-map-container" />
  </main>
</template>

<style>
.select-container {
  margin-bottom: 10px;
}

.district-map-container #map {
  height: 70vh;
}

.select {
  width: 80vw;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
