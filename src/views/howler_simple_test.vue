<template lang="pug">
.howler_simple_test
  h2.title {{current_title}}
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
  data() {
    return {
      howl_object: null,
    }
  },
  methods: {
    run_case1() {
      // 全体をシングルトンにしたいとき
      // Howler.unload()

      // 個別にシングルトンにする方法
      // if (this.howl_object) {
      //   this.howl_object.stop()
      // }

      this.howl_object = new Howl({
        src: require("@/assets/music_files/music1.mp3"),
        autoplay: true,
        volume: 0.5,
      })
    },
  },
}
</script>
