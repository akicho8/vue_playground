import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
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
      name: '位置情報',
      component: () => import(/* webpackChunkName: "geo_location" */ './views/geo_location.vue')
    },
    {
      path: '/css_transform',
      name: 'CSS transform',
      component: () => import(/* webpackChunkName: "css_transform" */ './views/css_transform.vue')
    },
  ]
})
