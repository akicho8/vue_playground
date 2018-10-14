import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import Buefy from 'buefy'
import './assets/scss/app.scss'
Vue.use(Buefy)

import _ from "lodash"
Object.defineProperty(Vue.prototype, '_', {value: _})

import inspect from 'object-inspect'
window.inspect = inspect
Object.defineProperty(Vue.prototype, 'inspect', {value: inspect})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
