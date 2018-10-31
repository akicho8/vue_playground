<template lang="pug">
.google_maps_javascript_api
  h2.title {{$options.title}}
  hr

  .gmap_div(ref="gmap")
</template>

<script>
export default {
  name: 'google_maps_javascript_api',
  title: "Google Maps API",
  data() {
    return {
    }
  },

  mounted() {
    const ll = new google.maps.LatLng(35.792621, 139.806513)
    new google.maps.Map(this.$refs.gmap, {zoom: 12, center: ll})
  },

  methods: {
  },

  computed: {
  },
}
</script>

<style scoped lang="sass">
  .gmap_div
    width: 100%
    height: 70vmin
</style>

