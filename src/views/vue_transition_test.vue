<template lang="pug">
.vue_transition_test
  h2.title {{current_title}}
  hr

  .columns
    .column.is-one-quarter
      .title.is-5 transition
      .buttons
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

  .columns
    .column.is-one-quarter
      .title.is-5 transition-group で add / remove
      .buttons
        a.button(@click="add") Add
        a.button(@click="remove") Remove
    .column
      .example.is-size-7
        .album_box.type5
          transition-group(name="my_list" tag="ul")
            template(v-for="item in items")
              //- img(:src="item" :key="item")
              li(:key="item") {{item}}

  .columns
    .column.is-one-quarter
      .title.is-5 transition-group で add / remove 画像適用
      .buttons
        a.button(@click="sample_images_add") Add
        a.button(@click="sample_images_remove") Remove
    .column
      .example.is-size-7
        .album_box.type6
          transition-group(name="my_list" tag="ul")
            template(v-for="item in sample_images")
              img(:src="item" :key="item")

</template>

<script>
export default {
  name: "vue_transition_test",

  data() {
    return {
      // for type5
      items: [1, 2, 3, 4, 5],
      next_number: 6,
    }
  },

  created() {
    this.img_items = this.sample_images
  },

  methods: {
    // for type5
    random_index() {
      return Math.floor(Math.random() * this.items.length)
    },
    add() {
      this.items.splice(this.random_index(), 0, this.next_number++)
    },
    remove() {
      this.items.splice(this.random_index(), 1)
    },
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

    &.type5
      .my_list-item
        margin-right: 10px
      .my_list-enter-active, .my_list-leave-active
        transition: all 1s
      .my_list-enter, .my_list-leave-to
        opacity: 0
        transform: translateX(30px)

    &.type6
      img
        height: $image_height
      .my_list-item
        margin-right: 10px
      .my_list-enter-active, .my_list-leave-active
        transition: all 1s
      .my_list-enter, .my_list-leave-to
        opacity: 0
        transform: translateX(30px)
</style>
