<template lang="pug">
.html_audio_checker
  h2.title {{$options.title}}
  hr
  .buttons
    button.button.is-small(@click="run_play")
      | 実行
</template>

<script>
import pekowave1_wav from "@/assets/pekowave1.wav"

export default {
  name: 'web_audio_api_checker2',
  title: "Web Audio API 挙動確認",
  data() {
    return {
    }
  },

  created() {
  },

  methods: {
    run_play() {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const context = new AudioContext()
      fetch(pekowave1_wav)
        .then(response => response.arrayBuffer())
        .then(bin => context.decodeAudioData(bin))
        .then(buffer => {
          const source = context.createBufferSource()
          source.buffer = buffer
          source.connect(context.destination)
          source.start(0)
          // context.close()
        })

      // fetch(pekowave1_wav)
      //   .then(response => response.arrayBuffer())
      //   .then(bin => context.decodeAudioData(bin, buffer => {
      //     const source = context.createBufferSource()
      //     source.buffer = buffer
      //     source.connect(context.destination)
      //     source.start(0)
      //   }))

    },
  },

  computed: {
  },
}
</script>
