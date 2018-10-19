<template lang="pug">
div
  .h2.title {{$options.title}}
  hr
  .columns
    .column
      .field.is-horizontal(v-for="record in input_elements")
        .field-label.is-small
          label.label
            template(v-if="real_value_p")
              span(v-text="record.name2 || record.name" :title="record.name")
            template(v-else)
              span(v-text="record.name")
        .field-body
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
                input(type="range" v-model.number="$data[record.key]" :min="record.range.min" :max="record.range.max" :step="record.range.step")
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

          .field.is-narrow
            .control
              label.checkbox
                input(type="checkbox" v-model="params_top_p")
                span.is-size-7
                  | 上
          .field.is-narrow
            .control
              label.checkbox
                input(type="checkbox" v-model="params_bottom_p")
                span.is-size-7
                  | 下
          .field.is-narrow
            .control
              label.checkbox
                input(type="checkbox" v-model="params_left_p")
                span.is-size-7
                  | 左
          .field.is-narrow
            .control
              label.checkbox
                input(type="checkbox" v-model="params_right_p")
                span.is-size-7
                  | 右

      .box
        div {{div0_style}}
        div {{div1_style}}

      pre.is-size-6(v-text="flex_css")

      ul.is-size-7.has-text-grey-light
        li transform-style: {{div0_position}} は transform: perspective({{perspective}}) の組み合わせのときだけ効く
        li perspective: {{this.perspective}}px を直接使った場合は常に 3D になる

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
  name: "css_relative",
  title: "CSS Absolute",
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

      input_elements: [
        { key: "params_top",     name: "上", name2: "top",    range: { min: -0, max: 100, step: 1,    }, },
        { key: "params_left",    name: "左", name2: "left",   range: { min: -0, max: 100, step: 1,    }, },
        { key: "params_right",   name: "右", name2: "right",  range: { min: -0, max: 100, step: 1,    }, },
        { key: "params_bottom",  name: "下", name2: "bottom", range: { min: -0, max: 100, step: 1,    }, },
        {
          key: "div0_position",
          name: "div0 position",
          list: [
            { name: "なし", value: null,       },
            { name: "絶対", value: "absolute", },
            { name: "相対", value: "relative", },
          ],
        },
        {
          key: "div1_position",
          name: "div1 position",
          list: [
            { name: "なし", value: null,       },
            { name: "絶対", value: "absolute", },
            { name: "相対", value: "relative", },
          ],
        },
      ],
    }
  },
  computed: {
    div0_style() {
      let hash = {}
      if (this.div0_position) {
        hash["position"] = this.div0_position
      }
      return hash
    },
    div1_style() {
      let hash = {}
      if (this.div1_position) {
        hash["position"] = this.div1_position
      }
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
      return hash
    },

    flex_css() {
      let str = ""
      str += `.container\n`
      if (this.div0_position) {
        str += `  position: ${this.div0_position}\n`
      }
      str += `  .div1\n`
      if (this.div1_position) {
        str += `      position: ${this.div1_position}\n`
      }
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
      // str += `      border: 1px solid blue\n`
      str += `  .div2\n`
      // str += `    border: 1px solid green\n`
      return str
    },
  },
}
</script>

<style lang="sass">
.div0
  border: 1px dotted #888
  width: 320px
  height: 240px
  background: linear-gradient(to bottom, transparent, rgba(#888888, 0.2))
  .div1
    border: 1px dotted #0000ff
    background: linear-gradient(to bottom, transparent, rgba(#0000ff, 0.2))
  .div2
    border: 1px dotted #00ff00
    background: linear-gradient(to bottom, transparent, rgba(#00ff00, 0.2))
</style>
