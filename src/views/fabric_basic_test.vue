<template lang="pug">
.fabric_basic_test
  h2.title {{current_title}}
  hr
  canvas(ref="my_canvas" width="320" height="240")
</template>

<script>

import { fabric } from "fabric"

export default {
  name: "fabric_basic_test",
  mounted() {
    const canvas_obj = new fabric.Canvas(this.$refs.my_canvas)
    const rect = new fabric.Rect({width: 80, height: 64, fill: '#00d1b2'})
    canvas_obj.add(rect)
    rect.center()
  },
}
</script>

<style lang="sass">
@import "../assets/scss/variables"
.fabric_basic_test
  canvas
    border: 1px dashed $primary
</style>
