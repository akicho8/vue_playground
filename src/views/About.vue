<template lang="pug">
div
  h2.title Vue.js
  hr
  table.table
    tr
      th query
      td {{$route.query}}
    tr
      th params
      td {{$route.params}}
    tr
      th $route
      td {{inspect($route)}}
    tr
      th $store
      td {{inspect($store)}}

  h2.title Brawser
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
  data() {
    return {
    }
  },
}
</script>
