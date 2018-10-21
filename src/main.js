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
window.lodash = _
window._ = _
Object.defineProperty(Vue.prototype, '_', {value: _})
Object.defineProperty(Vue.prototype, 'lodash', {value: _})

// object-inspect
import inspect from 'object-inspect'
window.inspect = inspect
Object.defineProperty(Vue.prototype, 'inspect', {value: inspect})

// window
Object.defineProperty(Vue.prototype, 'window', {value: window})

// NODE_ENV
Object.defineProperty(Vue.prototype, 'NODE_ENV', {value: process.env.NODE_ENV})

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
      if (this.$route.query.layout === "simple") {
        document.title = title
      } else {
        document.title = `${title} - Vue Playground`
      }
    }
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
