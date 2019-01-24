<template lang="pug">
.js_console
  h2.title {{current_title}}
  hr

  .columns
    .column
      b-message(title="JavaScriptの素のコード" type="" :closable="false")
        textarea.textarea(v-model.trim="js_body")

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

export default {
  name: "js_console",
  mixins: [console_log_methods],
  data() {
    return {
      js_body: null,
      reterr: null,
      retval: null,
    }
  },
  created() {
    console.log(location.hash)
    if (location.hash) {
      let s = location.hash
      s = s.replace(/^#/, "")
      this.js_body = decodeURIComponent(s)
    } else {
      this.js_body = `const x = () => 1\nx()`
    }
  },
  watch: {
    js_body() {
      location.hash = this.js_body

      this.retval = null
      this.reterr = null
      this.stdout = null

      try {
        this.retval = eval(this.js_body)
      } catch (error) {
        this.reterr = inspect(error)
      }
    },
  },
}
</script>
