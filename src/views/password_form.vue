<template lang="pug">
.password_form
  .h2.title {{$options.title}}
  hr

  .title.is-5 登録時
  hr
  .section
    .field.is-horizontal
      .field-label.is-large
        label.label パスワード
      .field-body
        .field
          p.control.is-large
            input.input.is-large(type="text" v-model.trim="password_value" placeholder="")
          p.help
            button.button.is-small(@click="password_set") パスワード生成
            div
              progress(:value="progress_value")

  .title.is-5 入力時 (一定時間たつと隠す)
  hr
  .section
    .field.is-horizontal
      .field-label.is-large
        label.label パスワード
      .field-body
        .field
          p.control.is-large
            template(v-if="password_show")
              input.input.is-large(type="text" v-model.trim="password_value" placeholder="")
            template(v-else)
              input.input.is-large(type="password" v-model.trim="password_value" placeholder="")
</template>

<script>
export default {
  name: "password_form",
  title: "パスワード入力",
  data() {
    return {
      password_value: "",
      password_show: false,
    }
  },

  created() {
    this.all_reset()
  },

  watch: {
    password_value() {
      this.password_show = true
      this.password_update()
    },
  },

  methods: {
    password_set() {
      this.password_value = [this.password_generate(), this.password_generate(), this.password_generate()].join("$")
    },

    password_generate() {
      return Math.floor(Math.random() * 100000000000000000).toString(36)
    },

    password_update: _.debounce(function() {
      this.password_show = false
    }, 1000 * 1),
  },

  computed: {
    progress_value() {
      let s = 0
      s += /\d/.test(this.password_value)     ? 0.3 : 0
      s += /[a-z]/i.test(this.password_value) ? 0.3 : 0
      s += /[!@#$%]/.test(this.password_value)  ? 0.4 : 0
      return s
    },
  },
}
</script>

<style scoped lang="sass">
.password_form
  progress
    width: 50%
</style>
