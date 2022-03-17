import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/index.less'
import { registerStore } from '@/store'
import { registerComponents } from './utils'
import { setCacheMenu } from './store/login'
import 'element-plus/dist/index.css' //局部样式
const app = createApp(App)
registerStore(app)
registerComponents(app)
setCacheMenu()
app.use(router).mount('#app')
