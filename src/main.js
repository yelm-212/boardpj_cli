import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import Ckeditor from "@ckeditor/ckeditor5-vue";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(Ckeditor)
app.mount('#app')