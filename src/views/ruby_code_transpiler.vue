<template lang="pug">
.ruby_code_transpiler
  h2.title {{current_title}}
  hr

  b-message(title="Rubyのコード" type="" :closable="false")
    textarea.textarea(v-model.trim="rb_body")
    small
      | `` や %x{} で囲むと JS の世界に入れる。例: `location` `console.log`.call("Hello")
  template(v-if="rb_retval !== null")
    b-message(title="最後の戻値" type="is-success" :closable="false")
      | {{rb_retval}}
  template(v-if="stdout !== null")
    b-message(title="標準出力" type="is-info" :closable="false")
      span(v-html="stdout")
  template(v-if="rb_error !== null")
    b-message(title="エラー" type="is-danger" :closable="false")
      | {{rb_error}}
  template(v-if="js_error !== null")
    b-message(title="変換失敗" type="is-danger" :closable="false")
      | {{js_error}}
  template(v-if="js_body !== null")
    b-message(title="JavaScriptに変換した結果" :closable="false")
      | {{js_body}}
</template>

<script>
import form_parts from "./form_parts.vue"
import console_log_methods from "./console_log_methods.js"

export default {
  name: "ruby_code_transpiler",
  mixins: [console_log_methods],
  components: {
    form_parts,
  },

  metaInfo: {
    script: [
      { src: "https://cdn.opalrb.com/opal/current/opal.js",        onload: "Opal.load('opal') ",       defer: true, },
      { src: "https://cdn.opalrb.com/opal/current/opal-parser.js", onload: "Opal.load('opal-parser')", defer: true, },
      // { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js', async: true, defer: true },
    ],
  },

  data() {
    return {
      rb_body: null,
      rb_error: null,
      js_body: null,
      js_error: null,
      rb_retval: null,
    }
  },

  mounted() {
    // ここらへんよくわかってない
    // opal を読み込んだタイミング(onload？)で実行したいけど同期する方法がよくわからない
    // 根本的な解決になってないけど 0.5 秒後に実行している
    setTimeout(() => {
      console.log(location.hash)
      if (location.hash) {
        let s = location.hash
        s = s.replace(/^#/, "")
        this.rb_body = decodeURIComponent(s)
      } else {
        this.rb_body = `p Time.now
p "Hello"
[:c, :b, :c, :c, :a, :b].group_by(&:itself).transform_values(&:size).to_a`
      }
    }, 1000 * 0.5)
  },

  watch: {
    rb_body() {
      location.hash = this.rb_body

      try {
        this.js_body = Opal.compile(this.rb_body)
        this.js_error = null
      } catch (error) {
        this.js_body = null
        this.js_error = error
      }
    },

    js_body() {
      this.rb_retval = null
      this.stdout = null
      this.rb_error = null

      try {
        this.rb_retval = eval(this.js_body)
      } catch (error) {
        this.rb_error = error
      }
    },
  },
}
</script>
