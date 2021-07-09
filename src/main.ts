import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'

import router from './router/index'
import store from './store/index'
import 'element-plus/lib/theme-chalk/index.css'
import i18n from './language'

createApp(App).use(router).use(store).use(ElementPlus).use(i18n).mount('#app')
