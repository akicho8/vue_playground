<template lang="pug">
.css_image_sway_test
  h2.title {{current_title}}
  hr

  .columns
    .column
      small 普通に揺らすと隙間ができる
      .sway_container.case1
        .sway_v
          .sway_h
            .sway_rotate
              img(:src="sample_images[0]")
    .column
      small 画像を少し拡大する
      .sway_container.case1.case2
        .sway_v
          .sway_h
            .sway_rotate
              img(:src="sample_images[0]")
    .column
      small 最後に子要素をクリップする
      .sway_container.case1.case2.case3
        .sway_v
          .sway_h
            .sway_rotate
              img(:src="sample_images[0]")
</template>

<script>
export default {
  name: "css_image_sway_test",
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"
@import "../assets/scss/splatoon_preset"

$sway_level: 10px               // 縦横の移動幅
$sway_rotate: 1deg              // Z軸の回転幅
$sway_zoom: 1.25                // 画像の拡大率

img
  display: block // 下の隙間を取るため

.sway_container
  border: 1px solid $primary
  width: 75%

  // 周期をずらすためそれぞれ別のdivに適用する(JavaScriptでやるともっと綺麗にできそう)
  .sway_v
    animation: kf_tx 0.7s ease-in-out infinite alternate
  .sway_h
    animation: kf_ty 0.8s ease-in-out infinite alternate
  .sway_rotate
    animation: kf_rz 0.9s ease-in-out infinite alternate

  &.case1
    img
      opacity: 0.75

  &.case2
    img
      transform: scale($sway_zoom)

  &.case3
    overflow: hidden

@keyframes kf_tx
  0%
    transform: translateX(-$sway_level)
  100%
    transform: translateX($sway_level)

@keyframes kf_ty
  0%
    transform: translateY(-$sway_level)
  100%
    transform: translateY($sway_level)

@keyframes kf_rz
  0%
    transform: rotateZ(-$sway_rotate)
  100%
    transform: rotateZ($sway_rotate)
</style>
