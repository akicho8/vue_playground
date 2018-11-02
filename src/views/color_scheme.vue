<template lang="pug">
.color_scheme
  h2.title {{$options.title}}
  hr

  .field.is-horizontal
    .field-label.is-small
      label.label
        | ベースカラー
    .field-body
      .field
        input.input.is-small(type="color" v-model="base_hex_color")
      .field
        //- v-model だと 0000FF を入力したくても 000 の時点で #000000 に展開されてしまうため変更のタイミングを考慮
        input.input.is-small(type="text" :value="direct_hex_color" @keypress.enter="direct_hex_color_set($event.target.value)" @blur="direct_hex_color_set($event.target.value)" placeholder="曖昧入力可")

  .field.is-horizontal
    .field-label.is-small
      label.label
        | 表示
    .field-body
      .field.is-narrow
        .controll
          template(v-for="format_info in format_infos")
            label.radio.is-size-7
              input(type="radio" v-model="format_key" :value="format_info.key")
              | {{format_info.name}}

  .field.is-horizontal
    .field-label.is-small
      label.label
        | モノクロマティック(step)
    .field-body
      .field.is-narrow
        .controll
          input(type="range" v-model.number="monochromatic_step" :min="0.0" :max="0.5" :step="0.001")
          span.range_number
            | {{monochromatic_step}}

  button.button(@click="rundom_set") ランダム

  .is-pulled-right
    router-link(:to="{name: 'color_scheme', query: {color: base_hex_color}}") パーマリンク

  //- .is-size-6 Split-Complement
  //- .color_bar
  //-   .color_box.is-size-7.base(:style="{background: base_color.css()}") {{base_color.name()}}
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
          .color_box.is-size-7(:class="color_info.css_class" :style="{background: color_info.color.css(), color: text_color(color_info.color).css()}" @click.meta="set_this_color(color_info)")
            b-tooltip(:label="[color_info.color.hex(), color_info.color.css(), color_info.color.css('hsl')].join(' ')" multilined type="is-black")
              | {{format_infos[format_key].func(color_info.color)}}

  .content.is-size-7.has-text-grey-light
    ul
      li Command + クリックで色をスポイト

  .section
    .title CSS(sass)
    hr
    template(v-for="preset_info in preset_infos")
      .box.is-size-7
        | // {{preset_info.name}}
        template(v-for="(color_info, i) in preset_info.color_infos")
          div
            | $preset_color{{i + 1}}: {{format_infos[format_key].func(color_info.color)}}
</template>

<script>
import chroma from "chroma-js"

export default {
  name: 'color_scheme',
  title: "配色エディター",
  data() {
    let color = chroma.random().hex()
    if (this.$route.query.color) {
      color = chroma(this.$route.query.color).hex()
    }
    return {
      base_hex_color: color,
      format_key: "hsl",
      monochromatic_step: 0.1,
    }
  },

  created() {
  },

  watch: {
    base_hex_color(color) {
      const element = document.querySelector("nav")
      element.style.backgroundColor = color
    },
  },

  methods: {
    rundom_set() {
      this.base_hex_color = chroma.random().hex()
    },
    set_this_color(color_info) {
      this.base_hex_color = color_info.color.hex()
    },
    hue_add(v) {
      return this.base_color.set("hsl.h", this.base_color.get("hsl.h") + v)
    },
    lighten_add(v) {
      return this.base_color.set("hsl.l", this.base_color.get("hsl.l") + v * this.monochromatic_step)
    },
    saturation_add(v) {
      return this.base_color.set("hsl.s", this.base_color.get("hsl.s") + v * this.monochromatic_step)
    },
    text_color(color) {
      let center = 0.5
      let strong = 3
      let step = 5
      let gap = color.luminance() - center
      if (gap >= 0) {
        return color.darken(strong + gap * step)
      } else {
        return color.brighten(strong - gap * step)
      }
    },
    direct_hex_color_set(v) {
      this.direct_hex_color = v
    },
  },

  computed: {
    direct_hex_color: {
      set(value) {
        if (value !== "") {
          try {
            this.base_hex_color = chroma(value).hex()
          } catch (error) {
            console.warn(`chroma(${JSON.stringify(value)})`, error)
          }
        }
      },
      get() {
        return this.base_color.hex()
      },
    },

    base_color() {
      return chroma(this.base_hex_color)
    },

    format_infos() {
      return [
        { key: "hsl",         name: 'HSL',         func: color => color.css('hsl')    },
        { key: "rgb",         name: 'RGB',         func: color => color.css('rgb')    },
        { key: "hex",         name: 'HEX',         func: color => color.hex()         },
        { key: "temperature", name: '温度',        func: color => color.temperature() },
        { key: "luminance",   name: '明るさ',      func: color => color.luminance()   },
        { key: "name",        name: '色名',        func: color => color.name()        },
        { key: "hsv",         name: 'HSV',         func: color => color.hsv()         },
        { key: "hsi",         name: 'HSI',         func: color => color.hsi()         },
        { key: "gl",          name: 'GL',          func: color => color.gl()          },
      ].reduce((a, e, i) => ({...a, [e.key]: {code: i, ...e}}), {})
    },

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
            { css_class: "wsize50", color: this.hue_add(-30),  },
            { css_class: "wsize50", color: this.hue_add(0),    },
            { css_class: "wsize50", color: this.hue_add(30),   },
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
