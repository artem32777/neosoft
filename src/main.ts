import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store/tasks.ts'

createApp(App).use(store).mount('#app')
