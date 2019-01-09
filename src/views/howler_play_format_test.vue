<template lang="pug">
.howler_play_format_test
  .h2.title {{$options.title}}
  hr

  .box
    .field
      | Howlerで再生
    .buttons
      button.button(@click="run_case1('mp3')") mp3
      button.button(@click="run_case1('ogg')") ogg
      button.button(@click="run_case1('mp4')") mp4
      button.button(@click="run_case1('wav')") wav
      button.button(@click="run_case1('webm')") webm
    label.checkbox2
      input(type="checkbox" v-model="singleton_p")
      | シングルトン

  .box
    .field
      | リソース
    .buttons
      a.button(:href="require(`@/assets/music_files/music1.mp3`)" target="_blank") mp3
      a.button(:href="require(`@/assets/music_files/music1.ogg`)" target="_blank") ogg
      a.button(:href="require(`@/assets/music_files/music1.mp4`)" target="_blank") mp4
      a.button(:href="require(`@/assets/music_files/music1.wav`)" target="_blank") wav
      a.button(:href="require(`@/assets/music_files/music1.webm`)" target="_blank") webm

  .content
    ul
      li
        a(href="https://github.com/goldfire/howler.js" target="_blank") https://github.com/goldfire/howler.js

</template>

<script>
import { Howl, Howler } from 'howler'

export default {
  name: "howler_play_format_test",
  title: "各種フォーマットのサウンド再生テスト (Howler)",
  data() {
    return {
      singleton_p: false,
    }
  },
  methods: {
    run_case1(type) {
      if (this.singleton_p) {
        Howler.unload()
      }
      new Howl({src: require(`@/assets/music_files/music1.${type}`), autoplay: true, volume: 0.5})
    },
  },
}
</script>
