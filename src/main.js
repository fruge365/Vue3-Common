import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入路由
import "@/assets/sass/main.css" // 引入全局样式
import pinia from './pinia';  // 引入模块化、持久化的 pinia 配置

createApp(App).use(router).use(pinia).mount('#app')
