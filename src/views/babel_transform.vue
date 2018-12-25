<template lang="pug">
.babel_transform
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      b-message(title="Babelのコード" type="" :closable="false")
        textarea.textarea(v-model.trim="babel_body")

      template(v-if="retval !== null")
        b-message(title="最後の戻値" type="is-success" :closable="false")
          | {{retval}}

      template(v-if="stdout !== null")
        b-message(title="標準出力" type="is-info" :closable="false")
          span(v-html="stdout")

      template(v-if="reterr !== null")
        b-message(title="エラー" type="is-danger" :closable="false")
          | {{reterr}}

    .column
      template(v-if="transformed_error !== null")
        b-message(title="変換失敗" type="is-danger" :closable="false")
          | {{transformed_error}}
          p
            pre
              | {{transformed_error["codeFrame"]}}

      template(v-if="transformed_body !== null")
        b-message(title="ES2015" :closable="false")
          | {{transformed_body}}

</template>

<script>
import form_parts from "./form_parts.vue"

// https://babeljs.io/docs/en/babel-core/
const Babel = require("babel-standalone") // import では動かない ← 違うかも

export default {
  name: "babel_transform",
  title: "新表記のJSをES2015形式に変換",
  components: {
    form_parts,
  },
  data() {
    return {
      babel_body: null,
      reterr: null,
      transformed_body: null,
      transformed_error: null,
      retval: null,
      stdout: null,
    }
  },
  created() {
    console.log(location.hash)
    if (location.hash) {
      let s = location.hash
      s = s.replace(/^#/, "")
      this.babel_body = decodeURIComponent(s)
    } else {
      this.babel_body = `const foo = () => "bar"`
    }

    this.console_log_replace()
  },
  destroyed() {
    this.console_log_restore()
  },
  watch: {
    babel_body() {
      location.hash = this.babel_body

      this.transformed_error = null
      this.transformed_body = null

      try {
        this.transformed_body = Babel.transform(this.babel_body, { presets: ["es2015"] }).code

        //         babel.transform(code, options, function(err, result) {
        //   result; // => { code, map, ast }
        // });

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
        this.reterr = error
      }
    },
  },
  methods: {
    // console.log を window.old_console_log に退避して
    // 元の挙動で入ってきた文字列を奪う
    console_log_replace() {
      if (typeof window.old_console_log === 'undefined') {
        window.old_console_log = console.log
        const vm = this
        console.log = function() {
          window.old_console_log.apply(null, arguments)

          let s = Array.prototype.slice.call(arguments).join(" ")
          s = s.replace(/\n/g, "<br>")
          vm.stdout = (vm.stdout || "") + s
        }
      }
    },
    // 書き換えた console.log を元に戻す
    console_log_restore() {
      if (typeof window.old_console_log !== 'undefined') {
        console.log = window.old_console_log
        delete window.old_console_log
      }
    },
  },
}
</script>

<style scoped lang="sass">
  pre
    font-family: Osaka-mono, "Osaka-等幅", "ＭＳ ゴシック", monospace !important
</style>
