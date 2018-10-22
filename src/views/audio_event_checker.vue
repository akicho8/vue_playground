<template lang="pug">
.audio_event_checker
  h2.title {{$options.title}}
  hr

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

  .field.is-horizontal
    .field-label.is-small
      label.label setTimeout()
    .field-body
      .field.has-addons.is-narrow
        .control
          span.is-static.is-size-7
            | の中で
        .control
          input.input.is-small(type="number" v-model.number="timer_delay" step="0.1")
        .control
          span.is-static.is-size-7
            | 秒後に実行
      .field.is-narrow
        .controll
          label.radio.is-size-7
            input(type="radio" v-model="timer_use_p" :value="true")
            | する
          label.radio.is-size-7
            input(type="radio" v-model="timer_use_p" :value="false")
            | しない

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

  .buttons
    button.button.is-small(@click="run_play")
      | 実行
    button.button.is-small(@click="reslt_rows = []") クリア

  b-table(:data="reslt_rows" :hoverable="true" :columns="table_columns" narrowed)
</template>

<script>
import pekowave1_wav from "@/assets/pekowave1.wav"
import dayjs from "dayjs"

export default {
  name: 'audio_event_checker',
  title: "Audioイベントチェッカー",
  data() {
    return {
      timer_delay: 0.5,
      singleton_p: false,
      play_call_p: true,
      timer_use_p: false,
      load_outside_set_timeout_p: false,
      reslt_rows: [],
      instance: null,
    }
  },

  created() {
  },

  methods: {
    run_play() {
      if (this.timer_use_p) {
        if (this.load_outside_set_timeout_p) {
          this.source_set()
          this.instance.load()
          setTimeout(this.play_only, this.timer_delay * 1000)
        } else {
          setTimeout(this.src_set_and_play, this.timer_delay * 1000)
        }
      } else {
        this.src_set_and_play()
      }
    },

    source_set() {
      if (this.singleton_p) {
        if (!this.instance) {
          this.instance = this.instance_create()
        }
      } else {
        this.instance = this.instance_create()
      }
      this.instance.src = pekowave1_wav
    },

    src_set_and_play() {
      this.source_set()
      this.play_only()
    },

    play_only() {
      if (this.play_call_p) {
        this.instance.play()
      }
    },

    instance_create() {
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

    table_columns() {
      return [
        { field: 'time', label: '時間',   sortable: true, numeric: true, },
        { field: 'type', label: 'タイプ', sortable: true,                },
        { field: 'name', label: '意味',                                  },
      ]
    },
  },
}
</script>
