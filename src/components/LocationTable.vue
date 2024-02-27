<template>
  <div class="search-container">
    <span class="text">搜尋站名/名稱：</span>
    <input type="text" class="search" v-model="searchValue">
  </div>
  <EasyDataTable
    :headers="headers"
    :items="data"
    :table-height=100
    fixed-header
    :search-field="searchField"
    :search-value="searchValue"
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

const searchField = ['name', 'stop_name']
const searchValue = ref();
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

.search-container {
  margin-bottom: 10px;
}

.search-container .text {
  font-size: 15px;
  font-weight: 500;
}

.search-container .search {
  color: var(--gray-dark);
  border: 1px solid var(--gray-light);
	border-radius: 4px;
  height: 30px;
}

</style>