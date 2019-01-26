<template lang="pug">
.fabric_test2
  h2.title {{current_title}}
  hr
  .columns
    .column
      canvas(ref="my_canvas" width="320" height="240")
      p
        a(href="http://fabricjs.com/docs/" target="_blank") http://fabricjs.com/docs/
      .box(v-html="svg_text")
    .column
      .box
        | {{json_text}}
      .box
        | {{svg_text}}
</template>

<script>

import { fabric } from "fabric"

export default {
  name: "fabric_test2",
  data() {
    return {
      canvas_object: null,
    }
  },
  mounted() {
    this.canvas_object = new fabric.Canvas(this.$refs.my_canvas)
    const rect = new fabric.Rect({
      top: 100,
      left: 100,
      width: 60,
      height: 70,
      fill: 'red',
    })

    // rect.set({
    //   borderColor: 'black',
    //   cornerColor: 'black',
    //   cornerSize: 32,
    //   transparentCorners: true,
    // })

    this.canvas_object.add(rect)

    fabric.Image.fromURL(this.sample_image, function(sunImg) {
      this.canvas_object.add(sunImg)
      sunImg.center()
    })

  },
  methods: {
  },
  computed: {
    json_text() {
      if (this.canvas_object) {
        return this.canvas_object.toJSON()
      }
    },
    svg_text() {
      if (this.canvas_object) {
        return this.canvas_object.toSVG()
      }
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.fabric_test2
  canvas
    border: 1px dashed $primary
</style>
