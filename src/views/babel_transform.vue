<template lang="pug">
.babel_transform
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      b-message(title="Babelのコード" type="" :closable="false")
        textarea.textarea(v-model.trim="babel_body")

      template(v-if="transformed_error !== null")
        b-message(title="変換失敗" type="is-danger" :closable="false")
          | {{transformed_error}}
          p
            pre
              | {{transformed_error["codeFrame"]}}

      template(v-if="transformed_body !== null")
        b-message(title="ES2015" :closable="false")
          | {{transformed_body}}

    .column
      template(v-if="retval !== null")
        b-message(title="実行後の最後の戻値" type="is-success" :closable="false")
          | {{retval}}

      template(v-if="stdout !== null")
        b-message(title="標準出力" type="is-info" :closable="false")
          span(v-html="stdout")

      template(v-if="reterr !== null")
        b-message(title="実行エラー" type="is-danger" :closable="false")
          | {{reterr}}

</template>

<script>
import console_log_methods from "./console_log_methods.js"

// https://babeljs.io/docs/en/babel-core/
const Babel = require("babel-standalone") // import では動かない ← 違うかも

export default {
  name: "babel_transform",
  title: "JavaScript コンソール (ES2015変換)",
  mixins: [console_log_methods],
  data() {
    return {
      babel_body: null,
      reterr: null,
      transformed_body: null,
      transformed_error: null,
      retval: null,
    }
  },
  created() {
    console.log(location.hash)
    if (location.hash) {
      let s = location.hash
      s = s.replace(/^#/, "")
      this.babel_body = decodeURIComponent(s)
    } else {
      this.babel_body = `const x = () => 1`
    }
  },
  watch: {
    babel_body() {
      location.hash = this.babel_body

      this.transformed_error = null
      this.transformed_body = null

      try {
        this.transformed_body = Babel.transform(this.babel_body, { presets: ["es2015"] }).code
      } catch (error) {
        console.log(error)
        this.transformed_error = error
      }
    },

    transformed_body() {
      this.retval = null
      this.stdout = null
      this.reterr = null

      try {
        this.retval = eval(this.transformed_body)
      } catch (error) {
        this.reterr = inspect(error)
      }
    },
  },
}
</script>

<style scoped lang="sass">
  pre
    font-family: Osaka-mono, "Osaka-等幅", "ＭＳ ゴシック", monospace !important
    color: inherit
    background: inherit
</style>
