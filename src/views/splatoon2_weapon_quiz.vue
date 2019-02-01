<template lang="pug">
.splatoon2_weapon_quiz
  .foo

  template(v-if="scene === 'sm_standby' || scene === 'sm_life_zero' || scene === 'sm_all_clear'")
    .is-5.field.title.has-text-centered.has-text-white
      div スプラトゥーン2
      div ブキクイズ

  .columns
    .column
      template(v-if="scene === 'sm_standby'")
        .field.has-text-centered
          a.button.is-rounded(@click.prevent="start_handle") スタート

      template(v-if="scene === 'sm_running'")
        .has-text-centered
          img.weapon_image(:src="require(`@/assets/splatoon2_weapon_list/${current_data.master.key}_xlarge.png`)")

        .bar_wrap.has-text-centered
          div(:class="count_down_bar_class" ref="count_down_bar" :style="{animationDuration: `${quiz_life_max_seconds}s`}")

        //- progress(:value="progress_value")
        meter(:value="progress_value")

        .box
          template(v-for="e in current_data.kotae_list")
            .radio_element
              b-radio(size="" v-model="current_name" :native-value="e.name")
                span(v-text="e.name")

      template(v-if="scene === 'sm_life_zero' || scene === 'sm_all_clear'")
        .box.has-text-centered
          | 正解数:{{o_count}}
          br
          | 正解率:{{answer_parcentage}}
          br
          | 所要時間: {{time_format(total_counter / accuracy)}}
          br
          a.button.is-info.is-rounded.tweet_button(:href="twitter_url" target="_blank") ツイート

        .has-text-centered.has-text-white
          a.button.is-rounded(@click.prevent="start_handle") リトライ

      template(v-if="NODE_ENV !== 'production'")
        .has-text-white
          ul
            li scene: {{scene}}
            li total_counter: {{total_counter / accuracy}}
            li quiz_list.length: {{quiz_list ? quiz_list.length : ""}}
            li o_count: {{o_count}} {{answer_parcentage}}
            li x_count: {{x_count}}

      .credit.has-text-white.has-text-centered.is-size-7
        | 使用した音素材:
        |
        a.has-text-white(href="https://otologic.jp" target="_blank") OtoLogic
</template>

<script>
import { Howl, Howler } from 'howler'
import dayjs from "dayjs"

import splatoon2_weapon_list from "./splatoon2_weapon_list.js"

import o_mp3 from "@/assets/oto_logic/Quiz-Correct_Answer02-1.mp3"
import x_mp3 from "@/assets/oto_logic/Quiz-Wrong_Buzzer02-1.mp3"
import start_mp3 from "@/assets/oto_logic/Quiz-Question03-1.mp3"
import sm_all_clear_mp3 from "@/assets/oto_logic/Quiz-Results02-1.mp3"
import game_over_mp3 from "@/assets/oto_logic/Onmtp-Ding05-1.mp3"

import bgm_mp3 from "@/assets/oto_logic/Loop02.mp3"
// import bgm_mp3 from "@/assets/oto_logic/Loop03.mp3"
// import bgm_mp3 from "@/assets/oto_logic/dotabatare-su.mp3"

export default {
  name: "splatoon2_weapon_quiz",
  layout: "simple",
  data() {
    return {
      splatoon2_weapon_list,

      quiz_max: null,
      select_element_max: parseInt(this.$route.query.select_element_max || 3),

      current_name: null,

      current_index: null,
      o_count: null,
      x_count: null,
      total_counter: null,

      player_life_max: 100,    // 元の体力
      o_life: 20,              // 正解したときの加算値
      x_life: -5,              // 間違えたときの加算値
      player_life: null,
      player_life_add: -5,     // 1秒間に減らす値

      quiz_life: null,
      quiz_life_max_seconds: 3,
      accuracy: 10,             // setTimeout の精度

      quiz_list: null,

      count_down_bar_class: null,
      scene: "sm_standby",
    }
  },

  created() {
    this.quiz_max = this.$route.query.quiz_max
    if (this.NODE_ENV === 'production') {
      this.quiz_max = this.quiz_max || this.splatoon2_weapon_list.length
    } else {
      this.quiz_max = this.quiz_max || 5
    }
  },

  mounted() {
    this.interval_id = setInterval(this.interval_handle, 1000 / this.accuracy)
  },

  beforeDestroy() {
    clearInterval(this.interval_id)
    // clearInterval(this.interval_id2)
  },

  methods: {
    interval_handle() {
      if (this.scene === "sm_running") {
        this.total_counter += 1

        if (this.player_life > 0) {
          this.player_life += this.player_life_add / this.accuracy
          this.player_life_zero_check()
        }

        if (this.scene === "sm_running")
          if (this.quiz_life > 0) {
            this.quiz_life -= 1
            if (this.quiz_life <= 0) {
              this.count_add("x_count")
            }
          }
      }
    },

    start_handle() {
      this.scene = "sm_running"

      this.quiz_list = this.quiz_list_create()

      this.player_life = this.player_life_max
      this.current_index = 0
      this.o_count = 0
      this.x_count = 0
      this.total_counter = 0
      this.count_down_bar_class = "anime_on"

      Howler.unload()
      new Howl({src: bgm_mp3, autoplay: true, volume: 0.5, loop: true})
      new Howl({src: start_mp3, autoplay: true, volume: 1.0})

      this.next_quiz_setup()
    },

    next_quiz_setup() {
      this.quiz_life = this.quiz_life_max_seconds * this.accuracy

      if (this.$refs.count_down_bar) {

        // this.$refs.count_down_bar.classList.remove("anime_on")
        // this.$nextTick(() => { this.$refs.count_down_bar.classList.add("anime_on") })

        const parent = this.$refs.count_down_bar.parentElement
        parent.removeChild(this.$refs.count_down_bar)
        parent.appendChild(this.$refs.count_down_bar)
      }

      // this.$nextTick(() => {
      //   this.$nextTick(() => { this.count_down_bar_class = "anime_on" })
      // })
    },

    time_format(seconds) {
      return dayjs().startOf("year").set("seconds", seconds).format("m:ss")
    },

    count_add(v) {
      let src = null
      let volume = null
      if (v === "o_count") {
        src = o_mp3
        volume = 1.0
      } else {
        src = x_mp3
        volume = 1.0
      }
      new Howl({src: src, autoplay: true, volume: volume})

      if (v === "o_count") {
        // this.player_life += (this.quiz_life / this.accuracy) * this.o_life
        this.player_life += this.o_life
      } else {
        this.player_life += this.x_life
      }
      this.player_life = this.lodash.clamp(this.player_life, 0, this.player_life_max)

      this.$data[v] = this.$data[v] + 1
      this.current_index += 1

      if (!this.current_data) {
        this.scene = "sm_all_clear"
        Howler.unload()
        new Howl({src: sm_all_clear_mp3, autoplay: true, volume: 1.0})
      }

      if (this.scene === "sm_running") {
        this.$nextTick(() => {
          this.current_name = null
          document.activeElement.blur()
          if (this.scene === "sm_running") {
            this.next_quiz_setup()
          }
        })
        this.player_life_zero_check()
      }
    },

    player_life_zero_check() {
      if (this.player_life <= 0) {
        this.player_life = 0
        this.scene = "sm_life_zero"
        Howler.unload()
        new Howl({src: game_over_mp3, autoplay: true, volume: 1.0})
      }
    },

    anser_valid() {
      if (this.current_name) {
        if (this.current_data.master.name === this.current_name) {
          this.count_add("o_count")
        } else {
          this.count_add("x_count")
        }
      }
    },

    quiz_list_create() {
      const items = _.take(_.shuffle(this.splatoon2_weapon_list), this.quiz_max)
      let rest = null

      const quiz_list = []
      items.forEach(item => {
        const collection = this.splatoon2_weapon_list.filter(e => e !== item)
        const list = collection.filter(e => e.sub_group === item.sub_group)
        let list2 = _.shuffle(list, this.select_element_max - 1)

        rest = (this.select_element_max - 1) - list2.length
        if (rest >= 1) {
          const list = collection.filter(e => e.group === item.group && !list2.includes(e))
          const list3 = _.take(_.shuffle(list), rest)
          list2 = [...list2, ...list3]
        }

        rest = (this.select_element_max - 1) - list2.length
        if (rest >= 1) {
          const list = collection.filter(e => !list2.includes(e))
          const list3 = _.take(_.shuffle(list), rest)
          list2 = [...list2, ...list3]
        }

        list2 = [...list2, ...[item]]

        list2 = _.sortBy(list2, e => e.name)

        quiz_list.push({master: item, kotae_list: list2})
      })
      return quiz_list
    },
  },

  watch: {
    current_name()     { this.anser_valid() },
  },

  computed: {
    current_data() {
      return this.quiz_list[this.current_index]
    },

    progress_value() {
      return this.player_life / this.player_life_max
    },

    answer_parcentage() {
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
      return `#${this.current_title}
正解数: ${this.o_count}
正解率: ${this.answer_parcentage}
所要時間: ${this.time_format(this.total_counter / this.accuracy)}

${window.location.href}`
    },
  },
}
</script>

<style lang="sass">
@import "../assets/scss/variables"
@import "../assets/scss/splatoon_preset"

.splatoon2_weapon_quiz
  .weapon_image
    filter: drop-shadow(0px 0px 4px black)
    border-radius: 10px
    max-height: 40vh

  progress, meter
    margin: 0.5em 0
    width: 100%

  .radio_element
    line-height: 200%

  .bar_wrap
    .anime_off
      animation-name: none

    .anime_on
      animation: bar_anime1 0s linear 0s
      height: 8px
      border: 1px solid white
      background: $sp_color_green_dark
      border-radius: 4px

  @keyframes bar_anime1
    0%
      width: 100%
    100%
      width: 0%

  .title
    color: transparent ! important
    font-size: 2.5em
    -webkit-text-stroke: 1px hsla(0, 50%, 100%, 1.0)

  .box
    text-align: left

  .tweet_button
    margin-top: 1em

  .credit
    position: fixed
    left: 0%
    right: 0%
    bottom: 0%
    height: 5%
    margin: auto

html
  overflow: hidden

.bg-window
  background-color: $sp_color_red_dark
  background-image: repeating-linear-gradient(45deg, $sp_color_red_light, $sp_color_red_light 24px, transparent 0, transparent 48px)
  height: 200%

  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  animation: scroll1 30s linear infinite
  z-index: -1

  @keyframes scroll1
    0%
      transform: translate3d(0, -50%, 0)
    100%
      transform: translate3d(0, 0, 0)
</style>
