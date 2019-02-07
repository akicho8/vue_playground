<template lang="pug">
.responsive_slide_image
  h2.title {{current_title}}
  hr

  .columns
    .column
      .field
        label.is-size-7
          input(v-model="sub_image_p" type="checkbox")
          | エリア確保用画像

      .buttons
        a.button(@click="sample_image_index_cycle") cycle

      .image_container
        img.sub_image(:src="sample_image" v-if="sub_image_p")
        transition(name="effect" appear)
          img.main_image(:src="sample_image" :key="sample_image")
    .column
      .content
        h3 解説
        ol
          li transition に対応すると画像が2つ登場する
          li そのため位置を固定する必要がある
          li 位置は .image_container を基点にする
          li しかし、そうするとき子要素の伸縮に親が連携してくれない(浮いているため)
          li そこで .image_container のサイズを確保するための画像(.sub_image)を入れる
          li この画像(.sub_image)は浮いていないため伸縮が親に影響する
          li 浮いている画像(.main_image)はサイズ100%なので親のサイズと同じになる
          li ※ .sub_image は実際には visibility: hidden とする

</template>

<script>
export default {
  name: "responsive_slide_image",
  data() {
    return {
      sub_image_p: true,
    }
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

$image_height: 40vh
$transition_x: 50vw        // スライド量

.image_container
  margin: 0px
  padding: 0px

  position: relative
  border: 1px dotted $primary

  // スライドする画像と同じサイズのエリアを確保するため
  .sub_image
    display: block              // img は行の高さを持っているためブロックにしておかないと下に隙間ができる
    // visibility: hidden
    max-height: 40vh
    border: 1px dotted $primary
    opacity: 0.5

  .main_image
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    margin: auto
    border: 4px dotted $primary
    height: 100%
    filter: drop-shadow(0px 0px 10px black)
    border-radius: 10px

  .effect-enter-active, .effect-leave-active
    transition: all 1.0s ease
  .effect-enter
    transform: translateX($transition_x)
  .effect-leave-to
    transform: translateX(-$transition_x)
  .effect-enter, .effect-leave-to
    opacity: 0
</style>
