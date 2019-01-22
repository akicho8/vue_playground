<template lang="pug">
.css_pattern_test
  h2.title {{$options.title}}
  hr

  .columns
    .column
      .my_box.box1
        .box_name box1
    .column
      .my_box.box2
        .box_name box2
    .column
      .my_box.box3
        .box_name box3
        .bg_window
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

  .box_name
    color: $white
    padding: 0.5rem

  &.box1
    background-color: $color_red_dark
    background-image: radial-gradient($color_red_light 8px, transparent 8px) // 後ろのパラメータは、ぼかし度のようになる
    background-size: 32px 32px

  &.box2
    background-color: $color_green_dark
    background-image: repeating-linear-gradient(-45deg, $color_green_light, $color_green_light 7.5px, transparent 0, transparent 15px)

  &.box3
    position: relative

    overflow: hidden            // これをとると何がおきているか確認しやすい

    .bg_window
      background-color: $color_green_dark
      background-image: repeating-linear-gradient(-45deg, $color_green_light, $color_green_light 8px, transparent 0, transparent 16px)

      // background-position: center center
      // background-size: 500px 320px

      // width: 100%
      height: 200%

      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      animation: scroll1 3s linear infinite
      z-index: -1
      // transform: translate3d(0, 80px, 0)

      @keyframes scroll1
        0%
          transform: translate3d(0, -50%, 0)
        100%
          transform: translate3d(0, 0, 0)
</style>
