<template lang="pug">
.css_position
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
                  | 実際の値

          .field.is-narrow
            .control
              label.checkbox
                input(type="checkbox" v-model="div1_show_p")
                span.is-size-7
                  | div1

          .field.is-narrow
            .control
              label.checkbox
                input(type="checkbox" v-model="div2_show_p")
                span.is-size-7
                  | div2

      .field.is-horizontal
        .field-label.is-small
          label.label
            | サイズ
        .field-body
          .field.has-addons.is-narrow
            p.control
              span.button.is-static.is-small
                | 親
            p.control
              input.input.is-small(type="text" v-model.trim="div0_w" placeholder="width")
            p.control
              input.input.is-small(type="text" v-model.trim="div0_h" placeholder="height")

          .field.has-addons.is-narrow
            p.control
              span.button.is-static.is-small
                | 子
            p.control
              input.input.is-small(type="text" v-model.trim="div1_w" placeholder="width")
            p.control
              input.input.is-small(type="text" v-model.trim="div1_h" placeholder="height")
            p.control
              input.input.is-small(type="text" v-model.trim="div1_margin" placeholder="margin")

      .buttons
        button.button.is-small(@click="mode_reset") 設定なし
        button.button.is-small(@click="mode_absolute") div1浮遊
        button.button.is-small(@click="mode_25p") 位置25%
        button.button.is-small(@click="mode_0p") 位置0%
        button.button.is-small(@click="mode_center1") 中央1
        button.button.is-small(@click="mode_center2") 中央2
        button.button.is-small(@click="mode_bottom_right") 右下配置
      .buttons
        button.button.is-small(@click="fixed_mode_center") 画面中央
        button.button.is-small(@click="fixed_mode_top") 画面上
        button.button.is-small(@click="fixed_mode_bottom") 画面下
        button.button.is-small(@click="fixed_mode_right") 画面右
        button.button.is-small(@click="fixed_mode_left") 画面左

      pre.is-size-7(v-text="flex_css")

      .content
        ul.is-size-7.has-text-grey-light
          li 親は absolute でも relative でもどちらでもよい
          li div1 が relative なときサイズを持つので div1 のあとに div2 が配置される
          li 配置なら flexbox を使った方が簡単
          li 子のサイズが決まっていてそれを中央に配置するには margin: auto が便利

      template(v-if="NODE_ENV !== 'production'")
        .box
          div {{div0_style}}
          div {{div1_style}}

    .column
      .div0.has-text-grey-light(:style="div0_style")
        | .container
        .div1(:style="div1_style" v-if="div1_show_p")
          | div1
        .div2(v-if="div2_show_p")
          | div2
</template>

<script>
export default {
  name: "css_position",
  title: "CSS Position",
  data() {
    return {
      real_value_p: false,

      div1_show_p: true,
      div2_show_p: true,

      params_top: 0,
      params_left: 0,
      params_right: 0,
      params_bottom: 0,

      params_top_p: true,
      params_left_p: true,
      params_right_p: false,
      params_bottom_p: false,

      div0_position: "relative",
      div1_position: "absolute",

      div0_w: "",
      div0_h: "320px",
      div1_w: "",
      div1_h: "",
      div1_margin: "",

      form_parts: [
        { key: "params_top",     name: "上", real_name: "top",    range: { min: -0, max: 100, step: 1,  }, display_key: "params_top_p",    },
        { key: "params_left",    name: "左", real_name: "left",   range: { min: -0, max: 100, step: 1,  }, display_key: "params_left_p",   },
        { key: "params_bottom",  name: "下", real_name: "bottom", range: { min: -0, max: 100, step: 1,  }, display_key: "params_bottom_p", },
        { key: "params_right",   name: "右", real_name: "right",  range: { min: -0, max: 100, step: 1,  }, display_key: "params_right_p",  },
        {
          key: "div0_position",
          name: ".container",
          list: [
            { name: "初期", value: "static",   },
            { name: "固定", value: "fixed",    },
            { name: "絶対", value: "absolute", },
            { name: "相対", value: "relative", },
            { name: "固定2", value: "sticky",   },
          ],
        },
        {
          key: "div1_position",
          name: ".div1",
          list: [
            { name: "初期", value: "static",   },
            { name: "固定", value: "fixed",    },
            { name: "絶対", value: "absolute", },
            { name: "相対", value: "relative", },
            { name: "固定2", value: "sticky", },
          ],
        },
      ],
    }
  },

  created() {
    this.mode_center1()
  },

  methods: {
    mode_reset() {
      this.div0_position = "static"
      this.div1_position = "static"
    },

    mode_absolute() {
      this.div0_position = "relative" // absolute でもよい
      this.div1_position = "absolute"
    },

    mode_25p() {
      this.params_top    = 100 / 4
      this.params_bottom = 100 / 4
      this.params_left   = 100 / 4
      this.params_right  = 100 / 4
    },

    mode_0p() {
      this.params_top    = 0
      this.params_bottom = 0
      this.params_left   = 0
      this.params_right  = 0
    },

    mode_center2() {
      this.mode_absolute()
      this.mode_25p()

      this.div1_w = ""
      this.div1_h = ""
      this.div1_margin = ""

      this.params_top_p    = true
      this.params_bottom_p = true
      this.params_left_p   = true
      this.params_right_p  = true
    },

    mode_center1() {
      this.mode_absolute()
      this.mode_0p()

      this.div1_w = "50%"
      this.div1_h = "50%"
      this.div1_margin = "auto"

      this.params_top_p    = true
      this.params_bottom_p = true
      this.params_left_p   = true
      this.params_right_p  = true
    },

    mode_bottom_right() {
      this.mode_absolute()
      this.mode_0p()
      this.params_top_p    = false
      this.params_bottom_p = true
      this.params_left_p   = false
      this.params_right_p  = true
    },

    fixed_mode_center() {
      this.mode_center2()
      this.div1_position = "fixed"
    },

    fixed_mode_top() {
      this.mode_0p()
      this.div1_position = "fixed"
      this.div1_w = ""
      this.div1_h = "25%"
      this.params_top_p    = true
      this.params_bottom_p = false
      this.params_left_p   = true
      this.params_right_p  = true
    },

    fixed_mode_bottom() {
      this.fixed_mode_top()
      this.params_top_p    = false
      this.params_bottom_p = true
    },

    fixed_mode_right() {
      this.mode_0p()
      this.div1_position = "fixed"
      this.div1_w = "25%"
      this.div1_h = ""
      this.params_top_p    = true
      this.params_bottom_p = true
      this.params_left_p   = true
      this.params_right_p  = false
    },

    fixed_mode_left() {
      this.fixed_mode_right()
      this.params_left_p   = false
      this.params_right_p  = true
    },
  },

  computed: {
    div0_style() {
      let hash = {}
      if (this.div0_position !== 'static') {
        hash["position"] = this.div0_position
      }
      if (this.div0_w !== "") {
        hash["width"] = `${this.div0_w}`
      }
      if (this.div0_h !== "") {
        hash["height"] = `${this.div0_h}`
      }
      return hash
    },

    div1_style() {
      let hash = {}

      if (this.div1_position !== 'static') {
        hash["position"] = this.div1_position
        if (this.params_top_p) {
          hash["top"] = `${this.params_top}%`
        }
        if (this.params_left_p) {
          hash["left"] = `${this.params_left}%`
        }
        if (this.params_right_p) {
          hash["right"] = `${this.params_right}%`
        }
        if (this.params_bottom_p) {
          hash["bottom"] = `${this.params_bottom}%`
        }
      }
      if (this.div1_w !== "") {
        hash["width"] = `${this.div1_w}`
      }
      if (this.div1_h !== "") {
        hash["height"] = `${this.div1_h}`
      }
      if (this.div1_margin !== "") {
        hash["margin"] = `${this.div1_margin}`
      }
      return hash
    },

    flex_css() {
      let str = ""
      str += `.container\n`
      if (this.div0_position !== 'static') {
        str += `  position: ${this.div0_position}\n`
      }
      if (this.div0_w !== "") {
        str += `  width: ${this.div0_w}\n`
      }
      if (this.div0_h !== "") {
        str += `  height: ${this.div0_h}\n`
      }

      str += `  .div1\n`
      if (this.div1_position !== 'static') {
        str += `      position: ${this.div1_position}\n`
        if (this.params_top_p) {
          str += `      top: ${this.params_top}%\n`
        }
        if (this.params_left_p) {
          str += `      left: ${this.params_left}%\n`
        }
        if (this.params_right_p) {
          str += `      right: ${this.params_right}%\n`
        }
        if (this.params_bottom_p) {
          str += `      bottom: ${this.params_bottom}%\n`
        }
      }
      if (this.div1_w !== "") {
        str += `      width: ${this.div1_w}\n`
      }
      if (this.div1_h !== "") {
        str += `      height: ${this.div1_h}\n`
      }
      if (this.div1_margin !== "") {
        str += `      margin: ${this.div1_margin}\n`
      }
      str += `  .div2\n`
      return str
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.css_position
  min-height: 200vh

.div0
  border: 1px dotted #888
  background: linear-gradient(to bottom, rgba(#888888, 0.2), transparent)
  transition: all 0.5s 0s ease-in-out
  .div1
    border: 1px dotted $primary
    background: linear-gradient(to bottom, rgba($primary, 0.2), transparent)
  .div2
    border: 1px dotted $info
    background: linear-gradient(to bottom, rgba($info, 0.2), transparent)
</style>
