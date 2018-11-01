<template lang="pug">
.ruby_code_transpiler
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      template(v-for="form_part in form_parts")
        form_part(:form_part="form_part" :value.sync="$data[form_part.key]")
      template(v-if="rb_retval !== null")
        b-message(title="実行結果" type="is-success" :closable="false")
          | {{rb_retval}}
      template(v-if="rb_error !== null")
        b-message(title="実行結果(エラー)" type="is-danger" :closable="false")
          | {{rb_error}}
    .column
      template(v-if="js_error !== null")
        b-message(title="トランスパイル時エラー" type="is-danger" :closable="false")
          | {{js_error}}
      template(v-if="js_body !== null")
        b-message(title="トランスパイル後のJavaScript" :closable="false")
          | {{js_body}}
</template>

<script>
import form_part from "./form_part.vue"

export default {
  name: "ruby_code_transpiler",
  title: "Ruby Code Transpiler",
  components: {
    form_part,
  },
  data() {
    return {
      rb_body: "",
      rb_error: null,
      js_body: null,
      js_error: null,

      form_parts: [
        { key: "rb_body", name: "Ruby",  default_value: "[:c, :b, :c, :c, :a, :b].group_by(&:itself).transform_values(&:size).to_a", type: "text",   params: { }, },
      ],
    }
  },

  created() {
    this.form_parts_reset()
  },

  methods: {
    form_parts_reset() {
      this.form_parts.forEach(e => this[e.key] = e.default_value)
    },
  },

  watch: {
    rb_body() {
      this.js_body = null
      this.js_error = null
      try {
        this.js_body = Opal.compile(this.rb_body)
      } catch (error) {
        this.js_error = error
      }
    },
    js_body() {
      this.rb_retval = null
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

<style scoped lang="sass">
  .word_break_all
    word-break: break-all
</style>

