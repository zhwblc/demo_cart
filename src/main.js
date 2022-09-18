import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

import './assets/css/bootstrap.css'
import './index.css'

const app = createApp(App)

axios.defaults.baseURL = 'https://www.escook.cn'
app.config.globalProperties.$http = axios

app.mount('#app')
