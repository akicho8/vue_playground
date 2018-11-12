<template lang="pug">
.google_maps_basic
  h2.title {{$options.title}}
  hr
  .gmap_div(ref="gmap")
</template>

<script>
export default {
  name: 'google_maps_basic',
  title: "Google Maps Basic",
  mounted() {
    const ll = new google.maps.LatLng(35.792621, 139.806513)
    new google.maps.Map(this.$refs.gmap, {zoom: 12, center: ll})
  },
}
</script>

<style scoped lang="sass">
.google_maps_basic
  .gmap_div
    width: 100%
    height: 70vmin
</style>
