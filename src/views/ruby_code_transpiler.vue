<template lang="pug">
.ruby_code_transpiler
  .h2.title {{$options.title}}
  hr

  b-message(title="Rubyのコード" type="" :closable="false")
    textarea.textarea(v-model.trim="rb_body")
    small
      | `` や %x{} で囲むと JS の世界に入れます。例: `location` `console.log`.call("Hello")
  template(v-if="rb_retval !== null")
    b-message(title="最後の戻値" type="is-success" :closable="false")
      | {{rb_retval}}
  template(v-if="rb_stdout !== null")
    b-message(title="標準出力" type="is-info" :closable="false")
      span(v-html="rb_stdout")
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

export default {
  name: "ruby_code_transpiler",
  title: "Ruby Code Transpiler",
  components: {
    form_parts,
  },
  data() {
    return {
      rb_body: null,
      rb_error: null,
      js_body: null,
      js_error: null,
      rb_retval: null,
      rb_stdout: null,
    }
  },
  created() {
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

    this.console_log_replace()
  },
  destroyed() {
    this.console_log_restore()
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
      this.rb_stdout = null
      this.rb_error = null

      try {
        this.rb_retval = eval(this.js_body)
      } catch (error) {
        this.rb_error = error
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
          vm.rb_stdout = (vm.rb_stdout || "") + s
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
