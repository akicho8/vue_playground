<template lang="pug">
.overflow_value_ellipsis_test
  h2.title {{current_title}}
  hr

  .columns
    .column
      form_parts
      br
      pre(v-html="pretty_style")

    .column
      .my_box(:style="embed_style")
        | {{text_body}}

</template>

<script>
import dayjs from "dayjs"
import form_parts from "./form_parts.vue"

export default {
  name: "overflow_value_ellipsis_test",
  components: {
    form_parts,
  },
  data() {
    return {
      overflow_value: null,
      text_body: null,
      width_value: null,
      mode_flags: null,
      line_clamp: null,

      form_parts: [
        { key: "overflow_value", name: "text-overflow",      default_value: "ellipsis",             type: "string", params: {                            }, },
        { key: "width_value",    name: "width(rem)",         default_value: 3,                      type: "number", params: { min: 0,  max: 32, step: 1, }, },
        { key: "text_body",      name: "文章",               default_value: "１２３４５６７８９０", type: "text",   params: { rows: 1                    }, },
        {
          name: "",
          key: "mode_flags",
          default_value: ["value1"],
          type: "checkbox",
          elems: [
            { name: "複数行",  value: "value1", tooltip: "webkit系しか対応してないらしい", },
          ],
        },
        { key: "line_clamp",     name: "-webkit-line-clamp", default_value: 2,                      type: "number", params: { min: 0,  max: 4,  step: 1, }, },
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
    embed_style() {
      let str = ""
      str += `width: ${this.width_value}rem;`
      str += `text-overflow: ${this.overflow_value};`
      if (this.mode_flags.includes("value1")) {
        str += `display: -webkit-box;`
        str += `-webkit-box-orient: vertical;`
        str += `-webkit-line-clamp: ${this.line_clamp};`
      } else {
        str += `white-space: nowrap;`
      }
      return str
    },

    pretty_style() {
      let str = ""
      str += `.box\n`
      str += `  overflow: hidden\n`
      str += `  width: ${this.width_value}rem\n`
      str += `  text-overflow: ${this.overflow_value}\n`
      str += `\n`
      if (this.mode_flags.includes("value1")) {
        str += `  display: -webkit-box\n`
        str += `  -webkit-box-orient: vertical\n`
        str += `  -webkit-line-clamp: ${this.line_clamp}`
      } else {
        str += `  white-space: nowrap\n`
      }
      return str
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.overflow_value_ellipsis_test
  .my_box
    border: 1px solid $primary
    overflow: hidden
</style>
