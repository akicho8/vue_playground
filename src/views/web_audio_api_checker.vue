<template lang="pug">
.web_audio_api_checker
  h2.title {{current_title}}
  hr

  .columns
    .column
      .field.is-horizontal
        .field-label.is-small
          label.label シングルトン
        .field-body
          .field.is-narrow
            .controll
              label.radio.is-size-7
                input(type="radio" v-model="singleton_p" :value="true")
                | 有効
              label.radio.is-size-7
                input(type="radio" v-model="singleton_p" :value="false")
                | 無効

      .field.is-horizontal
        .field-label.is-small
          label.label setTimeout
        .field-body
          .field.has-addons.is-narrow
            .control
              input.input.is-small(type="number" v-model.number="timer_delay" step="0.1")
            .control
              span.is-static.is-size-7
                | 秒

      .field.is-horizontal
        .field-label.is-small
          label.label source共有
        .field-body
          .field.is-narrow
            .controll
              label.radio.is-size-7
                input(type="radio" v-model="source_singleton_p" :value="true")
                | 有効
              label.radio.is-size-7
                input(type="radio" v-model="source_singleton_p" :value="false")
                | 無効

      .buttons
        button.button.is-small(@click="run_play")
          template(v-if="timer_use_p")
            | play({{timer_delay}}秒後)
          template(v-else)
            | play
        button.button.is-small(@click="run_stop") stop
        button.button.is-small(@click="run_suspend") suspend
        button.button.is-small(@click="run_resume") resume
        button.button.is-small(@click="run_close") close
        button.button.is-small(@click="run_disconnect") disconnect
        button.button.is-small(@click="result_rows = []") 結果クリア
        button.button.is-small(@click="run_reset") リセット
    .column
      .content.is-size-7
        ul
          li AudioContext: {{!!window.AudioContext}}
          li webkitAudioContext: {{!!window.webkitAudioContext}}
        ul
          li new AudioContext(): {{web_audio_context ? web_audio_context.constructor.name : ''}}
          li state: {{state}}
          li source: {{source ? source.constructor.name : ''}}

  .content.is-size-7.has-text-grey-light
    ul
      //- li Safari では fetch を使うと動かない。XMLHttpRequest では動く
      li Safari では AudioContext をシングルトンにしなかったら数回目でエラー
      //- li Safari では source = context.createBufferSource() を decodeAudioData のブロック内で行うと鳴らない

  b-table(:data="result_rows" :hoverable="true" :columns="table_columns" narrowed)
</template>

<script>
import pekowave1_wav from "@/assets/pekowave1.wav"
import dayjs from "dayjs"

export default {
  name: 'web_audio_api_checker',
  data() {
    return {
      timer_delay: "",
      singleton_p: true,
      source_singleton_p: false,
      result_rows: [],
      web_audio_context: null,
      source: null,
      state: null,

      EventInfo3: [
        { key: "statechange",        name: "",     description: "", func: (e) => { this.state = e.target.state }}, // or this.web_audio_context.state
        { key: "complete",           name: "",     description: "", },
        { key: "ended",              name: "",     description: "", },
        { key: "message",            name: "",     description: "", },
        { key: "loaded",             name: "",     description: "", },
        { key: "audioprocess",       name: "",     description: "", },
        { key: "nodecreate        ", name: "",     description: "", },
      ].reduce((a, e, i) => ({...a, [e.key]: {code: i, ...e}}), {})
    }
  },

  created() {
  },

  methods: {
    run_resume() {
      this.web_audio_context_set()
      this.web_audio_context.resume().then(() => {})
    },

    run_close() {
      this.web_audio_context_set()
      this.web_audio_context.close().then(() => {})
    },

    run_stop() {
      if (this.source) {
        this.source.stop()
      }
    },

    run_suspend() {
      this.web_audio_context_set()
      this.web_audio_context.suspend().then(() => {})
    },

    run_reset() {
      this.web_audio_context = null
      this.state = null
      this.source = null
    },

    run_disconnect() {
      if (this.source) {
        this.source.disconnect()
      }
    },

    run_play() {
      if (this.timer_use_p) {
        setTimeout(this.run_play_main, this.timer_delay * 1000)
      } else {
        this.run_play_main()
      }
    },

    web_audio_context_set() {
      if (this.singleton_p) {
        if (!this.web_audio_context) {
          this.web_audio_context = this.web_audio_context_create()
        }
      } else {
        this.web_audio_context = this.web_audio_context_create()
      }
    },

    web_audio_context_create() {
      const web_audio_context = new this.AudioContextClass()
      Object.values(this.EventInfo3).forEach(info => {
        web_audio_context.addEventListener(info.key, event => {
          console.log(event)
          const info = this.EventInfo3[event.type]
          this.result_rows.push({
            target: event.target.constructor.name,
            time: dayjs(event.timeStamp).format("mm:ss.SSS"),
            type: event.type,
            name: info.name,
          })
          if (info.func) {
            info.func(event)
          }
        }, false)
      })
      return web_audio_context
    },

    source_create() {
      const source = this.web_audio_context.createBufferSource()
      Object.values(this.EventInfo2).forEach(info => {
        source.addEventListener(info.key, event => {
          console.log(event)
          this.result_rows.push({
            target: event.target.constructor.name,
            time: dayjs(event.timeStamp).format("mm:ss.SSS"),
            type: event.type,
            name: this.EventInfo2[event.type].name,
          })
        }, false)
      })
      return source
    },

    web_audio_source_set() {
      if (this.source_singleton_p) {
        if (!this.source) {
          this.source = this.source_create()
        }
      } else {
        this.source = this.source_create()
      }
    },

    run_play_main() {
      // this.state_update()

      // Safari は Promise 構文に対応していない
      // https://qiita.com/zprodev/items/7fcd8335d7e8e613a01f#%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%AA%E3%83%AD%E3%83%BC%E3%83%89%E3%81%A7%E3%83%A1%E3%83%A2%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%AF
      if (false) {
        fetch(pekowave1_wav)
          .then(response => response.arrayBuffer())
          .then(bin => this.web_audio_context.decodeAudioData(bin))
          .then(buffer => {
            this.source.buffer = buffer
            this.source.connect(this.web_audio_context.destination)
            this.source.start(0)
            // this.web_audio_context.close()
        })
      }

      this.web_audio_context_set()
      this.web_audio_source_set()

      if (true) {
        const req = new XMLHttpRequest()
        req.responseType = "arraybuffer"
        req.onreadystatechange = () => {
          if (req.readyState === 4) {
            if (req.status === 0 || req.status === 200) {
              this.web_audio_context.decodeAudioData(req.response, buffer => {
                // 【重要】Safari ではここで createBufferSource() すると鳴らない
                this.source.buffer = buffer
                // console.log(this.source)
                // this.source.stop()
                this.source.connect(this.web_audio_context.destination)
                console.log(this.source)
                this.source.start()
                console.log(this.source)
              })
            }
          }
        }
        req.open("GET", pekowave1_wav, true)
        req.send("")
      }
    },
  },

  computed: {
    EventInfo2() {
      return [
        { key: "ended",              name: "完了", description: "?", },
      ].reduce((a, e, i) => ({...a, [e.key]: {code: i, ...e}}), {})
    },

    table_columns() {
      return [
        { field: 'time',   label: '時間',   sortable: true, },
        { field: 'type',   label: 'タイプ', sortable: true, },
        { field: 'target', label: 'class',  sortable: true, },
        { field: 'name',   label: '意味',                   },
      ]
    },

    timer_use_p() {
      return typeof this.timer_delay === "number"
    },

    AudioContextClass() {
      return window.AudioContext || window.webkitAudioContext
    },
  },
}
</script>
