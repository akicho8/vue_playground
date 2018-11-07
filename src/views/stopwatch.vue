<template lang="pug">
.stopwatch
  h2.title {{$options.title}}
  hr

  .columns
    .column
      .field.is-horizontal
        .field-label.is-large
          label.label
            | 番号
        .field-body
          .field
            input.input.is-large(type="number" v-model.number="current_code")

      .content
        .is-size-1
          | {{time_format(total_counter)}}

      .buttons
        template(v-if="mode == 'playing'")
          button.button.is-rounded(@click="lap" ref="lap") ラップ
        template(v-else)
          template(v-if="total_counter >= 1")
            button.button.is-rounded(@click="reset") リセット
          template(v-else)
            button.button.is-rounded(disabled) ラップ
        template(v-if="mode == 'standby'")
          button.button.is-rounded.is-primary(@click="start_run") 開始
        template(v-else)
          button.button.is-rounded.is-danger(@click="stop_run") 停止
        template(v-if="rows.length >= 1 || true")
          a.button.is-rounded.is-info(:href="twitter_url" target="_blank") Tweet
    .column
      .box.is-size-7
        template(v-for="row in rows")
          div
            | {{row.current_code}}
            |
            | {{time_format(row.lap_counter)}}
        span.has-text-grey-light
          | {{current_code}}
          |
          | {{time_format(lap_counter)}}
</template>

<script>
import dayjs from "dayjs"
import button46_mp3 from "@/assets/button46.mp3"

export default {
  name: "stopwatch",
  title: "ストップウォッチ",
  data() {
    return {
      current_code: parseInt(localStorage.getItem("stopwatch:current_code") || 1),
      total_counter: parseInt(localStorage.getItem("stopwatch:total_counter") || 0),
      lap_counter: parseInt(localStorage.getItem("stopwatch:lap_counter") || 0),
      rows: JSON.parse(localStorage.getItem("stopwatch:rows") || "[]"),
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
        this.current_code += 1
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
  },

  watch: {
    current_code(v)  { localStorage.setItem("stopwatch:current_code", v)         },
    total_counter(v) { localStorage.setItem("stopwatch:total_counter", v)        },
    lap_counter(v)   { localStorage.setItem("stopwatch:lap_counter", v)          },
    rows(v)          { localStorage.setItem("stopwatch:rows", JSON.stringify(v)) },
  },

  computed: {
    twitter_url() {
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.tweet_body)}`
    },

    row_record() {
      return {
        current_code: this.current_code,
        total_counter: this.total_counter,
        lap_counter: this.lap_counter,
      }
    },

    tweet_body() {
      return _.concat(this.rows, this.row_record).map(e => `${e.current_code} - ${this.time_format(e.lap_counter)}`).join("\n")
    },
  },
}
</script>

<style scoped lang="sass">
  .button
    width: 6rem
</style>
