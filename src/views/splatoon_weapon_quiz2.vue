<template lang="pug">
.splatoon_weapon_quiz2
  .h2.title {{$options.title}}
  hr

  .columns
    .column.is-one-third
      template(v-if="current_data")
        img.weapon_image(:src="require(`@/assets/splatoon_weapon_list/${current_data.key}_xlarge.png`)")
        progress(:value="progress_value")
        | {{current_index}} / {{limit}}

      .contnent
        .is-size-4
          | 正解率:{{rate}}
          br
          | {{time_format(total_counter)}}

      template(v-if="!current_data")
        a.button.is-info.tweet_button(:href="twitter_url" target="_blank") ツイート

      template(v-if="!current_data")
        br
        br
        br
        a.button(@click.prevent="retry") もっかいやる

    .column.is-size-7
      template(v-if="current_data")
        .field.box
          template(v-for="e in weapon_names")
            div
              b-radio(size="is-small" v-model="current_name" :native-value="e")
                span(v-text="e")

</template>

<script>
import splatoon_weapon_list from "./splatoon_weapon_list.js"
import button26_mp3 from "@/assets/button26.mp3"
import button62_mp3 from "@/assets/button62.mp3"
import { Howl, Howler } from 'howler'
import dayjs from "dayjs"

export default {
  name: "splatoon_weapon_quiz2",
  title: "スプラトゥーン2ブキクイズ",
  data() {
    return {
      splatoon_weapon_list,
      limit: 10,
      current_name: null,

      current_index: null,
      o_count: null,
      x_count: null,
      total_counter: null,

      quiz_list: null,
      seikai_list: null,
    }
  },

  created() {
    this.retry()
    this.interval_id = setInterval(this.step_next, 1000)
  },

  methods: {
    step_next() {
      if (this.current_data) {
        // this.total_counter += 1
        this.total_counter += 1
      }
    },

    retry() {
      this.quiz_list = this.quiz_list_generate()
      
      

      this.seikai_list = []
      this.current_index = 0
      this.o_count = 0
      this.x_count = 0
      this.total_counter = 0
    },

    time_format(seconds) {
      return dayjs().startOf("year").set("seconds", seconds).format("m:ss")
    },

    count_add(v) {
      let src = null
      if (v === "o_count") {
        src = button26_mp3
      } else {
        src = button62_mp3
      }
      new Howl({src: src, autoplay: true, volume: 0.5})

      this.$data[v] = this.$data[v] + 1
      this.current_index += 1

      this.$nextTick(() => {
        this.current_name     = null
        this.current_sub_name = null
        this.current_sp_name  = null
      })
    },

    anser_valid() {
      if (this.current_name) {
        if (this.current_data.name === this.current_name) {
          this.count_add("o_count")
        } else {
          this.count_add("x_count")
        }
      }
    },

    quiz_list_generate() {
      return _.take(_.shuffle(this.splatoon_weapon_list), this.limit)
    },
  },

  watch: {
    current_name()     { this.anser_valid() },
    current_sub_name() { this.anser_valid() },
    current_sp_name()  { this.anser_valid() },
  },

  computed: {
    weapon_names() {
      return _.sortBy(_.uniq(this.quiz_list.map(e => e.name)))
    },

    current_data() {
      return this.quiz_list[this.current_index]
    },

    progress_value() {
      return this.current_index / this.quiz_list.length
    },

    rate() {
      const all = this.o_count + this.x_count
      if (all >= 1) {
        return Math.floor(this.o_count / all * 100) + "%"
      } else {
        return "0%"
      }
    },

    twitter_url() {
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.tweet_body)}`
    },

    tweet_body() {
      return `▼${this.$options.title}\n正解率: ${this.rate} (${this.o_count}/${this.limit})\n所要時間: ${this.time_format(this.total_counter)}\n${window.location.href}`
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.splatoon_weapon_quiz2
  .weapon_image
    width: 100%
  progress
    width: 100%
</style>
