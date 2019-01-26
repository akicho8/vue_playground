<template lang="pug">
.fabric_test1
  h2.title {{current_title}}
  hr
  canvas(ref="my_canvas" width="320" height="240")
</template>

<script>

import { fabric } from "fabric"

export default {
  name: "fabric_test1",
  mounted() {
    const canvas_obj = new fabric.Canvas(this.$refs.my_canvas)
    const rect = new fabric.Rect({width: 80, height: 64, fill: '#00d1b2'})
    canvas_obj.add(rect)
    rect.center()
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"
canvas
  border: 1px dashed $primary
</style>
