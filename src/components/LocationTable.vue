<template>
  <EasyDataTable
    :headers="headers"
    :items="data"
    :table-height=100
    fixed-header
    @click-row="showLocation"
  >
    <template #empty-message>暫無資料</template>
  </EasyDataTable>
</template>

<script setup>
import { ref, watch } from 'vue';


const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['mapFlyTo'])

// create a ref to store prop value
const data = ref(props.data)

// watch for changes
watch(() => props.data, (newValue) => {
  data.value = newValue
})

const headers = [
  { text: '編號', value: 'id', sortable: true},
  { text: '站名', value: 'stop_name'},
  { text: '名稱', value: 'name'},
  { text: '緯度', value: 'latitude'},
  { text: '經度', value: 'longitude'},
  { text: '距離 (m)', value: 'distance', sortable: true},
];

const showLocation = (item) => {
  emit('mapZoomToShow', item.id)

};
</script>

<style scoped>
</style>