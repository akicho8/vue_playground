<template lang="pug">
div
  h2.title {{current_title}}
  hr
  .columns
    .column
      .field.is-horizontal(v-for="record in form_parts")
        .field-label.is-small
          label.label
            a(:href="`https://developer.mozilla.org/ja/docs/Web/CSS/${_.kebabCase(record.key)}`" target="_blank")
              template(v-if="real_value_p")
                span(v-text="record.key" :title="record.name")
              template(v-else)
                span(v-text="record.name" :title="_.kebabCase(record.key)")
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
                input(type="checkbox" v-model="div0_show_p")
                span.is-size-7
                  | div0

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
                input(type="checkbox" v-model="div3_show_p")
                span.is-size-7
                  | div3

      .box
        div
          | {{div2_style}}
        div
          | {{div2_1_style}}

      ul.is-size-7.has-text-grey-light
        li transform-style: {{transformStyle}} は transform: perspective({{perspective}}) の組み合わせのときだけ効く
        li perspective: {{this.perspective}}px を直接使った場合は常に 3D になる

    .column
      .box
        .relative_div
          template(v-if="div0_show_p")
            .div0
              | div0
          template(v-if="div1_show_p")
            .div1
              | div1
          template(v-if="div2_show_p")
            .div2(:style="div2_style")
              | div2
              .div2_1(:style="div2_1_style")
                | div2_1
          template(v-if="div3_show_p")
            .div3
              | div3

      .box
        .relative_div
          .div0
            | div0
          .div1
            | div1
          .div2(:style="div2_style")
            | div2
            .div2_1(:style="div2_1_style")
              | div2_1
          .div3
            | div3
</template>

<script>
export default {
  name: "css_transform",
  data() {
    return {
      real_value_p: false,

      div0_show_p: true,
      div1_show_p: true,
      div2_show_p: true,
      div3_show_p: true,

      translateX: 0,
      translateY: 0,
      translateZ: 0,
      rotateX: 45,
      rotateY: 0,
      rotateZ: 0,
      scaleX: 1.0,
      scaleY: 2.0,
      scaleZ: 1.0,
      perspective: 50,
      transformStyle: "preserve-3d",
      transformOrigin: "50% 100% 0",

      form_parts: [
        { key: "translateX",  name: "位置X",  range: { min: -999, max: 999, step: 1,    }, },
        { key: "translateY",  name: "位置Y",  range: { min: -999, max: 999, step: 1,    }, },
        { key: "translateZ",  name: "位置Z",  range: { min: -999, max: 999, step: 1,    }, },
        { key: "rotateX",     name: "回転X",  range: { min: 0,    max: 360, step: 1,    }, },
        { key: "rotateY",     name: "回転Y",  range: { min: 0,    max: 360, step: 1,    }, },
        { key: "rotateZ",     name: "回転Z",  range: { min: 0,    max: 360, step: 1,    }, },
        { key: "scaleX",      name: "拡縮X",  range: { min: -8.0, max: 8.0, step: 0.01, }, },
        { key: "scaleY",      name: "拡縮Y",  range: { min: -8.0, max: 8.0, step: 0.01, }, },
        { key: "scaleZ",      name: "拡縮Z",  range: { min: -8.0, max: 8.0, step: 0.01, }, },
        { key: "perspective", name: "遠近感", range: { min: 0,    max:9999, step: 1,    }, },
        {
          key: "transformStyle",
          name: "2D/3D",
          list: [
            { name: "2D", value: "flat",        },
            { name: "3D", value: "preserve-3d", },
          ],
        },
        {
          key: "transformOrigin",
          name: "回転基点",
          list: [
            { name: "中央", value: "50%  50% 0",    },
            { name: "中上", value: "50%   0% 0",    },
            { name: "中下", value: "50% 100% 0",    },
          ],
        },
      ],
    }
  },
  computed: {
    div2_style() {
      return {
        "transform-style": this.transformStyle,
        transform: `perspective(${this.perspective}px)`,

        // こっちを使う場合 transform-style は効かない。常に 3D になる。
        // "perspective": `${this.perspective}px`,
      }
    },
    div2_1_style() {
      let transform = []
      transform.push(`translateX(${this.translateX}px)`)
      transform.push(`translateY(${this.translateY}px)`)
      transform.push(`translateZ(${this.translateZ}px)`)
      transform.push(`rotateX(${this.rotateX}deg)`)
      transform.push(`rotateY(${this.rotateY}deg)`)
      transform.push(`rotateZ(${this.rotateZ}deg)`)
      transform.push(`scaleX(${this.scaleX})`)
      transform.push(`scaleY(${this.scaleY})`)
      transform.push(`scaleZ(${this.scaleZ})`)
      transform.push(`scaleZ(${this.scaleZ})`)
      // transform.push(`rotate3d(1,2,3,${this.rotateZ}deg)`)

      // transform.push(`perspective(${this.perspective}px)`)
      return {
        // "transform-style": "preserve-3d",
        // "perspective": `${this.perspective}px`,
        transform: transform.join(" "),
        "transform-origin": this.transformOrigin,
      }
    },
  },
}
</script>

<style lang="sass">
.relative_div
  position: relative
  border: 1px solid red
  width: 256px
  height: 256px

  .div0
    position: absolute
    top: 0
    left: 0
    background: hsla(0, 50%, 50%, 0.5)
    width: 100%
    height: 100%

  .div1
    position: absolute
    top: 0
    left: 0
    background: hsla(0, 50%, 100%, 0.5)
    width: 100%
    height: 100%
    border: 1px solid blue

  .div2
    width: 100%
    height: 100%
    position: absolute
    .div2_1
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: linear-gradient(to bottom, transparent 50%, rgba(#0000ff, 0.2))
      // filter: blur(1px)

  .div3
    position: absolute
    top: 0
    left: 0
    border: 1px solid blue
</style>
