<template lang="pug">
.prism_test
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      b-message(title="HTML" type="" :closable="false")
        textarea.textarea.source_body(v-model="source_body")
      form_parts

    .column
      pre(v-html="formated_body")

</template>

<script>
import form_parts from "./form_parts.vue"
import Prism from 'prismjs'
import "prismjs/components/prism-ruby.js"

// import loadLanguages from 'prismjs/components'
// console.log(loadLanguages)
// loadLanguages(['ruby'])

export default {
  name: "prism_test",
  title: "コードフォーマット (prism)",
  components: {
    form_parts,
  },
  data() {
    return {
      source_body: `class Foo
  attr_accessor :params
  def initialize(params)
    self.params = params
  end
end
`,
      lang_key: null,

      form_parts: [
        {
          key: "lang_key",
          name: "言語",
          default_value: "ruby",
          type: "string",
        },
      ],
    }
  },

  created() {
    this.all_reset()
  },

  mounted() {
  },

  watch: {
    source_body(v) {
    },
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
    formated_body() {
      // https://prismjs.com/
      return Prism.highlight(this.source_body, Prism.languages[this.lang_key])
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"
@import "../../node_modules/prismjs/themes/prism.css"
@import "../../node_modules/prismjs/themes/prism-coy.css"
.prism_test
  .md_body
    height: 50vh
</style>
