<template lang="pug">
.css_icon_with_message
  h2.title {{current_title}}
  hr

  .columns
    .column
      | まえ
      .case.case1
        img(src="@/assets/logo.png")
        span.handle_name
          | {{string_var1}}
        span.my_message
          | {{string_var2}}
      | うしろ
  .columns
    .column
      | まえ
      span.case.case2
        img(src="@/assets/logo.png")
        span.handle_name
          | {{string_var1}}
        span.my_message
          | {{string_var2}}
      | うしろ

  .columns
    .column
      form_parts

      template(v-if="NODE_ENV !== 'production'")
        .box
          div {{current_style}}

</template>

<script>
import dayjs from "dayjs"
import form_parts from "./form_parts.vue"
import logo from "@/assets/logo.png"
import rails from "@/assets/rails.png"

export default {
  name: "css_icon_with_message",
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
        { key: "string_var1",  name: "右文字",    default_value: "なまえ",   type: "string", params: {                                }, },
        { key: "string_var2",  name: "右文字",    default_value: "０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０１２３４５６７８９",       type: "text",   params: {                                }, },
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

.css_icon_with_message
  .case
    // a
    //   display: inline-flex
    //   align-items: center

    font-size: 2em
    border: 1px dotted blue
    img
      height: 200px
      border: 1px dotted red
    .handle_name
      border: 1px dotted cyan
      // margin-right: 1em
    .my_message
      border: 1px dotted pink
      margin-left: 1em

  .case1
    display: inline-flex
    align-items: center
    img
    .handle_name
      font-weight: bold
      white-space: nowrap
    .my_message
      // line-height: 1.5em
      // white-space: nowrap
      word-break: break-all

  .case2
    img
      vertical-align: baseline
    .handle_name
      font-weight: bold
      white-space: nowrap
    .my_message
      word-break: break-all
</style>
