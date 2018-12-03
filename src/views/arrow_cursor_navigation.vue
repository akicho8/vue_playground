<template lang="pug">
.arrow_cursor_navigation
  .h2.title {{$options.title}}
  hr

  template(v-for="form_part in form_parts")
    form_part(:form_part="form_part" :value.sync="$data[form_part.key]" :value_p.sync="$data[form_part.display_key]")

  .album_box
    img(:src="sample_image")

    .arrow_cursor_navigation_wrap
      .arrow_cursor.arrow_up(@click="relative_move_to(+1)" :class="relative_move_to_p(+1) ? 'active' : 'inactive'")
      .arrow_cursor.arrow_do(@click="relative_move_to(-1)" :class="relative_move_to_p(-1) ? 'active' : 'inactive'")

</template>

<script>
import form_part from "./form_part.vue"

import sample_images_hash from "./sample_images_hash.js"

export default {
  name: "arrow_cursor_navigation",
  title: "三角ナビゲーション",
  components: {
    form_part,
  },
  data() {
    return {
      form_parts: [
        { key: "sample_image_index",  name: "インデックス", default_value: 3, type: "range", params: { min: 0, max: Object.values(sample_images_hash).length - 1, step: 1, }, },
      ],
    }
  },

  created() {
    this.all_reset()
  },

  methods: {
    all_reset() {
      this.form_parts.forEach(e => this[e.key] = e.default_value)
    },
  },

  computed: {
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.album_box
  // height: 240px
  // position: relative
  img
    height: 50vmin

  .arrow_cursor_navigation_wrap
    $arrow_w: 5vmin

    // ボーダーで▲を作っているため均等な三角形にするには横幅の2倍にする
    $arrow_h: $arrow_w * 2 * 1
    $arrow_color: $primary
    $arrow_blank_color: $light
    // ▲▼の隙間
    $arrow_gap: 16px
    // $arrow_transparent: blue
    // $arrow_transparent: #f8f8f8
    $arrow_transparent: transparent

    // border: 1px solid blue

    // 画面左上からの絶対位置
    position: fixed
    // 中央からどれだけ下にずらすか
    top: 0%
    // 右端からどれだけ離すか
    right: 5%
    bottom: 0%

    // 幅は子で決まるので指定してはいけない
    // width: 64px

    // 0 にすることで arrow_gap だけでマージンを調整できる
    height: 0px

    margin: auto

    // 縦並び均等配置
    display: flex
    flex-direction: column
    justify-content: space-around
    align-items: center

    .arrow_cursor
      width: 0
      height: 0
      border-right: $arrow_w solid $arrow_transparent
      border-left: $arrow_w solid $arrow_transparent
      cursor: pointer
      &.inactive
        cursor: auto

      &.arrow_up
        border-top: $arrow_h solid $arrow_transparent
        border-bottom: $arrow_h solid $arrow_color
        &.inactive
          border-bottom: $arrow_h solid $arrow_blank_color
      &.arrow_do
        margin-top: $arrow_gap
        border-top: $arrow_h solid $arrow_color
        border-bottom: $arrow_h solid $arrow_transparent
        &.inactive
          border-top: $arrow_h solid $arrow_blank_color
</style>
