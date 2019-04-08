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

// https://github.com/SSENSE/vue-carousel
import VueCarousel from 'vue-carousel'
Vue.use(VueCarousel)

// window
Object.defineProperty(Vue.prototype, 'window', {value: window})

// NODE_ENV
Object.defineProperty(Vue.prototype, 'NODE_ENV', {value: process.env.NODE_ENV})

// Google API_KEY
Object.defineProperty(Vue.prototype, 'API_KEY', {value: "AIzaSyC7zlJqafBfX426jk42IkZfHZo8b0_sXmA"})

Vue.config.productionTip = false

// Vue.config.errorHandler = (error, vm, info) => {
//   console.log(`Captured in Vue.config.errororHandler: ${info}`, error)
// }

import './assets/scss/app.scss'

import sample_image_mod from "./sample_image_mod.js"
Vue.mixin(sample_image_mod)

import "css-browser-selector"

Vue.mixin({
  computed: {
    current_title() {
      return this.$options.title || this.$route.meta.title
    },
    current_layout() {
      return this.$route.query.layout || this.$options.layout || this.$route.meta.layout || "basic"
    },
  },

  methods: {
    foobar(key) {
      // const title = this.$router.resolve({name: key}).route.meta.title
      // return `<router-link class="navbar-item" :to="{name: '${key}'}">${title}</router-link>`
      return this.$createElement("div", "a")
    },
  },

  mounted() {
    let title = this.current_title
    if (title) {
      if (typeof title === 'function') {
        title = title.call(this)
      }
      if (this.current_layout === "basic") {
        title = `${title} - Vue.js Playground`
      }
      const dom = document.querySelector("meta[property='og:title']")
      if (dom) {
        dom.setAttribute("content", title)
      }
      document.title = title
    }
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
