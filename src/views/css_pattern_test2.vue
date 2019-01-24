<template lang="pug">
.css_pattern_test2
  h2.title {{current_title}}
  hr

  .columns
    .column
      b 左に画像・右にテキスト
      .css_sample1
        img(:src="sample_image")
        .right_dom
          | ００００００００００１１１１１１１１１１２２２２２２２２２２３３３３３３３３３３
    .column
      b 左に画像・右にテキスト(失敗)
      .css_sample2
        img(:src="sample_image")
        .right_dom
          | ００００００００００１１１１１１１１１１２２２２２２２２２２３３３３３３３３３３

</template>

<script>
export default {
  name: "css_pattern_test2",
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"
@import "../assets/scss/splatoon_preset"

.css_sample1
  border: 1px dashed $primary
  display: flex
  align-items: center
  width: 20em
  img
    border: 1px dashed $info
    max-height: 128px
    margin: 0.5rem
  .right_dom
    border: 1px dashed $info
    margin-right: 0.5em
    margin-top: 0.5em
    margin-bottom: 0.5em

.css_sample2
  border: 1px dashed $primary
  width: 20em
  img
    vertical-align: middle
    border: 1px dashed $info
    max-height: 128px
    margin: 0.5rem
  .right_dom
    display: inline
    border: 1px dashed $info

</style>
