<template lang="pug">
.css_vertical_align
  h2.title {{current_title}}
  hr

  .columns
    .column
      form_parts

      template(v-if="NODE_ENV !== 'production'")
        .box
          div {{current_style}}

    .column
      .my_box.my_box1
        span.left_str
          | {{string_var1}}
        span.right_str(:style="current_style")
          | {{valign_real_value}}
      .my_box.my_box2
        span.left_str
          | {{string_var1}}
        span.right_str(style="vertical-align: top") top
        span.right_str(style="vertical-align: text-top") text-top
        span.right_str(style="vertical-align: super") super
        span.right_str(style="vertical-align: middle") middle
        span.right_str(style="vertical-align: baseline") baseline
        span.right_str(style="vertical-align: text-bottom") text-bottom
        span.right_str(style="vertical-align: sub") sub
        span.right_str(style="vertical-align: bottom") bottom

</template>

<script>
import dayjs from "dayjs"
import form_parts from "./form_parts.vue"

export default {
  name: "css_vertical_align",
  components: {
    form_parts,
  },
  data() {
    return {
      result_rows: [],

      string_var1: null,
      string_var2: null,

      valign_value_p: true,
      valign_value: null,

      range_value: 0,

      form_parts: [
        {
          key: "valign_value",
          name: "vertical-align",
          real_name: "valign_value",
          display_key: "valign_value_p",
          default_value: "baseline",
          type: "radio",
          elems: [
            { value: "top",         }, //
            { value: "text-top",    }, // テーブルセルへの指定は無効
            { value: "super",       }, // テーブルセルへの指定は無効
            { value: "middle",      }, //
            { value: "baseline",    }, //
            { value: "%",           }, // その要素のline-heightプロパティの値に対する割合を%で指定
            { value: "px",          }, //
            { value: "text-bottom", }, // テーブルセルへの指定は無効
            { value: "sub",         }, // テーブルセルへの指定は無効
            { value: "bottom",      }, //
          ],
        },
        { key: "range_value",  name: "%やpxの値", default_value:  0,         type: "range",  params: { min: -300,  max: 300, step: 1, }, },
        { key: "string_var1",  name: "右文字",    default_value: "漢",       type: "string", params: {                                }, },
      ],
    }
  },

  created() {
    this.all_reset()
  },

  methods: {
    form_parts_reset() {
      this.form_parts.forEach(e => this[e.key] = e.default_value)
    },

    all_reset() {
      this.form_parts_reset()
    },
  },

  computed: {
    current_style() {
      if (this.valign_value_p) {
        const hash = {}
        hash["verticalAlign"] = this.valign_real_value
        return hash
      }
    },

    valign_real_value() {
      if (this.valign_value === "%" || this.valign_value === "px") {
        return `${this.range_value}${this.valign_value}`
      }
      return this.valign_value
    },

  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.css_vertical_align
  .my_box
    border: 1px dotted $primary

    .left_str, .right_str
      border: 1px dotted $primary

    &.my_box1
      font-size: 6rem
      .left_str
      .right_str
        font-size: 2rem

    &.my_box2
      margin-top: 1rem
      font-size: 3rem
      .left_str
      .right_str
        font-size: 1rem
</style>
