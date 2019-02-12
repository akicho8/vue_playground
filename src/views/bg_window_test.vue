<template lang="pug">
.bg_window_test
  .bg_window
  .has-text-white
    | {{current_title}}
</template>

<script>

export default {
  name: "bg_window_test",
}
</script>

<style lang="sass">
@import "../assets/scss/variables"
@import "../assets/scss/splatoon_preset"

html
  // スクロール禁止(PC用)
  overflow: hidden

  // 切り替わり時のちらつき軽減のため
  background: $sp_color_green_light

  .bg_window_test
    border: 4px dotted $primary

    // コンテンツのスクロールを禁止したいとき用
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0

    // ここから重要
    .bg_window
      border: 1px dotted $primary
      background-color: $sp_color_green_dark
      background-image: repeating-linear-gradient(45deg, $sp_color_green_light, $sp_color_green_light 24px, transparent 0, transparent 48px)
      height: 2000vh            // 200vh 以上にする。200% 表記だとiPhoneでメニューから呼び出したとき縦幅が 200vh にならないので注意

      position: fixed           // absolute だとモバイルでスクロールしてしまう
      top: 0
      left: 0
      right: 0
      bottom: 0
      animation: scroll1 40s linear infinite
      z-index: -1

      @keyframes scroll1
        0%
          transform: translate(0, -50%)
        100%
          transform: translate(0, 0)
</style>
