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
            | {{time_format(total_counter)}}

        .buttons.toggle_button
          template(v-if="mode === 'standby'")
            button.button.is-primary.is-large(@click="start_run") 開始
          template(v-else)
            button.button.is-danger.is-large(@click="stop_run") 記録中
          template(v-if="mode === 'playing'")
            template(v-if="book_mode == 'time_only'")
              button.button.is-primary.is-large(@click="lap_handle('o')" ref="lap_ref") ラップ
            template(v-else)
              button.button.is-info.is-large(@click="lap_handle('o')" ref="o_button_ref") ○
              button.button.is-info.is-large(@click="lap_handle('x')") ×
          template(v-else)
            template(v-if="total_counter >= 1")
              button.button.is-large(@click="reset") リセット

      .field
        label.label 開始番号
        .control
          input.input(type="number" v-model.number="current_track")

      .field
        label.label 番号置換
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

      br
      .buttons
        template(v-if="rows.length >= 1 || true")
          a.button.is-info.is-small(:href="twitter_url" target="_blank") ツイート
        template(v-if="rows.length >= 1")
          a.button.is-small(@click.prevent="revert") 戻す

    .column
      article.message.is-primary.is-size-6
        .message-body
          template(v-if="rows.length >= 1")
            div
              | 計{{rows.length}}問
              | {{quest_range}}
              | ({{time_format(total_seconds)}})

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

    .column
      article.message.is-primary.is-size-6
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
      article.message.is-primary.is-size-6
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
      quest_list_str: localStorage.getItem("stopwatch:quest_list_str") || "",
      book_mode: localStorage.getItem("stopwatch:book_mode") || "time_only",
      mode: "standby",
      interval_id: null,
    }
  },

  created() {
    document.addEventListener("keypress", e => {
      if (e.key === "x") {
        this.lap_handle('x')
      }
    }, false)
  },

  methods: {
    start_run() {
      this.mode = "playing"
      this.clear_interval_safe()
      this.interval_id = setInterval(this.step_next, 1000)
      this.default_focus()
    },

    default_focus() {
      // LAP にフォーカスさせる
      if (this.book_mode === 'time_only') {
        this.$nextTick(() => this.$refs.lap_ref.focus())
      } else {
        this.$nextTick(() => this.$refs.o_button_ref.focus())
      }
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

    lap_handle(o_or_x) {
      if (this.mode === "playing") {
        this.rows.push({...this.new_record, o_or_x: o_or_x})

        this.current_track += 1
        this.lap_counter = 0
        this.default_focus()
        this.sound_play()
      }
    },

    revert() {
      if (this.rows.length >= 1) {
        const record = this.rows.pop()

        this.current_track -= 1
        this.lap_counter = 0
        this.total_counter -= record.lap_counter
        this.default_focus()
        this.sound_play()
      }
    },

    sound_play() {
      const audio = new Audio(button46_mp3)
      audio.play()
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

    quest_name(row) {
      if (this.quest_list.length >= 1) {
        return this.quest_list[row.index] || "?"
      } else {
        return row.track
      }
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
  },

  watch: {
    current_track(v)     { localStorage.setItem("stopwatch:current_track", v)        },
    total_counter(v)     { localStorage.setItem("stopwatch:total_counter", v)        },
    lap_counter(v)       { localStorage.setItem("stopwatch:lap_counter", v)          },
    quest_list_str(v) { localStorage.setItem("stopwatch:quest_list_str", v)    },
    book_mode(v)         { localStorage.setItem("stopwatch:book_mode", v)    },
    rows(v)              { localStorage.setItem("stopwatch:rows", JSON.stringify(v)) },
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

    quest_range() {
      if (this.rows.length >= 1) {
        if (this.quest_list.length === 0) {
          return [this.quest_name(this.rows[0]), this.quest_name(_.last(this.rows))].join("〜")
        }
      }
    },
  },
}
</script>

<style scoped lang="sass">
  .toggle_button
    .button
      width: 7rem
</style>
