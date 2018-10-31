<template lang="pug">
.ruby_code_transpiler
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      template(v-for="form_part in form_parts")
        form_part(:form_part="form_part" :value.sync="$data[form_part.key]")
      template(v-if="error")
        b-notification.is-danger
          | {{error}}
      .is-size-7.has-text-grey-light
        | 実行結果
      .box
        | {{eval_retval}}
    .column
      .is-size-7.has-text-grey-light
        | JavaScript
      pre.box.word_break_all
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
      js_body: null,
      error: null,

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
    rb_body(v) {
      this.error = null
      this.js_body = null
      try {
        this.js_body = Opal.compile(v)
      } catch (error) {
        this.error = error
      }
    },
  },

  computed: {
    eval_retval() {
      return eval(this.js_body)
    },
  },
}
</script>

<style scoped lang="sass">
  .word_break_all
    word-break: break-all
</style>

