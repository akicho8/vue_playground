<template lang="pug">
.stopwatch
  h2.title ストップウォッチ
  hr

  .field.is-horizontal
    .field-label.is-small
      label.label
        | ラップ番号
    .field-body
      .field
        input.input.is-small(type="number" v-model.number="current_code")

  div
    .is-size-1
      | {{time_format(total_counter)}}
  br

  div
    template(v-if="mode == 'playing'")
      button.button.is-rounded(@click="lap" ref="lap") ラップ
    template(v-else)
      template(v-if="total_counter >= 1")
        button.button.is-rounded(@click="reset") リセット
      template(v-else)
        button.button.is-rounded(disabled) ラップ
    | &nbsp;

    template(v-if="mode == 'standby'")
      button.button.is-rounded.is-primary(@click="start_run") 開始
    template(v-else)
      button.button.is-rounded.is-danger(@click="stop_run") 停止

    template(v-if="rows.length >= 1")
      | &nbsp;
      a.button.is-rounded.is-info(:href="twitter_url" target="_blank") Tweet
  br

  .box.is-size-7

    template(v-for="row in rows")
      | {{row.current_code}}
      | -
      | {{time_format(row.lap_counter)}}
      br
    template(v-if="mode == 'playing'")
      span.has-text-grey-light
        | {{current_code}}
        | -
        | {{time_format(lap_counter)}}
      br
</template>

<script>
import dayjs from "dayjs"

export default {
  name: "stopwatch",
  title: "ストップウォッチ",
  data() {
    return {
      current_code: 1,
      total_counter: 0,
      lap_counter: 0,
      mode: "standby",
      rows: [],
      interval_id: null,
    }
  },

  methods: {
    start_run() {
      this.mode = "playing"
      this.clear_interval_safe()
      this.interval_id = setInterval(this.step_next, 1000)

      //- LAP にフォーカスさせる
      //- this.$nextTick(() => this.$refs.lap.focus())
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
      return dayjs().startOf("year").set("seconds", seconds).format("mm:ss")
    },

    lap() {
      if (this.mode === "playing") {
        this.rows.push({
          current_code: this.current_code,
          total_counter: this.total_counter,
          lap_counter: this.lap_counter,
        })
        this.current_code += 1
        this.lap_counter = 0
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

  computed: {
    twitter_url() {
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.tweet_body)}`
    },

    tweet_body() {
      return this.rows.map(e => `${e.current_code} - ${this.time_format(e.lap_counter)}`).join("\n")
    },
  },
}
</script>

<style scoped lang="sass">
  .button
    width: 6rem
</style>
