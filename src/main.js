import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import store from './store'
import { PrajaxClient } from 'cajaxjs'

require('./assets/scss/style.scss')

const api = new PrajaxClient({
  baseUrl: process.env.VUE_APP_BASE_URL,
  options: {
    json: true
  }
})

Vue.config.productionTip = false

Vue.mixin({
  data: ()=>({
    api
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
