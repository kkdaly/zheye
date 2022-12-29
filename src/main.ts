import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
// 创建pinia 实例
const pinia = createPinia()
const app = createApp(App)

app.use(pinia) // 引入pinia
app.use(router) // 引入 router
app.mount('#app')
