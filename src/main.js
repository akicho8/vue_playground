import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// Buefy
import Buefy from 'buefy'
import './assets/scss/app.scss'
Vue.use(Buefy)

// Lodash
import _ from "lodash"
Object.defineProperty(Vue.prototype, '_', {value: _})

// object-inspect
import inspect from 'object-inspect'
window.inspect = inspect
Object.defineProperty(Vue.prototype, 'inspect', {value: inspect})

// window
Object.defineProperty(Vue.prototype, 'window', {value: window})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
