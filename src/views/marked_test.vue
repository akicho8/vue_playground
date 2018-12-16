<template lang="pug">
.markdown_test
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      b-message(title="Markdown形式" type="" :closable="false")
        textarea.textarea.md_body(v-model.trim="md_body")

    .column
      b-message(title="プレビュー" type="is-primary" :closable="false")
        div(v-html="html_body")

</template>

<script>
import marked from "marked"

export default {
  name: "markdown_test",
  title: "Markdown変換 (marked)",
  data() {
    return {
      md_body: require("./marked_test.md"),
    }
  },
  computed: {
    html_body() {
      // https://marked.js.org/#/USING_ADVANCED.md#options
      return marked(this.md_body, {
        breaks: true,
      })
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"
.markdown_test
  .md_body
    height: 50vh
</style>
