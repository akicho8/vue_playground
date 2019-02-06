<template lang="pug">
.image_switch_test
  h2.title {{current_title}}
  hr

  .columns
    .column.is-one-quarter
      .title.is-5 transition
      //- form_parts
      //- .field
      .buttons
        //- a.button(@click="sample_image_relative_move_to(-1)") ←
        //- a.button(@click="sample_image_relative_move_to(+1)") →
        a.button(@click="sample_image_index_cycle") cycle
    .column
      .example.is-size-7
        | 単純に適用すると2つ表示されてしまう
        .album_box.type1
          transition(name="effect")
            img(:src="sample_image" :key="sample_image")
      .example.is-size-7
        | 対策1.
        code mode="out-in"
        | を指定して、現在の要素が消えてから新しい要素を入れる(いまいち)
        .album_box.type1a
          transition(name="effect" mode="out-in")
            img(:src="sample_image" :key="sample_image")
      .example.is-size-7
        | 対策2.
        code position: absolute
        | で位置を固定する
        .album_box.type2
          transition(name="effect")
            img(:src="sample_image" :key="sample_image")
      .example.is-size-7
        | 対策2にスライドも適用
        .album_box.type3
          transition(name="effect")
            img(:src="sample_image" :key="sample_image")

  .columns
    .column.is-one-quarter
      .title.is-5 transition-group
      .buttons
        a.button(@click="sample_images_shuffle") シャッフル
    .column
      .example.is-size-7
        .album_box.type4
          transition-group(name="my_list" tag="div")
            template(v-for="item in sample_images")
              img(:src="item" :key="item")

</template>

<script>
import form_parts from "./form_parts.vue"
import sample_images_hash from "./sample_images_hash.js"

export default {
  name: "image_switch_test",
  components: {
    form_parts,
  },
  data() {
    return {
      form_parts: [
        { key: "sample_image_index",  name: "インデックス", default_value: 0, type: "range", params: { min: 0, max: Object.values(sample_images_hash).length - 1, step: 1, }, },
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

$image_height: 64px

.example
  margin-top: 1em
  .album_box
    border: 1px dotted $primary
    margin: 0.5em
    img
      border: 1px dotted $info

    &.type1
      img
        height: $image_height
      .effect-enter-active, .effect-leave-active
        transition: opacity .5s
      .effect-enter, .effect-leave-to
        opacity: 0

    &.type1a
      img
        height: $image_height
      .effect-enter-active, .effect-leave-active
        transition: opacity .5s
      .effect-enter, .effect-leave-to
        opacity: 0

    &.type2
      position: relative
      height: $image_height
      img
        position: absolute
        top: 0
        height: 100%
      .effect-enter-active, .effect-leave-active
        transition: opacity 1.0s
      .effect-enter, .effect-leave-to
        opacity: 0

    &.type3
      $transition_x: $image_height        // スライド量
      position: relative
      height: $image_height
      img
        position: absolute
        top: 0
        height: 100%
      .effect-enter-active, .effect-leave-active
        transition: all 1.0s ease
      .effect-enter
        transform: translateX($transition_x)
      .effect-leave-to
        transform: translateX(-$transition_x)
      .effect-enter, .effect-leave-to
        opacity: 0

    &.type4
      img
        height: $image_height
      .my_list-move
        transition: transform 1s
</style>
