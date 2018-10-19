<template lang="pug">
div
  .h2.title {{$options.title}}
  hr
  .field.is-horizontal
    .field-label.is-small
      label.label
        | シーケンス
    .field-body
      .field
        input.input.is-small(type="text" v-model.trim="numbers_string")

  button.button.is-rounded.is-primary(@click="vibrate_run") 実行
  button.button.is-rounded(@click="timer_vibrate_run") {{delay}}秒後に実行

  br
  br

  .box
    div navigator.vibrate: {{navigator_vibrate_active_p}}
    div navigator.vibrate({{number_array}})
</template>

<script>
export default {
  name: "navigator_vibrate",
  title: "振動機能チェッカー",

  data() {
    return {
      numbers_string: "200 100 200 100 200 100 200",
      delay: parseInt(this.$route.query.delay || 3),
    }
  },

  created() {
    console.info("navigator.vibrate", this.navigator_vibrate_active_p)
  },

  methods: {
    vibrate_run() {
      navigator.vibrate(this.number_array)
      console.info("vibrate_run")
    },
    timer_vibrate_run() {
      setTimeout(() => this.vibrate_run(), 1000 * this.delay)
    },
  },

  computed: {
    number_array() {
      return _.without(this.numbers_string.split(/[\s,]+/), "").map(e => parseInt(e))
    },

    navigator_vibrate_active_p() {
      return !!navigator.vibrate
    },
  },
}
</script>

<style lang="sass">
</style>
