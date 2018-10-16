<template lang="pug">
.color_scheme
  h2.title 配色見本
  hr

  .field.is-horizontal
    .field-label.is-small
      label.label
        | ベースカラー
    .field-body
      .field
        input.input.is-small(type="color" v-model="base_color")

  .field.is-horizontal
    .field-label.is-small
      label.label
        | 表示
    .field-body
      .field.is-narrow
        .controll
          label.radio.is-size-7
            input(type="radio" v-model="display_mode" value="hsl")
            | HSL
          label.radio.is-size-7
            input(type="radio" v-model="display_mode" value="name")
            | 名前
          label.radio.is-size-7
            input(type="radio" v-model="display_mode" value="rgb")
            | RGB
          label.radio.is-size-7
            input(type="radio" v-model="display_mode" value="hex")
            | HEX
          label.radio.is-size-7
            input(type="radio" v-model="display_mode" value="temperature")
            | 温度
          label.radio.is-size-7
            input(type="radio" v-model="display_mode" value="luminance")
            | 明るさ
          label.radio.is-size-7
            input(type="radio" v-model="display_mode" value="hsv")
            | HSV
          label.radio.is-size-7
            input(type="radio" v-model="display_mode" value="hsi")
            | HSI
          label.radio.is-size-7
            input(type="radio" v-model="display_mode" value="gl")
            | gl

  .field.is-horizontal
    .field-label.is-small
      label.label
        | モノクロマティック(step)
    .field-body
      .field.is-narrow
        .controll
          input(type="range" v-model.number="sabun" :min="0.0" :max="0.5" :step="0.001")
          span.range_number
            | {{sabun}}

  button.button(@click="random_run") ランダム

  //- .is-size-6 Split-Complement
  //- .color_bar
  //-   .color_box.is-size-7.base(:style="{background: color0.css()}") {{color0.name()}}
  //-   .color_box.is-size-7.main(:style="{background: color1.css()}") {{color1.name()}}
  //-   .color_box.is-size-7.wsize05(:style="{background: color2.css()}") {{color2.name()}}

  template(v-for="preset_info in preset_infos")
    .preset_info
      .is-size-7
        | {{preset_info.name}}&nbsp;
        span.has-text-grey-light
          | {{preset_info.description}}
      .color_bar
        template(v-for="color_info in preset_info.color_infos")
          .color_box.is-size-7(:class="color_info.css_class" :style="{background: color_info.color.css(), color: text_color(color_info.color)}")
            template(v-if="display_mode === 'hsl'")
              | {{color_info.color.css('hsl')}}
            template(v-if="display_mode === 'rgb'")
              | {{color_info.color.css('rgb')}}
            template(v-if="display_mode === 'hex'")
              | {{color_info.color.hex()}}
            template(v-if="display_mode === 'temperature'")
              | {{color_info.color.temperature()}}
            template(v-if="display_mode === 'luminance'")
              | {{color_info.color.luminance()}}
            template(v-if="display_mode === 'name'")
              | {{color_info.color.name()}}
            template(v-if="display_mode === 'hsv'")
              | {{color_info.color.hsv()}}
            template(v-if="display_mode === 'hsi'")
              | {{color_info.color.hsi()}}
            template(v-if="display_mode === 'gl'")
              | {{color_info.color.gl()}}
</template>

<script>
import chroma from "chroma-js"

export default {
  name: 'color_scheme',
  data() {
    return {
      base_color: null,
      display_mode: "hsl",
      sabun: 0.1,
    }
  },
  created() {
    this.random_run()
  },
  methods: {
    random_run() {
      this.base_color = chroma.random().hex()
    },
    hue_add(v) {
      return this.color0.set("hsl.h", this.color0.get("hsl.h") + v)
    },
    lighten_add(v) {
      return this.color0.set("hsl.l", this.color0.get("hsl.l") + v * this.sabun)
    },
    // lighten_add2(v) {
    //   return this.color0.brighten(v)
    // },
    saturation_add(v) {
      return this.color0.set("hsl.s", this.color0.get("hsl.s") + v * this.sabun)
    },
    text_color(color) {
      // let sign = 1
      // // if (color.get('hsl.l') >= 0.35) {
      // if (color.luminance() >= 0.35) {
      //   sign *= -1
      // }
      // return color.set('hsl.l', color.get('hsl.l') + (sign * 0.5))

      // let sign = 1
      // let center = 0.5
      // let gap = color.luminance() - 0.5
      // if (gap >= 0) {
      //   return color.luminance(0.3 - gap * 3)
      // } else {
      //   return color.luminance(0.7 + gap * 3)
      // }


      let center = 0.5
      let strong = 3
      let step = 5
      let gap = color.luminance() - center
      if (gap >= 0) {
        return color.darken(strong + gap * step)
      } else {
        return color.brighten(strong + -gap * step)
      }
    },
  },

  computed: {
    color0() { return chroma(this.base_color) },

    preset_infos() {
      return [
        {
          name: "スプリットコンプリメンタリー",
          name_en: "Split-Complement",
          description: "補色の関係でないためハレーションが起きない。",
          color_infos: [
            { css_class: "wsize70", color: this.hue_add(0),        },
            { css_class: "wsize25", color: this.hue_add(180 - 30), },
            { css_class: "wsize05", color: this.hue_add(180 + 30), },
          ],
        },
        {
          name: "アナロガス",
          name_en: "Analogous",
          description: "隣合う色。調和がとれる",
          color_infos: [
            { css_class: "wsize50", color: this.hue_add(0),   },
            { css_class: "wsize50", color: this.hue_add(60),  },
          ],
        },
        {
          name: "トライアド",
          name_en: "Triad",
          description: "正三角形。強いインパクト",
          color_infos: [
            { css_class: "wsize70", color: this.hue_add(0),    },
            { css_class: "wsize25", color: this.hue_add(-120), },
            { css_class: "wsize05", color: this.hue_add(+120), },
          ],
        },
        {
          name: "テトラディック",
          name_en: "Tetradic (Square)",
          description: "正四角形。派手。ハレーションあり",
          color_infos: [
            { css_class: "wsize25", color: this.hue_add(90*0), },
            { css_class: "wsize25", color: this.hue_add(90*1), },
            { css_class: "wsize25", color: this.hue_add(90*2), },
            { css_class: "wsize25", color: this.hue_add(90*3), },
          ],
        },
        {
          name: "モノクロマティック(明度)",
          name_en: "Monochromatic",
          description: "明度で変化をつける",
          color_infos: [
            { css_class: "wsize25", color: this.lighten_add(0), },
            { css_class: "wsize25", color: this.lighten_add(1), },
            { css_class: "wsize25", color: this.lighten_add(2), },
            { css_class: "wsize25", color: this.lighten_add(3), },
          ],
        },
        {
          name: "モノクロマティック(彩度)",
          name_en: "Monochromatic",
          description: "彩度で変化をつける",
          color_infos: [
            { css_class: "wsize25", color: this.saturation_add(0), },
            { css_class: "wsize25", color: this.saturation_add(1), },
            { css_class: "wsize25", color: this.saturation_add(2), },
            { css_class: "wsize25", color: this.saturation_add(3), },
          ],
        },
        {
          name: "補色",
          name_en: "Complementary",
          description: "補色(対極の色)。ハレーションあり。使用禁止",
          color_infos: [
            { css_class: "wsize50", color: this.hue_add(0),   },
            { css_class: "wsize50", color: this.hue_add(180), },
          ],
        },
      ]
    },
  },
}
</script>

<style scoped lang="sass">
  .preset_info
    margin-top: 0.5rem
    .color_bar
      width: 100%
      height: 48px
      display: flex
      .color_box
        display: flex
        justify-content: center
        align-items: center
        width: 100%
</style>
