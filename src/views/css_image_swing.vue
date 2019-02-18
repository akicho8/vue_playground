<template lang="pug">
.css_image_swing_test
  h2.title {{current_title}}
  hr

  .columns
    .column
      small 普通に揺らすと隙間ができてしまう
      .swing_container.case1
        .swing_v
          .swing_h
            .swing_rotate
              img(:src="sample_images[0]")
    .column
      small 画像を少し拡大する
      .swing_container.case1.case2
        .swing_v
          .swing_h
            .swing_rotate
              img(:src="sample_images[0]")
    .column
      small 最後に子要素をクリップする
      .swing_container.case1.case2.case3
        .swing_v
          .swing_h
            .swing_rotate
              img(:src="sample_images[0]")
</template>

<script>
export default {
  name: "css_image_swing_test",
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

$swing_level: 10px              // 縦横の移動幅
$swing_rotate: 1deg             // Z軸の回転幅
$swing_zoom: 1.15               // 画像の拡大率

img
  display: block // 下の隙間を取るため

.swing_container
  border: 1px solid $primary
  width: 75%

  // 周期をずらすためそれぞれ別のdivに適用する(JavaScriptでやるともっと綺麗にできそう)
  .swing_v
    animation: kf_translate_x 0.7s ease-in-out infinite alternate
  .swing_h
    animation: kf_translate_y 0.8s ease-in-out infinite alternate
  .swing_rotate
    animation: kf_rotate_z 0.9s ease-in-out infinite alternate

  &.case1
    img
      opacity: 0.75

  &.case2
    img
      transform: scale($swing_zoom)

  &.case3
    overflow: hidden

@keyframes kf_translate_x
  0%
    transform: translateX(-$swing_level)
  100%
    transform: translateX($swing_level)

@keyframes kf_translate_y
  0%
    transform: translateY(-$swing_level)
  100%
    transform: translateY($swing_level)

@keyframes kf_rotate_z
  0%
    transform: rotateZ(-$swing_rotate)
  100%
    transform: rotateZ($swing_rotate)
</style>
