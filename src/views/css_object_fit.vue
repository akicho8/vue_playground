<template lang="pug">
.css_object_fit
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      template(v-for="record in input_elements")
        .field.is-horizontal
          .field-label.is-small
            label.label
              template(v-if="real_value_p")
                span(v-text="record.real_name || record.name" :title="record.name")
              template(v-else)
                span(v-text="record.name")
          .field-body
            template(v-if="record.display_key")
              .field.is-narrow
                .control
                  input(type="checkbox" v-model="$data[record.display_key]")

            .field.is-narrow
              .controll
                template(v-if="record.list")
                  template(v-for="e in record.list")
                    label.radio.is-size-7
                      input(type="radio" v-model="$data[record.key]" :value="e.value")
                      template(v-if="real_value_p")
                        span(v-text="e.value" :title="e.name || e.value")
                      template(v-else)
                        span(v-text="e.name || e.value" :title="e.value")
                template(v-if="record.range")
                  input(type="range" v-model.number="$data[record.key]" :min="record.range.min" :max="record.range.max" :step="record.range.step" :disabled="!(!record.display_key || $data[record.display_key])")
                  span.range_number
                    | {{$data[record.key]}}

      .field.is-horizontal
        .field-label.is-small
          label.label
        .field-body
          .field.is-narrow
            .control
              label.checkbox
                input(type="checkbox" v-model="real_value_p")
                span.is-size-7
                  | 詳細

      .field.is-horizontal
        .field-label.is-small
          label.label
            | サイズ
        .field-body
          .field.has-addons.is-narrow
            p.control
              span.button.is-static.is-small
                | 子
            p.control
              input.input.is-small(type="text" v-model.trim="div1_ws" placeholder="width")
            p.control
              input.input.is-small(type="text" v-model.trim="div1_hs" placeholder="height")

      .buttons
        button.button.is-small(@click="mode_fill") 初期値
        button.button.is-small(@click="mode_cover") トリミング
        button.button.is-small(@click="mode_contain") 比率維持

      pre.is-size-7(v-text="css_body")

      template(v-if="NODE_ENV !== 'production'")
        .section
          .box
            div {{div1_style}}

    .column
      img.div1(:style="div1_style" src="@/assets/ISG106132539_TP_V.jpg")
</template>

<script>
export default {
  name: "css_object_fit",
  title: "CSS object-fit",
  data() {
    return {
      real_value_p: false,

      object_fit: "cover",
      div1_w_p: true,
      div1_h_p: true,
      div1_w: 320,
      div1_h: 480,
      div1_ws: "",
      div1_hs: "",

      input_elements: [
        { key: "div1_w", name: "横幅", real_name: "img width",   range: { min: 0, max: 800, step: 1, }, display_key: "div1_w_p", },
        { key: "div1_h", name: "縦幅", real_name: "img height",  range: { min: 0, max: 800, step: 1, }, display_key: "div1_h_p",  },
        {
          key: "object_fit",
          name: "object-fit",
          list: [
            { name: "伸縮",           value: "fill",   },
            { name: "トリミング",     value: "cover",    },
            { name: "比率維持",       value: "contain", },
            { name: "なし",           value: "none", },
            { name: "スケールダウン", value: "scale-down", },
          ],
        },
      ],
    }
  },

  created() {
  },

  watch: {
  },

  methods: {
    mode_fill() {
      this.object_fit = "fill"

      this.div1_w_p = true
      this.div1_h_p = true
      this.div1_w = 300
      this.div1_h = 500
      this.div1_ws = ""
      this.div1_hs = ""
    },

    mode_cover() {
      this.mode_fill()
      this.object_fit = "cover"
    },

    mode_contain() {
      this.mode_fill()
      this.object_fit = "contain"
    },

    mode_absolute() {
      this.object_fit = "absolute"
    },
  },

  computed: {
    div1_style() {
      let hash = {}

      if (this.object_fit !== 'fill') {
        hash["object-fit"] = this.object_fit
      }
      if (this.div1_w_p) {
        hash["width"] = `${this.div1_w}px`
      }
      if (this.div1_h_p) {
        hash["height"] = `${this.div1_h}px`
      }
      if (this.div1_ws !== "") {
        hash["width"] = `${this.div1_ws}`
      }
      if (this.div1_hs !== "") {
        hash["height"] = `${this.div1_hs}`
      }
      return hash
    },

    css_body() {
      let str = ""
      str += `img\n`
      if (this.div1_ws !== "") {
        str += `    width: ${this.div1_ws}\n`
      } else {
        if (this.div1_w_p) {
          str += `    width: ${this.div1_w}px\n`
        }
      }
      if (this.div1_hs !== "") {
        str += `    height: ${this.div1_hs}\n`
      } else {
        if (this.div1_h_p) {
          str += `    height: ${this.div1_h}px\n`
        }
      }
      if (this.object_fit !== 'fill') {
        str += `    object-fit: ${this.object_fit}\n`
      }
      return str
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.div1
  border: 1px dotted $dark
</style>
