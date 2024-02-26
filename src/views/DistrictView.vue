<script setup>
import { useDistrictStore } from '../stores/district'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import InteractiveMap from '@/components/InteractiveMap.vue'

const districtStore = useDistrictStore()
const { searchDistrict, regionInfos } = storeToRefs(useDistrictStore())

const map = ref(null)
onMounted(() => {
  districtStore.fetchRegionInfos()
})

watch(regionInfos, () => {
  map.value.addGeoJson(regionInfos.value)
})

</script>

<template>
  <InteractiveMap ref="map"/>
</template>
