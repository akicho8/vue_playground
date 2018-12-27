<template lang="pug">
.howler_simple_test
  .h2.title {{$options.title}}
  hr

  .buttons
    button.button.is-small(@click="run_case1") 再生

  .content
    ul
      li
        a(href="https://github.com/goldfire/howler.js" target="_blank") https://github.com/goldfire/howler.js
</template>

<script>
import { Howl, Howler } from 'howler'

export default {
  name: "howler_simple_test",
  title: "Howlerを使ったサウンド再生テスト",
  data() {
    return {
    }
  },
  methods: {
    run_case1() {
      new Howl({
        src: require("@/assets/music_files/music1.mp3"),
        autoplay: true,
        volume: 0.5,
      })
    },
  },
}
</script>
