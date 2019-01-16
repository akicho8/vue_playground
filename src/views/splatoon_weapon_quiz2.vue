<template lang="pug">
.splatoon_weapon_quiz2
  .is-5.field.title.has-text-centered {{$options.title}}

  .columns
    .column.is-one-third
      template(v-if="current_data")
        img.weapon_image(:src="require(`@/assets/splatoon_weapon_list/${current_data.master.key}_xlarge.png`)")
        progress(:value="progress_value")

      .field.has-text-centered
        small
          //- | {{current_index}}/{{quiz_max}}
          | 正解率:{{rate}}
          p.has-text-grey-light
            | {{time_format(total_counter)}}

        template(v-if="!current_data")
          .field
            br
            a.button.is-info.tweet_button(:href="twitter_url" target="_blank") ツイート

          .field
            br
            a.button(@click.prevent="retry") もっかいやる

    template(v-if="current_data")
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
      answer_max: parseInt(this.$route.query.answer_max || 5),

      splatoon_weapon_list,
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
        this.current_name = null
        document.activeElement.blur()
      })
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
    // weapon_names() {
    //   // return _.sortBy(_.uniq(this.quiz_list.map(e => e.name)))
    // },

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
      return `#${this.$options.title}\n正解率: ${this.rate} (${this.o_count}/${this.quiz_max})\n所要時間: ${this.time_format(this.total_counter)}\n\n${window.location.href}`
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
  .radio_element
    line-height: 180%
</style>
