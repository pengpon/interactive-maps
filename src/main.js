import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import MaterialIcon from '@/components/MaterialIcon.vue'
import SpinnerOverlay from '@/components/SpinnerOverlay.vue'

const app = createApp(App)
app.component('EasyDataTable', Vue3EasyDataTable);
app.component('MaterialIcon', MaterialIcon);
app.component('SpinnerOverlay', SpinnerOverlay);

app.use(createPinia())
app.use(router)

app.mount('#app')
