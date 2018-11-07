<template lang="pug">
.css_object_fit
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      template(v-for="record in form_parts")
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
              input.input.is-small(type="text" v-model.trim="img1_ws" placeholder="width")
            p.control
              input.input.is-small(type="text" v-model.trim="img1_hs" placeholder="height")

      .buttons
        button.button.is-small(@click="preset_fill") 伸縮させたい
        button.button.is-small(@click="preset_trimming") 切り抜きたい
        button.button.is-small(@click="preset_contain") 写真全体を表示したい
        button.button.is-small(@click="preset_none") 伸縮したくない
        button.button.is-small(@click="preset_scale_down") ドットを拡大したくない

      pre.is-size-7(v-text="css_body")

      .content
        ul.is-size-7.has-text-grey-light
          li object-fit: fill が初期値
          li object-position: 50% 50% が初期値
          li 余白色は background: で指定できる
          li 小さな画像を拡大したくないだけなら scale-down よりも max-height などを使った方が良い

      template(v-if="NODE_ENV !== 'production'")
        .section
          .box
            div {{img1_style}}

    .column
      img.img1(:style="img1_style" :src="image_files_current" @click="image_files_next")
</template>

<script>
// import I9A5312ISUMI_TP_V from "@/assets/I9A5312ISUMI_TP_V.jpg"
import IS107112702_TP_V from "@/assets/IS107112702_TP_V.jpg"
// import IMARI20160806355715_TP_V from "@/assets/IMARI20160806355715_TP_V.jpg"
// import IMGL5303_TP_V from "@/assets/IMGL5303_TP_V.jpg"
// import ISG106132539_TP_V from "@/assets/ISG106132539_TP_V.jpg"
// import logo from "@/assets/logo.png"
import rails from "@/assets/rails.png"

export default {
  name: "css_object_fit",
  title: "CSS object-fit",
  data() {
    return {
      real_value_p: false,

      object_fit: null,
      img1_w_p: null,
      img1_h_p: null,
      img1_w: null,
      img1_h: null,
      img1_ws: null,
      img1_hs: null,
      object_position_p: null,
      object_position_x: null,
      object_position_y: null,
      current_image_index: null,

      image_files: [
        // ISG106132539_TP_V,
        IS107112702_TP_V,
        // I9A5312ISUMI_TP_V,
        // IMARI20160806355715_TP_V,
        // logo,
        rails,
      ],

      form_parts: [
        { key: "img1_w",            name: "横幅", real_name: "img width",          range: { min: 0,    max: 800, step: 1, }, display_key: "img1_w_p", },
        { key: "img1_h",            name: "縦幅", real_name: "img height",         range: { min: 0,    max: 800, step: 1, }, display_key: "img1_h_p",  },
        { key: "object_position_x", name: "基点x", real_name: "object-position x", range: { min: -100, max: 200, step: 1, }, },
        { key: "object_position_y", name: "基点y", real_name: "object-position y", range: { min: -100, max: 200, step: 1, }, },
        {
          key: "object_fit",
          name: "object-fit",
          list: [
            { name: "伸縮",           value: "fill",       tooltip: "用途不明。比率無視で変形してしまう。人物写真には向かない",                                                                          },
            { name: "トリミング",     value: "cover",      tooltip: "写真立て用。写真の全体は必要でないとき。エリアを覆える。部分欠けする。ある部分に焦点して表示するには object-position で調整できる", },
            { name: "比率維持",       value: "contain",    tooltip: "写真が重要。全体を綺麗に表示したいとき",                                                                                            },
            { name: "なし",           value: "none",       tooltip: "元画像をいっさい変形させない。伸縮しない",                                                                                          },
            { name: "スケールダウン", value: "scale-down", tooltip: "比率維持(contain) と なし(none) の小さい方。比率維持して表示したいがもともとの画像が小さいと巨大化して困る場合に使う",              },
          ],
        },
      ],
    }
  },

  created() {
    this.preset_trimming()
  },

  watch: {
  },

  methods: {
    preset_default() {
      this.current_image_index = 0
      this.object_fit = "fill"
      this.img1_w_p = true
      this.img1_h_p = true
      this.img1_w = 480
      this.img1_h = 640
      this.img1_ws = ""
      this.img1_hs = ""
      this.object_position_p = true
      this.object_position_x = 50
      this.object_position_y = 50
    },

    preset_fill() {
      this.preset_default()

      this.object_fit = "fill"
      this.object_position_p = false
    },

    preset_trimming() {
      this.preset_default()

      this.object_fit = "cover"
      this.object_position_x = 36
      this.object_position_y = 50
    },

    preset_contain() {
      this.preset_default()
      this.object_fit = "contain"
    },

    preset_none() {
      this.preset_default()
      this.object_fit = "none"
      this.object_position_x = 32
      this.object_position_y = 16
    },

    preset_scale_down() {
      this.preset_default()
      this.object_fit = "scale-down"
      this.current_image_index = 1
    },

    image_files_next() {
      this.current_image_index += 1
    },
  },

  computed: {
    image_files_current() {
      return this.image_files[this.current_image_index % this.image_files.length]
    },

    img1_style() {
      let hash = {}
      if (this.object_fit !== 'fill') {
        hash["object-fit"] = this.object_fit
      }
      if (this.img1_w_p) {
        hash["width"] = `${this.img1_w}px`
      }
      if (this.img1_h_p) {
        hash["height"] = `${this.img1_h}px`
      }
      if (this.img1_ws !== "") {
        hash["width"] = `${this.img1_ws}`
      }
      if (this.img1_hs !== "") {
        hash["height"] = `${this.img1_hs}`
      }
      if (this.object_position_p) {
        hash["object-position"] = `${this.object_position_x}% ${this.object_position_y}%`
      }
      return hash
    },

    css_body() {
      let str = ""
      str += `img\n`
      if (this.img1_ws !== "") {
        str += `    width: ${this.img1_ws}\n`
      } else {
        if (this.img1_w_p) {
          str += `    width: ${this.img1_w}px\n`
        }
      }
      if (this.img1_hs !== "") {
        str += `    height: ${this.img1_hs}\n`
      } else {
        if (this.img1_h_p) {
          str += `    height: ${this.img1_h}px\n`
        }
      }
      if (this.object_fit !== 'fill' || true) {
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

.img1
  border: 1px dotted $primary
  background: hsla(0, 0, 0, 0.02)
</style>
