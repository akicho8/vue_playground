<template lang="pug">
.html_audio_checker
  h2.title {{$options.title}}
  hr

  .columns
    .column
      .field.is-horizontal
        .field-label.is-small
          label.label モード
        .field-body
          .field.is-narrow
            .controll
              label.radio.is-size-7
                input(type="radio" v-model="run_mode" value="html_audio")
                | HTML Audio
              label.radio.is-size-7
                input(type="radio" v-model="run_mode" value="web_audio")
                | WebAudioAPI

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

      template(v-if="run_mode === 'web_audio'")
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

      template(v-if="run_mode === 'html_audio'")
        .field.is-horizontal
          .field-label.is-small
            label.label setTimeoutの外で事前にload
          .field-body
            .field.is-narrow
              .controll
                label.radio.is-size-7
                  input(type="radio" v-model="load_outside_set_timeout_p" :value="true")
                  | する
                label.radio.is-size-7
                  input(type="radio" v-model="load_outside_set_timeout_p" :value="false")
                  | しない
        .field.is-horizontal
          .field-label.is-small
            label.label play()
          .field-body
            .field.is-narrow
              .controll
                label.radio.is-size-7
                  input(type="radio" v-model="play_call_p" :value="true")
                  | 実行する
                label.radio.is-size-7
                  input(type="radio" v-model="play_call_p" :value="false")
                  | 実行しない

      .buttons
        button.button.is-small(@click="run_play")
          template(v-if="timer_use_p")
            | {{timer_delay}}秒後に実行
          template(v-else)
            | 実行
        button.button.is-small(@click="reslt_rows = []") クリア
        template(v-if="run_mode === 'html_audio'")
          button.button.is-small(@click="html_audio_instance_clear") インスタンスクリア
        template(v-if="run_mode === 'web_audio'")
          button.button.is-small(@click="run_suspend") suspend
          button.button.is-small(@click="run_resume") resume
          button.button.is-small(@click="run_close") close
          button.button.is-small(@click="run_null") インスタンスクリア
          button.button.is-small(@click="run_disconnect") source.disconnect()
    .column
      .content.is-size-7
        ul
          li AudioContext: {{!!window.AudioContext}}
          li webkitAudioContext: {{!!window.webkitAudioContext}}
          li Audioインスタンス: {{html_audio_instance ? html_audio_instance.constructor.name : 'null'}}
          li AudioContextインスタンス: {{web_audio_context ? web_audio_context.constructor.name : 'null'}}
          li state: {{state}}
          li source: {{source ? source.constructor.name : 'null'}}

  .content.is-size-7.has-text-grey-light
    ul
      li Safari では fetch を使うと動かない。XMLHttpRequest では動く
      li Safari では AudioContext をシングルトンにしなかったら数回目でエラー
      li Safari では source = context.createBufferSource() を decodeAudioData のブロック内で行うと鳴らない

  b-table(:data="reslt_rows" :hoverable="true" :columns="table_columns" narrowed)
</template>

<script>
import pekowave1_wav from "@/assets/pekowave1.wav"
import dayjs from "dayjs"

export default {
  name: 'html_audio_checker',
  title: "HTML Audio / Web Audio API 挙動確認",
  data() {
    return {
      timer_delay: "",
      singleton_p: true,
      source_singleton_p: false,
      play_call_p: true,
      load_outside_set_timeout_p: false,
      reslt_rows: [],
      html_audio_instance: null,
      run_mode: 'web_audio',
      web_audio_context: null,
      source: null,
      state: null,
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
      // this.web_audio_context.close().then(this.state_update)
    },

    run_suspend() {
      this.web_audio_context_set()
      this.web_audio_context.suspend().then(() => {})
      // this.web_audio_context.suspend().then(this.state_update)
    },

    run_null() {
      if (this.web_audio_context) {
        this.web_audio_context = null
      }
    },

    html_audio_instance_clear() {
      if (this.html_audio_instance) {
        this.html_audio_instance = null
      }
    },

    run_disconnect() {
      if (this.source) {
        this.source.disconnect()
      }
    },

    run_play() {
      if (this.run_mode === 'html_audio') {
        if (this.timer_use_p) {
          if (this.load_outside_set_timeout_p) {
            this.html_audio_source_set()
            this.html_audio_instance.load()
            setTimeout(this.play_only, this.timer_delay * 1000)
          } else {
            setTimeout(this.html_audio_run, this.timer_delay * 1000)
          }
        } else {
          this.html_audio_run()
        }
      } else {
        if (this.timer_use_p) {
          setTimeout(this.web_audio_run, this.timer_delay * 1000)
        } else {
          this.web_audio_run()
        }
      }
    },

    html_audio_source_set() {
      if (this.singleton_p) {
        if (!this.html_audio_instance) {
          this.html_audio_instance = this.html_audio_instance_create()
        }
      } else {
        this.html_audio_instance = this.html_audio_instance_create()
      }
      this.html_audio_instance.src = pekowave1_wav
    },

    html_audio_run() {
      this.html_audio_source_set()
      this.play_only()
    },

    play_only() {
      if (this.play_call_p) {
        this.html_audio_instance.play()
      }
    },

    html_audio_instance_create() {
      const audio = new Audio()
      Object.values(this.EventInfo).forEach(event_info => {
        audio.addEventListener(event_info.key, event => {
          console.log(event)
          this.reslt_rows.push({
            time: dayjs(event.timeStamp).format("mm:ss.SSS"),
            type: event.type,
            name: this.EventInfo[event.type].name,
          })
        }, false)
      })
      return audio
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
      Object.values(this.EventInfo3).forEach(event_info => {
        web_audio_context.addEventListener(event_info.key, event => {
          console.log(event)
          const info = this.EventInfo3[event.type]
          this.reslt_rows.push({
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
      Object.values(this.EventInfo2).forEach(event_info => {
        source.addEventListener(event_info.key, event => {
          console.log(event)
          this.reslt_rows.push({
            time: dayjs(event.timeStamp).format("mm:ss.SSS"),
            type: event.type,
            name: this.EventInfo[event.type].name,
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

    web_audio_run() {
      this.web_audio_context_set()
      this.web_audio_source_set()
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

      if (true) {
        const req = new XMLHttpRequest()
        req.responseType = "arraybuffer"
        req.onreadystatechange = () => {
          if (req.readyState === 4) {
            if (req.status === 0 || req.status === 200) {
              this.web_audio_context.decodeAudioData(req.response, buffer => {
                // Safari ではここで createBufferSource() すると鳴らない
                // const this.source = this.web_audio_context.createBufferSource()
                this.source.buffer = buffer
                this.source.connect(this.web_audio_context.destination)
                this.source.start(0)
                // this.web_audio_context.close()
                // this.state_update()
              })
            }
          }
        }
        req.open("GET", pekowave1_wav, true)
        req.send("")
      }
    },
  },

  watch: {
    // "web_audio_context.state": {
    //   deep: true,
    //   immediate: true,
    //   handler() {
    //     this.state_update()
    //   },
    // },
  },

  computed: {
    EventInfo() {
      return [
        { key: "loadstart",      name: "読込開始",               description: "メディアデータの読込を開始した時", },
        { key: "progress",       name: "読込中",                 description: "メディアデータの読込中の時", },
        { key: "suspend",        name: "読込一時休止",           description: "メディアリソース全体は読み込めていないが、読込を一時休止している時", },
        { key: "abort",          name: "読込中断",               description: "メディアリソースの読込が完了する前に、エラーが原因ではなく読込を中断した時", },
        { key: "error",          name: "読込中にエラー",         description: "メディアデータの読込中にエラーが発生した時", },
        { key: "emptied",        name: "読み込んだがデータが空", description: "読込エラーなどの理由で、読込データが空となった時", },
        { key: "stalled",        name: "予期せぬ理由で読込失敗", description: "メディアデータを読み込もうとしているが、予期しない理由で読み込めない時", },
        { key: "loadedmetadata", name: "メタ情報読込完了",       description: "メタデータの読込が完了して、メディアリソースの長さと大きさが決まってテキストトラックの準備が出来た時", },
        { key: "loadeddata",     name: "再生可能",               description: "メディアデータを現在の再生位置で描画できる状態になった初回の時", },
        { key: "canplay",        name: "再生できるが不安定",     description: "メディアデータの再生を再開することができるが、 いま再生を再開すれば、現在の再生レートで最後まで再生できず、途中でバッファリングのために停止すると推定される時", },
        { key: "canplaythrough", name: "安定して再生できる",     description: "いま再生を再開すれば、現在の再生レートで最後まで再生できて、途中でバッファリングのために停止することはないと推定される時", },
        { key: "playing",        name: "再生再開可",             description: "一時停止した後、または、メディアデータの不足で遅延した後で、再生を再開する準備ができた時", },
        { key: "waiting",        name: "次のデータ待ち",         description: "次のフレームが利用できないため再生停止しているが、やがてそのフレームが利用できるようになるのを待っている時", },
        { key: "seeking",        name: "シーク中",               description: "シーク（再生位置への移動）中の時", },
        { key: "seeked",         name: "シーク完了",             description: "シーク（再生位置への移動）が完了した時", },
        { key: "ended",          name: "完了",                   description: "メディアリソースの末尾に達して、再生が停止した時", },
        { key: "durationchange", name: "長さ更新",               description: "duration属性（メディアリソースの長さ、再生継続時間）が更新された時", },
        { key: "timeupdate",     name: "再生位置更新",           description: "現在の再生位置が変更された時", },
        { key: "play",           name: "再生中",                 description: "再生中の時", },
        { key: "pause",          name: "一時停止",               description: "一時停止中の時", },
        { key: "ratechange",     name: "レート変更",             description: "再生レートが変更された時", },
        { key: "volumechange",   name: "ボリューム変更",         description: "ボリューム、または、ミュートが変更された時", },
      ].reduce((a, e, i) => ({...a, [e.key]: {code: i, ...e}}), {})
    },

    EventInfo2() {
      return [
        { key: "ended",              name: "完了", description: "?", },
      ].reduce((a, e, i) => ({...a, [e.key]: {code: i, ...e}}), {})
    },

    EventInfo3() {
      return [
        { key: "statechange",        name: "",     description: "", func: (e) => { this.state = e.target.state }}, // or this.web_audio_context.state
        { key: "complete",           name: "",     description: "", },
        { key: "ended",              name: "",     description: "", },
        { key: "message",            name: "",     description: "", },
        { key: "loaded",             name: "",     description: "", },
        { key: "audioprocess",       name: "",     description: "", },
        { key: "nodecreate        ", name: "",     description: "", },
      ].reduce((a, e, i) => ({...a, [e.key]: {code: i, ...e}}), {})
    },

    table_columns() {
      return [
        { field: 'time', label: '時間',   sortable: true, numeric: true, },
        { field: 'type', label: 'タイプ', sortable: true,                },
        { field: 'name', label: '意味',                                  },
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
