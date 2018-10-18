import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// Buefy
import Buefy from 'buefy'
import './assets/scss/app.scss'
Vue.use(Buefy)
import './bulma_burger.js'      // バーガー開閉

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

Vue.config.errorHandler = (error, vm, info) => {
  console.log(`Captured in Vue.config.errororHandler: ${info}`, error)
}

Vue.mixin({
  mounted() {
    let { title } = this.$options
    if (title) {
      if (typeof title === 'function') {
        title = title.call(this)
      }
      document.title = `${title} - Vue Playground`
    }
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
