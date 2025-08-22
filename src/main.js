import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入路由
import "@/assets/sass/main.css" // 引入全局样式
import "@/assets/sass/theme.scss" // 引入主题样式
import pinia from './pinia';  // 引入模块化、持久化的 pinia 配置
import ElementPlus from 'element-plus' // 引入element-plus
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn' // 国际化
import 'dayjs/locale/zh-cn'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(router).use(ElementPlus, {
    locale: zhCn,
}).use(pinia).mount('#app')

// 导出app实例用于语言切换
export { app }
