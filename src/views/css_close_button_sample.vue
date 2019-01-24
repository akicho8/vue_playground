<template lang="pug">
.css_close_button_sample
  h2.title {{current_title}}
  hr

  .target_box
    img(:src="sample_image")
    a.close_button(@click.prevent="sample_image_shuffle")
      span ×
</template>

<script>
export default {
  name: "css_close_button_sample",
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.target_box
  width: 50vw
  img
    border: 1px solid $primary

  position: relative
  .close_button
    position: absolute
    top: 0%
    right: 0%
    width: 100px
    height: 100px
    margin: 5px

    border: 1px solid $primary
    color: $primary
    cursor: pointer
    border-radius: 50%

    background: hsla(0, 0, 0, 0.5)

    display: flex
    justify-content: center
    align-items: center

    *
      user-select: none
      font-size: 4rem

      // 範囲確認用
      // border: 1px dashed $primary

      // 文字を×と見なしているので微調整が必要(ここがいまいち)
      position: relative
      top: -5%
</style>
