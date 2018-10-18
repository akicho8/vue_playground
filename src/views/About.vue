<template lang="pug">
div
  h2.title {{$options.title}}

  h3.title Vue.js
  hr
  table.table
    tr
      th $route.query
      td {{$route.query}}
    tr
      th $route.path
      td {{$route.path}}
    tr
      th $route.name
      td {{$route.name}}
    tr
      th $route.params
      td {{$route.params}}
    tr
      th $route
      td {{inspect($route)}}
    tr
      th $store
      td {{inspect($store)}}

  h3.title Browser
  hr
  table.table
    tr
      th location
      td {{window.location}}
    tr
      th GPS
      td {{!!window.navigator.geolocation}}
    tr
      th userAgent
      td {{window.navigator.userAgent}}
    tr
      th vendor
      td {{window.navigator.vendor}}
    tr
      th platform
      td {{window.navigator.platform}}
</template>

<script>
export default {
  name: 'about',
  title: "About",
  data() {
    return {
    }
  },
}
</script>
