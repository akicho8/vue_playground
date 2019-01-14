<template lang="pug">
.stopwatch
  h2.title {{$options.title}}
  hr

  .columns
    .column.is-one-third
      .box
        span.is-size-1
          | {{quest_name(new_record)}}
          | -
          | {{time_format(lap_counter)}}
          |
          span.is-size-4.has-text-grey-light
            | {{time_format(total_seconds2)}}

        .buttons
          template(v-if="mode === 'standby'")
            button.button.is-primary(@click="start_run") 開始
          template(v-else)
            button.button.is-danger(@click="stop_run") REC

          template(v-if="mode === 'playing'")
            template(v-if="book_mode === 'time_only'")
              button.button.is-primary(@click="lap_handle('o')" ref="lap_ref") ラップ
            template(v-else)
              .ox_buttons
                button.button.is-success.is-outlined.ox_button(@click="lap_handle('o')" ref="o_button_ref") ○
                button.button.is-success.is-outlined.ox_button(@click="lap_handle('x')") ×
          template(v-else)
            template(v-if="total_seconds2 >= 1")
              button.button(@click="reset_handle" key="reset_key") リセット

      template(v-if="quest_list.length === 0 || true")
        .field
          label.label 開始番号
          .control
            input.input(type="number" v-model.number="current_track")

      .field
        //- label.label 番号置換
        .control
          textarea.textarea(v-model.trim="quest_list_str" rows="1" placeholder="スペース区切りで記述すると番号を置き換える")

      .field
        label.label モード
        .controll
          label.radio
            input(type="radio" v-model="book_mode" value="time_only")
            | 基本
          label.radio
            input(type="radio" v-model="book_mode" value="with_ox")
            | 正誤

      .field
        canvas(ref="my_canvas")

      br
      .buttons
        template(v-if="rows.length >= 1")
          a.button.is-small(@click.prevent="revert") 1つ前に戻す
        a.button.is-small(@click.prevent="rap_reset") 直近ラップのみリセット

      .box.content.has-text-grey.is-size-7
        h6 ショートカット
        ul
          li p or k --- 開始/停止
          li o --- 「○」ボタン
          li x --- 「×」ボタン

      br
      .buttons
        template(v-if="rows.length >= 1 || true")
          a.button.is-info.is-small(:href="twitter_url" target="_blank") ツイート

    .column
      article.message.is-primary.is-size-7
        .message-body
          div
            | {{quest_range}}
            | 計{{rows.length}}問
            template(v-if="quest_list.length >= 1")
              | /全{{quest_list.length}}問
            |
            | {{human_rate}}
            | {{ja_time_format(total_seconds)}}
            | {{human_avg}}

          template(v-for="(rows, key) in o_group_by_min")
            br
            div.has-text-weight-bold
              | {{human_minute(key, rows)}}
            div
              template(v-for="row in rows")
                | {{quest_name(row)}}
                |

          template(v-if="'x' in ox_group")
            br
            div.has-text-weight-bold
              | 不正解
            div
              template(v-for="row in ox_group['x']")
                | {{quest_name(row)}}
                |

      template(v-if="quest_list.length >= 1")
        progress(:value="progress_value")

    .column
      article.message.is-primary.is-size-7.compact
        .message-body
          template(v-for="(rows, key) in o_group_by_min")
            div.has-text-weight-bold
              | {{human_minute(key, rows)}}
            div
              template(v-for="row in rows")
                div
                  | {{quest_name(row)}}
                  | -
                  | {{time_format(row.lap_counter)}}
            br
          template(v-if="'x' in ox_group")
            div.has-text-weight-bold
              | 不正解
            div
              template(v-for="row in ox_group['x']")
                div
                  | {{quest_name(row)}}
                  | -
                  | {{time_format(row.lap_counter)}}

    .column
      article.message.is-primary.is-size-7.compact
        .message-body
          template(v-for="(row, i) in rows")
            div
              | {{o_or_x_to_s(row)}}
              | {{quest_name(row)}}
              | -
              | {{time_format(row.lap_counter)}}

  template(v-if="NODE_ENV !== 'production'")
    hr
    | {{new_record}}
    hr
    | {{rows}}
    hr
    | {{ox_group}}
</template>

<script>
import dayjs from "dayjs"
import { Howl, Howler } from 'howler'

import button46_mp3 from "@/assets/button46.mp3"
import button23_mp3 from "@/assets/button23.mp3"
import button62_mp3 from "@/assets/button62.mp3"
import button70_mp3 from "@/assets/button70.mp3"

// import my_lzma from "lzma-native"

import Chart from "chart.js"

export default {
  name: "stopwatch",
  title: "ストップウォッチ",
  data() {
    return {
      current_track: null,
      // total_counter: null,
      lap_counter: null,
      rows: null,
      quest_list_str: null,
      book_mode: null,
      mode: "standby",
      interval_id: null,
    }
  },

  created() {
    let data = null
    if (location.hash) {
      data = decodeURIComponent(location.hash.replace(/^#/, ""))
    } else {
      data = localStorage.getItem("stopwatch") || "{}"
    }
    data = JSON.parse(data)
    this.restore_data(data)

    document.addEventListener("keypress", e => {
      if (e.key === "x") {
        this.lap_handle('x')
      }
      if (e.key === "o") {
        this.lap_handle('o')
      }
      if (e.key === "p" || e.key === "k") {
        this.pause()
      }
    }, false)
  },

  beforeDestroy() {
    this.clear_interval_safe()
  },

  methods: {
    pause() {
      if (this.mode === "standby") {
        this.start_run()
      } else {
        this.stop_run()
      }
    },

    start_run() {
      this.mode = "playing"
      this.clear_interval_safe()
      this.interval_id = setInterval(this.step_next, 1000)
      this.focus_to_button()
    },

    focus_to_button() {
      let key = null
      if (this.book_mode === 'time_only') {
        key = "lap_ref"
      } else {
        key = "o_button_ref"
      }
      this.$nextTick(() => this.$refs[key].focus())
    },

    stop_run() {
      this.mode = "standby"
      this.clear_interval_safe()
    },

    reset_handle() {
      this.rows = []
      // this.total_counter = 0
      this.lap_counter = 0
    },

    time_format(seconds) {
      return dayjs().startOf("year").set("seconds", seconds).format("m:ss")
    },

    ja_time_format(seconds) {
      let format = null
      if ((seconds / 60) >= 60) {
        if (seconds % 60 > 0) {
          seconds += 60
        }
        format = "h時間m分"
      } else {
        format = "m分s秒"
      }
      return dayjs().startOf("year").set("seconds", seconds).format(format)
    },

    lap_handle(o_or_x) {
      if (this.mode === "playing") {
        this.rows.push({...this.new_record, o_or_x: o_or_x})

        this.current_track += 1
        this.lap_counter = 0
        this.focus_to_button()
        this.sound_play(this.sound_src(o_or_x))
      }
    },

    canvas_update() {
      new Chart(this.$refs.my_canvas, {
        type: "line",
        data: {
          labels: this.quest_lables,
          datasets: [
            {
              label: "秒",
              data: this.quest_values,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          elements: {
            line: {
              tension: 0, // ベジェ曲線無効
            },
          },
          animation: {
            duration: 0, // 一般的なアニメーションの時間
          },
        },
      })
    },

    sound_src(o_or_x) {
      let sound_src = null
      if (o_or_x === "o") {
        sound_src = button46_mp3
      } else {
        sound_src = button62_mp3
      }
      return sound_src
    },

    revert() {
      if (this.rows.length >= 1) {
        const record = this.rows.pop()

        this.current_track -= 1
        this.lap_counter = 0
        // this.total_counter -= record.lap_counter
        this.focus_to_button()
        this.sound_play(button46_mp3)
      }
    },

    rap_reset() {
      this.lap_counter = 0
      this.focus_to_button()
    },

    sound_play(src) {
      if (false) {
        const audio = new Audio(src)
        audio.play()
      } else {
        new Howl({src: src, autoplay: true, volume: 1.0})
      }
    },

    clear_interval_safe() {
      if (this.interval_id) {
        clearInterval(this.interval_id)
        this.interval_id = null
      }
    },

    step_next() {
      // this.total_counter += 1
      this.lap_counter += 1
    },

    quest_name(row) {
      if (this.quest_list.length >= 1) {
        return this.quest_list[row.index] || "?"
      }
      return row.track
    },

    human_minute(key) {
      let s = null
      if (key === '0') {
        s = `1分未満`
      } else {
        s = `${key}分以上`
      }
      return `${s}`
      // return `${s} - ${rows.length}`
    },

    o_or_x_to_s(row) {
      let s = null
      if (this.book_mode === 'with_ox') {
        if (row.o_or_x === 'o') {
          s = "○"
        } else {
          s = "×"
        }
      }
      return s
    },

    count_of(key) {
      let count = 0
      if (key in this.ox_group) {
        count = this.ox_group[key].length
      }
      return count
    },

    restore_data(value) {
      this.current_track  = value.current_track || 1
      // this.total_counter  = value.total_counter || 0
      this.lap_counter    = value.lap_counter || 0
      this.rows           = value.rows || []
      this.quest_list_str = value.quest_list_str || ""
      this.book_mode      = value.book_mode || "time_only"
    },

    save_process() {
      const json_str = JSON.stringify(this.save_data)
      // console.log(my_lzma.compress(json_str, 9))

      location.hash = encodeURIComponent(json_str)

      localStorage.setItem("stopwatch", json_str)

      this.canvas_update()
    },
  },

  watch: {
    current_track()     { this.save_process() },
    // total_counter()     { this.save_process() },
    lap_counter()       { this.save_process() },
    quest_list_str()    { this.save_process() },
    book_mode()         { this.save_process() },
    rows()              { this.save_process() },
  },

  mounted() {
    this.canvas_update()
  },

  computed: {
    new_record() {
      return {
        index: this.rows.length,
        track: this.current_track,
        // total_counter: this.total_counter,
        lap_counter: this.lap_counter,
      }
    },

    twitter_url() {
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.tweet_body)}`
    },

    tweet_body() {
      return _.concat(this.rows, this.new_record).map(e => `${this.quest_name(e)} - ${this.time_format(e.lap_counter)}`).join("\n")
    },

    quest_list() {
      if (this.quest_list_str !== "") {
        return this.quest_list_str.split(/[\s+,]/)
      } else {
        return []
      }
    },

    ox_group() {
      return _.groupBy(this.rows, e => e.o_or_x)
    },

    // 正解のみ分グループ
    o_group_by_min() {
      return _.groupBy(this.ox_group["o"], e => Math.floor(e.lap_counter / 60))
    },

    total_seconds() {
      return _.sumBy(this.rows, e => e.lap_counter)
    },

    total_seconds2() {
      return this.total_seconds + this.lap_counter
    },

    quest_lables() {
      return this.rows.map(e => this.quest_name(e))
    },

    quest_values() {
      return this.rows.map(e => e.lap_counter)
    },

    quest_range() {
      if (this.rows.length >= 1) {
        if (this.quest_list.length === 0) {
          return [this.quest_name(this.rows[0]), this.quest_name(_.last(this.rows))].join("〜")
        }
      }
    },

    rate() {
      if (this.rows.length >= 1) {
        return this.count_of("o") / this.rows.length
      }
    },

    human_rate() {
      if (this.rows.length >= 1) {
        const v = Math.floor(this.rate * 100.0)
        return `正解率${v}%`
      }
    },

    avg() {
      if (this.rows.length >= 1) {
        return this.total_seconds / this.rows.length
      }
    },

    human_avg() {
      if (this.rows.length >= 1) {
        let v = null
        if (this.avg < 60) {
          v = Math.floor(this.avg * 100) / 100
          v = `${v}秒`
        } else {
          v = dayjs().startOf("year").set("seconds", this.avg).format("m分s秒")
        }
        return `平均${v}`
      }
    },

    save_data() {
      return {
        current_track:  this.current_track,
        // total_counter:  this.total_counter,
        lap_counter:    this.lap_counter,
        rows:           this.rows,
        quest_list_str: this.quest_list_str,
        book_mode:      this.book_mode,
      }
    },

    progress_value() {
      if (this.quest_list.length >= 1) {
        return this.rows.length / this.quest_list.length
      }
    },
  },
}
</script>

<style scoped lang="sass">
  .ox_button
    width: 6rem
  .compact
    line-height: 100%
  .ox_buttons
    margin-left: 0.7rem
  article
    font-family: Osaka-mono, "Osaka-等幅", "ＭＳ ゴシック", monospace
  progress
    width: 100%
</style>
