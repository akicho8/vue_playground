<template lang="pug">
.html5_geolocation_api
  h2.title {{current_title}}
  hr

  .field.is-horizontal
    .field-label.is-small
      label.label
        | 精度
    .field-body
      .field.is-narrow
        .controll
          label.radio.is-size-7
            input(type="radio" v-model="enableHighAccuracy" :value="true")
            | 高精度
          label.radio.is-size-7
            input(type="radio" v-model="enableHighAccuracy" :value="false")
            | 普通

  .field.is-horizontal
    .field-label.is-small
      label.label
        | タイムアウト(秒)
    .field-body
      .field
        .control
          input.input.is-small(type="number" v-model.number="timeout")

  .field.is-horizontal
    .field-label.is-small
      label.label
        | キャッシュ(秒)
    .field-body
      .field
        .control
          input.input.is-small(type="number" v-model.number="maximumAge")

  hr

  .field.is-horizontal
    .field-label.is-small
      label.label 指定秒数後に取得
    .field-body
      .field
        .control
          input.input.is-small(type="number" v-model.number="delay")

  .field.is-horizontal
    .field-label.is-small
      label.label 結果
    .field-body
      .field.is-narrow
        .controll
          label.radio.is-size-7
            input(type="radio" v-model="result_detail" :value="true")
            | 詳細
          label.radio.is-size-7
            input(type="radio" v-model="result_detail" :value="false")
            | 普通

  .field.is-horizontal
    .field-label.is-small
      label.label 取得時アラート
    .field-body
      .field.is-narrow
        .controll
          label.radio.is-size-7
            input(type="radio" v-model="alert_mode" :value="true")
            | する
          label.radio.is-size-7
            input(type="radio" v-model="alert_mode" :value="false")
            | しない

  hr

  .buttons
    button.button.is-small(@click="run_once")
      template(v-if="delay === 0")
        | 取得({{run_state}})
      template(v-else)
        | {{delay}}秒後に取得({{run_state}})
    template(v-if="watch_id === null")
      button.button.is-small(@click="start") 追跡開始
    template(v-else)
      button.button.is-small(@click="stop") 追跡停止
    template(v-if="true")
      button.button.is-small(@click="rows = []") 結果クリア

  hr

  small
    ul
      li Geolocation API: {{navigator_info()}}
      li 追跡ID: {{watch_id}}
      li オプション: {{position_options}}
      li ブラウザ: {{user_agent}}

  hr

  small
    div(v-for="e in rows")
      | {{e}}
</template>

<script>
export default {
  name: 'html5_geolocation_api',
  data() {
    return {
      counter: 0,
      rows: [],

      // オプション
      enableHighAccuracy: true,
      timeout: 5,
      maximumAge: 0,

      index: 0,
      limit: 8,                 // 結果表示行数
      watch_id: null,           // 追跡処理のID
      run_state: "待機",        // 取得状態

      delay: 0,
      result_detail: true,
      alert_mode: false,

      error_messages: {
        0: "原因不明" ,
        1: "位置の取得が許可されていない",
        2: "電波状況などで位置が取得不能",
        3: "タイムアウト",
      },
    }
  },

  created() {
    document.addEventListener("visibilitychange", () => {
      this.log_puts(`ブラウザ表示状態: ${document.visibilityState}`)
    }, false)
  },

  methods: {
    navigator_info() {
      return !!navigator.geolocation
    },

    run_once() {
      this.run_state = "実行待ち"
      setTimeout(() => {
        this.run_state = "実行開始"
        navigator.geolocation.getCurrentPosition(this.success_func_for_once, this.error_func_for_once, this.position_options)
      }, this.delay * 1000)
    },

    start() {
      this.log_puts("追跡開始")
      this.watch_id = navigator.geolocation.watchPosition(this.success_func, this.error_func, this.position_options)
    },

    stop() {
      if (this.watch_id !== null) {
        navigator.geolocation.clearWatch(this.watch_id)
        this.watch_id = null
        this.log_puts("追跡停止")
      }
    },

    success_func_for_once(position) {
      this.success_func(position)
      this.run_state = "完了"
    },

    error_func_for_once(error) {
      this.error_func(error)
      this.run_state = "エラー"
    },

    success_func(position) {
      console.table(position)
      let row = {
        index: this.index,
        "時刻": (new Date(position.timestamp)).toLocaleString(),
        "緯度": position.coords.latitude,
        "経度": position.coords.longitude,
        "ブラウザ表示状態": document.visibilityState,
      }
      if (this.result_detail) {
        row = Object.assign({}, row, {
          "誤差(m)": position.coords.accuracy,
          "方位": position.coords.heading,
          "速度": position.coords.speed,
          "高度": position.coords.altitude,
          "高度正確性": position.coords.altitudeAccuracy,
          timestamp: position.timestamp,
        })
      }

      if (this.alert_mode) {
        // alert(row)
        // alert(JSON.stringify(row))
        alert(inspect(row))
      }
      this.rows.push(row)
      this.index += 1
      this.rows = _.takeRight(this.rows, this.limit)
    },

    error_func(error) {
      const row = {
        "時刻": this.currentTime(),
        error_code: error.code,
        error_message: error.message,
        "詳細": this.error_messages[error.code],
      }
      if (this.alert_mode) {
        alert(inspect(row))
      }
      this.rows.push(row)
      this.rows = _.takeRight(this.rows, this.limit)
    },

    currentTime() {
      return (new Date()).toLocaleString()
    },

    log_puts(message) {
      this.rows.push(`${this.currentTime()} ${message}`)
    },
  },

  computed: {
    position_options() {
      return {
        enableHighAccuracy: this.enableHighAccuracy, // true: 高精度
        timeout:            this.timeout * 1000,     // タイムアウトするまでの時間(ms)
        maximumAge:         this.maximumAge * 1000,  // 再取得のときにこの時間内なら前回の値を返す
      }
    },
    user_agent() {
      return window.navigator.userAgent
    },
  },
}
</script>
