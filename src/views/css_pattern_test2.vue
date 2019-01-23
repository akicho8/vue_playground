<template lang="pug">
.css_pattern_test2
  h2.title {{$options.title}}
  hr

  .columns
    .column
      .css_sample1
        .box_wrap
          img(:src="sample_image")
          .box_right
            | ００００００００００１１１１１１１１１１２２２２２２２２２２３３３３３３３３３３

</template>

<script>
export default {
  name: "css_pattern_test2",
  title: "CSS スタイル実験",
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"
@import "../assets/scss/splatoon_preset"

.css_sample1
  .box_wrap
    border: 1px dashed $primary
    display: flex
    align-items: center
    // justify-content: flex-end
    width: 80em

    img
      border: 1px dashed $info
      max-height: 128px
      margin: 0.5rem
    .box_right
      border: 1px dashed $info
      margin-right: 0.5em
      margin-top: 0.5em
      margin-bottom: 0.5em

</style>
