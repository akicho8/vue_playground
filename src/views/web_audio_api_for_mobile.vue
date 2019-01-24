<template lang="pug">
.html_audio_checker
  h2.title {{current_title}}
  hr

  .buttons
    button.button.is-small(@click="waa_play_delay(0.0)") 0.0秒後
    button.button.is-small(@click="waa_play_delay(0.5)") 0.5秒後
    button.button.is-small(@click="waa_play_delay(1.0)") 1.0秒後
    button.button.is-small(@click="waa_play_delay(1.1)") 1.1秒後
    button.button.is-small(@click="waa_play_delay(1.5)") 1.5秒後
    button.button.is-small(@click="waa_play_delay(2.0)") 2.0秒後

  .box
    ul
      li {{waa_touch_event_key}}: {{touchstart}}
      li resumed: {{resumed}}
      li state: {{state}}

  .box
    .content.is-small
      h5 Google Chrome (PC) の特徴
      ul
        li AudioContext のインスタンスを close せずに毎回生成してもおかしくならない
        li クリックに同期せずに鳴らせるのでアンロック的な処理は必要ない
        li 基本 touchstart に反応しないがデベロッパーツール画面では反応する
        li このプログラムでは安全のため touchstart が使えなかったら mousedown を使ってアンロックしている
      br
      h5 iPhone (モバイル版 Safari) への対応
      ul
        li クリックに同期せずに遅延再生するとロックされる
        li そのため touchstart で resume してアンロックする
        li 間違って touchend を使うと、長押しで resume が効かないので注意
      br
      h5 PC 版 Safari への対応
      ul
        li なんと「PC版であっても」クリックに同期せずに遅延再生するとロックされる
        li そのため touchstart で resume してアンロックする
        li しかし touchstart には対応していないので PC 版では mousedown でフックする
        li また AudioContext のインスタンスは close せずに何度も生成するとおかしくなる
</template>

<script>
import pekowave1_wav from "@/assets/pekowave1.wav"

export default {
  name: 'web_audio_api_for_mobile',
  data() {
    return {
      context: null,
      state: null,
      touchstart: null,
      resumed: null,
    }
  },

  created() {
    this.waa_unlock_hook()
  },

  destroyed() {
    if (this.context) {
      this.context.close()
      console.log("this.context.close()")
    }
  },

  methods: {
    waa_context_open() {
      const AudioContext = window.AudioContext || window.webkitAudioContext

      // Safari では context を解放しないと数回目でバグる
      if (!this.context) {
        this.context = new AudioContext()
        console.log("new AudioContext()")
        this.context.addEventListener("statechange", e => { this.state = e.target.state })
      }

      // // またはインスタンスを必ず解放しないとだめ
      // if (this.context) {
      //   this.context.close()
      // }
      // console.log("new AudioContext()")
      // this.context = new AudioContext()
    },

    waa_context_close() {
      if (this.context) {
        this.context.close()
        console.log("this.context.close()")
        this.context = null
      }
    },

    waa_play_delay(delay) {
      setTimeout(this.waa_play, delay * 1000)
    },

    waa_play() {
      this.waa_context_open()

      // fetch(pekowave1_wav)
      //   .then(response => response.arrayBuffer())
      //   .then(bin => context.decodeAudioData(bin))
      //   .then(buffer => {
      //     const source = context.createBufferSource()
      //     source.buffer = buffer
      //     source.connect(context.destination)
      //     source.start(0)
      //   })

      const source = this.context.createBufferSource()
      const req = new XMLHttpRequest()
      req.responseType = "arraybuffer"
      req.onreadystatechange = () => {
        if (req.readyState === 4) {
          if (req.status === 0 || req.status === 200) {
            this.context.decodeAudioData(req.response, buffer => {
              source.buffer = buffer
              source.connect(this.context.destination)
              source.start(0)
            })
          }
        }
      }
      req.open("GET", pekowave1_wav, true)
      req.send("")
    },

    waa_unlock() {
      this.touchstart = true

      this.waa_context_open()
      this.resumed = false
      this.context.resume().then(() => {
        this.resumed = true
        console.log("resumed", this.resumed)
      })
    },

    waa_unlock_hook() {
      document.addEventListener(this.waa_touch_event_key, this.waa_unlock, {once: true})
    },
  },

  computed: {
    waa_touch_event_key() {
      return ("on" + "touchstart") in document ? "touchstart" : "mousedown"
    },
  },
}
</script>
