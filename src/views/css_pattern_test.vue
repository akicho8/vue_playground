<template lang="pug">
.css_pattern_test
  h2.title {{$options.title}}
  hr

  .columns
    .column
      .box.my_box.box1
    .column
      .box.my_box.box2

</template>

<script>
export default {
  name: "css_pattern_test",
  title: "CSS 背景パターン",
  data() {
    return {
    }
  },

  created() {
  },

  mounted() {
  },

  beforeDestroy() {
  },

  methods: {
  },

  watch: {
  },

  computed: {
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

$color_red_dark:    hsla(332, 100%, 47%, 1) // 赤濃
$color_red_light:   hsla(331, 100%, 50%, 1) // 赤薄
$color_green_dark:  hsla(120, 100%, 39%, 1) // 緑濃
$color_green_light: hsla(120, 100%, 43%, 1) // 緑薄

// https://copypet.jp/2206/

.my_box
  height: 25vh

  &.box1
    background-color: $color_red_dark
    background-image: radial-gradient($color_red_light 8px, transparent 8px) // 後ろのパラメータは、ぼかし度のようになる
    background-size: 32px 32px

  &.box2
    background-color: $color_green_dark
    background-image: repeating-linear-gradient(-45deg, $color_green_light, $color_green_light 7.5px, transparent 0, transparent 15px)
</style>
