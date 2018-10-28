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
                      b-tooltip(:label="e.tooltip" multilined)
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
          .field.is-narrow
            .control
              label.checkbox
                input(type="checkbox" v-model="object_position_p")
                span.is-size-7
                  | object-position

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
        button.button.is-small(@click="mode_cover") トリミング(欠け)
        button.button.is-small(@click="mode_contain") 比率維持(含む)

      pre.is-size-7(v-text="css_body")

      template(v-if="NODE_ENV !== 'production'")
        .section
          .box
            div {{div1_style}}

    .column
      img.div1(:style="div1_style" :src="img_files_current" @click="img_files_next")
</template>

<script>
import I9A5312ISUMI_TP_V from "@/assets/I9A5312ISUMI_TP_V.jpg"
import IS107112702_TP_V from "@/assets/IS107112702_TP_V.jpg"
import IMARI20160806355715_TP_V from "@/assets/IMARI20160806355715_TP_V.jpg"
import IMGL5303_TP_V from "@/assets/IMGL5303_TP_V.jpg"
import ISG106132539_TP_V from "@/assets/ISG106132539_TP_V.jpg"
import logo from "@/assets/logo.png"
import rails from "@/assets/rails.png"

export default {
  name: "css_object_fit",
  title: "CSS object-fit",
  data() {
    return {
      real_value_p: false,
      object_position_p: true,

      object_fit: "cover",
      div1_w_p: true,
      div1_h_p: true,
      div1_w: 3 * 32 * 5,
      div1_h: 4 * 32 * 5,
      div1_ws: "",
      div1_hs: "",

      object_position_x: 36,
      object_position_y: 50,

      img_files_index: 0,
      img_files: [
        // ISG106132539_TP_V,
        IS107112702_TP_V,
        // I9A5312ISUMI_TP_V,
        // IMARI20160806355715_TP_V,
        // logo,
        rails,
      ],

      input_elements: [
        { key: "div1_w",            name: "横幅", real_name: "img width",         range: { min: 0,    max: 800, step: 1, }, display_key: "div1_w_p", },
        { key: "div1_h",            name: "縦幅", real_name: "img height",        range: { min: 0,    max: 800, step: 1, }, display_key: "div1_h_p",  },
        { key: "object_position_x", name: "基点x", real_name: "object-position x", range: { min: -100, max: 200, step: 1, }, },
        { key: "object_position_y", name: "基点y", real_name: "object-position y", range: { min: -100, max: 200, step: 1, }, },
        {
          key: "object_fit",
          name: "object-fit",
          list: [
            { name: "伸縮",           value: "fill",       tooltip: "比率無視で変形してしまうので写真には使えない", },
            { name: "トリミング",     value: "cover",      tooltip: "エリア重要。写真の全体は必要でないとき。エリアを覆える。部分欠けする。ある部分に焦点して表示するには object-position で調整できる", },
            { name: "比率維持",       value: "contain",    tooltip: "写真が重要。全体を綺麗に表示したいとき", },
            { name: "なし",           value: "none",       tooltip: "なにもしない", },
            { name: "スケールダウン", value: "scale-down", tooltip: "比率維持(contain) と なし(none) の小さい方。比率維持して表示したいがもともとの画像が小さいと巨大化して困る場合に使う", },
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
      this.div1_w = 480
      this.div1_h = 640
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

    img_files_next() {
      this.img_files_index += 1
    },
  },

  computed: {
    img_files_current() {
      return this.img_files[this.img_files_index % this.img_files.length]
    },

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
      if (this.object_position_p) {
        hash["object-position"] = `${this.object_position_x}% ${this.object_position_y}%`
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
      if (this.object_position_p) {
        str += `    object-position: ${this.object_position_x}% ${this.object_position_y}%\n`
      }
      return str
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.div1
  border: 1px dotted $primary
  background: hsla(0, 0, 0, 0.02)
  // object-position: right bottom
</style>
