import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: "is-active", // router-link-exact-active
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/geo_location',
      name: 'geo_location',
      component: () => import(/* webpackChunkName: "geo_location" */ './views/geo_location.vue')
    },
    {
      path: '/css_transform',
      name: 'css_transform',
      component: () => import(/* webpackChunkName: "css_transform" */ './views/css_transform.vue')
    },
    {
      path: '/css_flexbox',
      name: 'css_flexbox',
      component: () => import(/* webpackChunkName: "css_flexbox" */ './views/css_flexbox.vue')
    },
    {
      path: '/color_scheme',
      name: 'color_scheme',
      component: () => import(/* webpackChunkName: "color_scheme" */ './views/color_scheme.vue')
    },
    {
      path: '/stopwatch',
      name: 'stopwatch',
      component: () => import(/* webpackChunkName: "stopwatch" */ './views/stopwatch.vue')
    },
    {
      path: '/strange_attractor',
      name: 'strange_attractor',
      component: () => import(/* webpackChunkName: "strange_attractor" */ './views/strange_attractor.vue')
    },
    {
      path: '/css_position',
      name: 'css_position',
      component: () => import(/* webpackChunkName: "css_position" */ './views/css_position.vue')
    },
    {
      path: '/navigator_vibrate',
      name: 'navigator_vibrate',
      component: () => import(/* webpackChunkName: "navigator_vibrate" */ './views/navigator_vibrate.vue')
    },
    {
      path: '/css_filter',
      name: 'css_filter',
      component: () => import(/* webpackChunkName: "css_filter" */ './views/css_filter.vue')
    },
    {
      path: '/html_audio_checker',
      name: 'html_audio_checker',
      component: () => import(/* webpackChunkName: "html_audio_checker" */ './views/html_audio_checker.vue')
    },
    {
      path: '/web_audio_api_checker',
      name: 'web_audio_api_checker',
      component: () => import(/* webpackChunkName: "web_audio_api_checker" */ './views/web_audio_api_checker.vue')
    },
    {
      path: '/web_audio_api_for_mobile',
      name: 'web_audio_api_for_mobile',
      component: () => import(/* webpackChunkName: "web_audio_api_for_mobile" */ './views/web_audio_api_for_mobile.vue')
    },
  ]
})
