<template lang="pug">
.markdown_test
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      b-message(title="Markdown形式" type="" :closable="false")
        textarea.textarea.source_body(v-model.trim="source_body")

    .column
      b-message(title="プレビュー" type="is-primary" :closable="false")
        div(v-html="html_body")
      b-message(title="HTML" type="is-primary" :closable="false")
        div(v-text="html_body")

</template>

<script>
import marked from "marked"
import Prism from 'prismjs'

export default {
  name: "markdown_test",
  title: "Markdown変換 (marked)",
  data() {
    return {
      source_body: require("./marked_test.md"),
    }
  },
  computed: {
    html_body() {
      // https://marked.js.org/#/USING_ADVANCED.md#options
      return marked(this.source_body, {
        breaks: true,
        // https://imatomix.com/imatomix/notes/1508495280
        langPrefix: 'language-',
        highlight: function (code, lang) {
          console.log(lang)
          if (lang && lang.match(":")) {
            lang = lang.substring(0, lang.indexOf(":"))
          }
          if (lang in Prism.languages) {
            return Prism.highlight(code, Prism.languages[lang])
          }
          return code
        },
      })
    },
    // html_text() {
    //   // https://prismjs.com/
    //   return Prism.highlight(this.html_body, Prism.languages.markup, 'html')
    // },
  },
}
</script>

<style lang="sass">
@import "../assets/scss/variables"
@import "../../node_modules/prismjs/themes/prism.css"
.markdown_test
  .source_body
    height: 50vh
</style>
