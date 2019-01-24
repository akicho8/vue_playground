<template lang="pug">
.css_balloon_sample
  h2.title {{current_title}}
  hr

  .box.balloon_wrap
    .balloon
      .balloon_body
        | 親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。
      .balloon_arrow
    .balloon_charactor
      img(src="@/assets/animal_chara_mogura_kouji_ana.png")
</template>

<script>
export default {
  name: "css_balloon_sample",
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

$balloon-width: 20em
$balloon-bg-color: $light
$balloon-arrow-size: 12px

.balloon_wrap
  // 縦ならび中央集中
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  .balloon
    max-width: $balloon-width

    .balloon_body
      background: $balloon-bg-color
      border-radius: 24px
      padding: 1.8em
      text-align: left

    .balloon_arrow
      margin: 0 auto
      width: 0
      height: 0
      border-left: $balloon-arrow-size solid transparent
      border-right: $balloon-arrow-size solid transparent
      border-top: $balloon-arrow-size solid $balloon-bg-color

  .balloon_charactor
    margin: 0 auto
    width: 128px
</style>
