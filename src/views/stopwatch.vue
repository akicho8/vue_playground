<template lang="pug">
.stopwatch
  h2.title {{$options.title}}
  hr

  .columns
    .column.is-one-third
      .field
        label.label 開始番号
        .control
          input.input(type="number" v-model.number="current_track")

      .field
        label.label 番号置換
        .control
          textarea.textarea(v-model.trim="track_numbers_str" rows="1" placeholder="スペース区切りで記述すると番号を置き換える")

      .box
        span.is-size-1
          | {{track_num(rows.length, current_track)}}
          | -
          | {{time_format(lap_counter)}}
          |
          span.is-size-4.has-text-grey-light
            | {{time_format(total_counter)}}

        .buttons.toggle_button
          template(v-if="mode == 'standby'")
            button.button.is-primary.is-large(@click="start_run") 開始
          template(v-else)
            button.button.is-danger.is-large(@click="stop_run") 記録中
          template(v-if="mode == 'playing'")
            button.button.is-large(@click="lap" ref="lap") ラップ
          template(v-else)
            template(v-if="total_counter >= 1")
              button.button.is-large(@click="reset") リセット
            template(v-else)
              button.button.is-large(disabled) ラップ

      .buttons
        template(v-if="rows.length >= 1 || true")
          a.button.is-info.is-small(:href="twitter_url" target="_blank") ツイート

    .column
      article.message.is-primary.is-size-6
        .message-body
          template(v-for="(row, i) in rows")
            div
              | {{track_num(i, row.current_track)}}
              | -
              | {{time_format(row.lap_counter)}}
    .column
      article.message.is-primary.is-size-6
        .message-body
          template(v-for="(rows, key) in track_group")
            div.has-text-weight-bold
              | {{human_minute(key, rows)}}
            div
              template(v-for="(row, i) in rows")
                div
                  | {{track_num(i, row.current_track)}}
                  | -
                  | {{time_format(row.lap_counter)}}
            br
    .column
      article.message.is-primary.is-size-6
        .message-body
          template(v-for="(rows, key) in track_group")
            div.has-text-weight-bold
              | {{human_minute(key, rows)}}
            div
              template(v-for="(row, i) in rows")
                | {{track_num(i, row.current_track)}}
                |
            br
</template>

<script>
import dayjs from "dayjs"
import button46_mp3 from "@/assets/button46.mp3"

export default {
  name: "stopwatch",
  title: "ストップウォッチ",
  data() {
    return {
      current_track: parseInt(localStorage.getItem("stopwatch:current_track") || 1),
      total_counter: parseInt(localStorage.getItem("stopwatch:total_counter") || 0),
      lap_counter: parseInt(localStorage.getItem("stopwatch:lap_counter") || 0),
      rows: JSON.parse(localStorage.getItem("stopwatch:rows") || "[]"),
      track_numbers_str: localStorage.getItem("stopwatch:track_numbers_str") || "",
      mode: "standby",
      interval_id: null,
    }
  },

  methods: {
    start_run() {
      this.mode = "playing"
      this.clear_interval_safe()
      this.interval_id = setInterval(this.step_next, 1000)

      // LAP にフォーカスさせる
      this.$nextTick(() => this.$refs.lap.focus())
    },

    stop_run() {
      this.mode = "standby"
      this.clear_interval_safe()
    },

    reset() {
      this.rows = []
      this.total_counter = 0
      this.lap_counter = 0
    },

    time_format(seconds) {
      return dayjs().startOf("year").set("seconds", seconds).format("m:ss")
    },

    lap() {
      if (this.mode === "playing") {
        this.rows.push(this.row_record)
        this.current_track += 1
        this.lap_counter = 0

        const audio = new Audio(button46_mp3)
        audio.play()
      }
    },

    clear_interval_safe() {
      if (this.interval_id) {
        clearInterval(this.interval_id)
        this.interval_id = null
      }
    },

    step_next() {
      this.total_counter += 1
      this.lap_counter += 1
    },

    track_num(i, current_track) {
      if (this.track_numbers.length >= 1) {
        return this.track_numbers[i] || "?"
      } else {
        return current_track
      }
    },

    human_minute(key, rows) {
      let s = null
      if (key === '0') {
        s = `1分未満`
      } else {
        s = `${key}分以上`
      }
      return `${s} - ${rows.length}`
    },
  },

  watch: {
    current_track(v)     { localStorage.setItem("stopwatch:current_track", v)        },
    total_counter(v)     { localStorage.setItem("stopwatch:total_counter", v)        },
    lap_counter(v)       { localStorage.setItem("stopwatch:lap_counter", v)          },
    track_numbers_str(v) { localStorage.setItem("stopwatch:track_numbers_str", v)    },
    rows(v)              { localStorage.setItem("stopwatch:rows", JSON.stringify(v)) },
  },

  computed: {
    twitter_url() {
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.tweet_body)}`
    },

    row_record() {
      return {
        current_track: this.current_track,
        total_counter: this.total_counter,
        lap_counter: this.lap_counter,
      }
    },

    tweet_body() {
      return _.concat(this.rows, this.row_record).map((e, i) => `${this.track_num(i, e.current_track)} - ${this.time_format(e.lap_counter)}`).join("\n")
    },

    track_numbers() {
      if (this.track_numbers_str !== "") {
        return this.track_numbers_str.split(/[\s+,]/)
      } else {
        return []
      }
    },

    track_group() {
      return _.groupBy(this.rows, e => Math.floor(e.lap_counter / 60))
    },
  },
}
</script>

<style scoped lang="sass">
  .toggle_button
    .button
      width: 7rem
</style>
