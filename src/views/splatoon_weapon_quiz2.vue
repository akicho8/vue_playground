<template lang="pug">
.splatoon_weapon_quiz2
  .is-5.field.title.has-text-centered {{$options.title}}

  .columns
    .column.is-one-third
      template(v-if="play_mode === 'standby'")
        .field.has-text-centered
          a.button.is-primary(@click.prevent="game_start") START

      template(v-if="play_mode === 'running'")
        template(v-if="current_data && player_life >= 1")
          img.weapon_image(:src="require(`@/assets/splatoon_weapon_list/${current_data.master.key}_xlarge.png`)")
          div
            div(:class="count_down_bar_class" ref="count_down_bar" :style="{animationDuration: `${quiz_life_max_seconds}s`}")

          //- progress(:value="progress_value2")
          meter(:value="progress_value1")

        .field.has-text-centered
          small
            //- | {{current_index}}/{{quiz_max}}
            | 正解率:{{rate}}
            //- p.has-text-grey-light
            //-   | {{time_format(player_life)}}

          template(v-if="!current_data || player_life === 0")
            .field
              br
              a.button.is-info.tweet_button(:href="twitter_url" target="_blank") ツイート

            .field
              br
              a.button(@click.prevent="quiz_init") もっかいやる

    template(v-if="playing_p")
      .column.is-size-7
        .box
          template(v-for="e in current_data.kotae_list")
            .radio_element
              b-radio(size="is-small" v-model="current_name" :native-value="e.name")
                span(v-text="e.name")

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
  layout: "simple",
  data() {
    return {
      quiz_max: this.$route.query.quiz_max || 20,
      answer_max: parseInt(this.$route.query.answer_max || 3),

      splatoon_weapon_list,
      current_name: null,

      current_index: null,
      o_count: null,
      x_count: null,
      total_counter: null,

      o_life: 5,
      x_life: -10,
      player_life_max: 100,
      player_life: null,

      quiz_life: null,
      quiz_life_max_seconds: 3,
      seido: 10,

      quiz_list: null,
      seikai_list: null,

      count_down_bar_class: null,
      play_mode: "standby",
    }
  },

  created() {
  },

  mounted() {
    this.interval_id1 = setInterval(this.step_next1, 1000 / this.seido)
    // this.interval_id2 = setInterval(this.step_next2, 1000 * 0.1)
  },

  beforeDestroy() {
    clearInterval(this.interval_id1)
    // clearInterval(this.interval_id2)
  },

  methods: {
    game_start() {
      this.quiz_init()
    },

    step_next1() {
      if (this.playing_p) {
        // this.total_counter += 1
        // this.player_life -= 1

        if (this.quiz_life > 0) {
          this.quiz_life -= 1
          // this.player_life -= 0.5
          if (this.quiz_life === 0) {
            this.count_add("x_count")
          }
        }
      }
    },

    step_next2() {
    },

    quiz_init() {
      this.play_mode = "running"

      this.quiz_list = this.quiz_list_generate()

      this.player_life = this.player_life_max
      this.seikai_list = []
      this.current_index = 0
      this.o_count = 0
      this.x_count = 0
      this.total_counter = 0
      this.count_down_bar_class = "anime_on"

      this.next_quiz()
    },

    next_quiz() {
      this.quiz_life = this.quiz_life_max_seconds * this.seido

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
      if (v === "o_count") {
        src = button26_mp3
      } else {
        src = button62_mp3
      }
      // new Howl({src: src, autoplay: true, volume: 0.5})

      this.$data[v] = this.$data[v] + 1
      this.current_index += 1

      this.$nextTick(() => {
        this.current_name = null
        document.activeElement.blur()
      })

      if (v === "o_count") {
        // this.player_life += this.o_life
        this.player_life += (this.quiz_life / this.seido)
      } else {
        this.player_life += this.x_life
      }
      if (this.player_life <= 0) {
        this.player_life = 0
      }

      this.next_quiz()
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

    quiz_list_generate() {
      const items = _.take(_.shuffle(this.splatoon_weapon_list), this.quiz_max)
      let rest = null

      const quiz_list = []
      items.forEach(item => {
        const collection = this.splatoon_weapon_list.filter(e => e !== item)
        const list = collection.filter(e => e.sub_group === item.sub_group)
        let list2 = _.shuffle(list, this.answer_max - 1)

        rest = (this.answer_max - 1) - list2.length
        if (rest >= 1) {
          const list = collection.filter(e => e.group === item.group && !list2.includes(e))
          const list3 = _.take(_.shuffle(list), rest)
          list2 = [...list2, ...list3]
        }

        rest = (this.answer_max - 1) - list2.length
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
    game_over_p() {
      return !this.playing_p
    },

    playing_p() {
      if (this.play_mode === "running") {
        return this.current_data && this.player_life >= 1
      }
    },

    // weapon_names() {
    //   // return _.sortBy(_.uniq(this.quiz_list.map(e => e.name)))
    // },

    current_data() {
      return this.quiz_list[this.current_index]
    },

    progress_value1() {
      return this.player_life / this.player_life_max
    },

    // progress_value2() {
    //   return this.quiz_life / this.quiz_life_max_seconds
    // },

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
      return `#${this.$options.title}\n正解率: ${this.rate} (${this.o_count}/${this.quiz_max})\n所要時間: ${this.time_format(this.total_counter)}\n\n${window.location.href}`
    },
  },
}
</script>

<style lang="sass">
@import "../assets/scss/variables"

html
  background: black

.splatoon_weapon_quiz2
  background: black

  .weapon_image
    width: 100%
  progress, meter
    width: 100%

  .radio_element
    line-height: 180%

  .anime_off
    animation-name: none

  .anime_on
    animation: bar_anime1 3s linear 0s
    height: 6px
    background: $primary

  @keyframes bar_anime1
    0%
      width: 100%
    100%
      width: 0%
</style>
