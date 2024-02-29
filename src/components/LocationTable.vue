<template>
  <div class="search-container">
    <span class="text">搜尋站名/名稱：</span>
    <input type="text" class="search" v-model="searchValue">
  </div>
  <EasyDataTable
    :headers="headers"
    :items="data"
    fixed-header
    hide-rows-per-page
    @click-row="handleRowClick"
    :search-field="searchField"
    :search-value="searchValue"
    :body-row-class-name="bodyRowClassNameFunction"
    table-class-name="customize-table"
  >
    <template #empty-message>無資料</template>
  </EasyDataTable>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  seletedIndex: {
    type: Number,
    default: null
  }
})
const emit = defineEmits(['onRowSelected'])

// create a ref to store prop value
const data = ref(props.data)

const searchField = ['name', 'stop_name']
const searchValue = ref();

const bodyRowClassNameFunction = (item) => {
  if (item.isActive) return 'active-row'
}

watch(() => props.data, (newValue) => {
  data.value = newValue
})

watch(() => props.seletedIndex, (newIndex, oldIndex) => {
  if (newIndex === null) return
  if (oldIndex !== null) data.value[oldIndex].isActive = false
  data.value[newIndex].isActive = true
})

const headers = [
  // { text: '編號', value: 'id'},
  { text: '站名', value: 'stop_name', fixed: true},
  { text: '距離', value: 'distance', sortable: true, width: 60},
  { text: '名稱', value: 'name'},
  { text: '緯度', value: 'latitude'},
  { text: '經度', value: 'longitude'},
];

const handleRowClick = (item) => {
  // 找出 row index
  let targetIndex = data.value.findIndex(element => element.id === item.id)
  data.value[targetIndex].isActive = true
  emit('onRowSelected', targetIndex, item.id)
};

</script>

<style>
.customize-table {
  --easy-table-body-row-hover-font-color: var(--primary-dark-1);
  --easy-table-body-row-hover-background-color: var(--primary-light-2);
  --easy-table-footer-height: 24px;
  height: 40vh;
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  .customize-table {
    height: 240px;
  }
}

.customize-table .vue3-easy-data-table__main {
  height: 100%;
  min-height: unset;
}

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

.active-row {
  --easy-table-body-row-font-color: var(--primary-dark-1);
  --easy-table-body-row-background-color: var(--primary-light-2);
}
</style>
