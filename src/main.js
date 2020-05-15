import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from "axios";
import router from './router'

// 给 axios 设置 baseURL, 方便在组件中直接 this.axios 使用
Vue.prototype.axios=axios.create({
  baseURL: 'http://139.217.114.86:8080/'
})

Vue.use(MintUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
