<template lang="pug">
.fabric_export_test
  h2.title {{current_title}}
  hr
  .columns
    .column
      .field
        .is-size-7 オリジナル
        canvas(ref="my_canvas" width="320" height="240")

      .field
        .is-size-7 toSVG を反映
        .svg_copy_area(v-html="svg_text")

      .field
        a.button(@click="data_url_handle") toDataURL で URL化
        div
          template(v-if="data_url")
            img(:src="data_url")

      p
        a(href="http://fabricjs.com/docs/" target="_blank") http://fabricjs.com/docs/
    .column
      .box
        | toJSON
        code
          | {{json_text}}
      .box
        | toSVG
        code
          | {{svg_text}}
</template>

<script>

import { fabric } from "fabric"

export default {
  name: "fabric_export_test",
  data() {
    return {
      canvas_object: null,
      data_url: null,
    }
  },
  mounted() {
    this.canvas_object = new fabric.Canvas(this.$refs.my_canvas)

    const rect = new fabric.Rect({top: 0, left: 0, width: 48, height: 32, fill: 'red'})
    this.canvas_object.add(rect)
    rect.center()

    fabric.Image.fromURL(this.sample_image, e => {
      this.canvas_object.add(e)
      e.scale(0.1)
      e.center()

      this.canvas_object.setActiveObject(e)
    })
  },
  methods: {
    data_url_handle() {
      if (this.canvas_object) {
        // http://fabricjs.com/docs/fabric.Canvas.html#toDataURL
        this.data_url = this.canvas_object.toDataURL({enableRetinaScaling: false})
      }
    },
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

.fabric_export_test
  canvas, .svg_copy_area
    border: 1px dashed $primary
</style>
