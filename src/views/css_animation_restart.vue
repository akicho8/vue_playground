<template lang="pug">
.css_animation_restart
  .h2.title {{$options.title}}
  hr

  button.button(@click="restart_handle") 再実行

  div
    .my_bar(ref="my_bar_ref")

</template>

<script>
export default {
  name: "css_animation_restart",
  title: "CSS アニメーション 再スタート",
  methods: {
    restart_handle() {
      const parent = this.$refs.my_bar_ref.parentElement
      parent.removeChild(this.$refs.my_bar_ref)
      parent.appendChild(this.$refs.my_bar_ref)
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.my_bar
  margin: 1rem 0
  animation: animation1 1s ease-in-out 0s
  height: 1rem
  background: $primary
  border-radius: 0.5rem

@keyframes animation1
  0%
    width: 0%
  100%
    width: 100%
</style>
