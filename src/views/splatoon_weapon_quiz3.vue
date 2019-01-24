<template lang="pug">
.splatoon_weapon_quiz3
  h2.title {{current_title}}
  hr

  .columns
    .column.is-one-third
      template(v-if="current_data")
        img.weapon(:src="require(`@/assets/splatoon_weapon_list/${current_data.key}_xlarge.png`)")
        progress(:value="progress_value")
        | {{current_index}} / {{limit}}

      .contnent
        .is-size-4
          | 正解:{{o_count}}
          |
          | 誤答:{{x_count}}
          |
          | 正解率:{{rate}}

      template(v-if="!current_data")
        .buttons
          a.button.is-info.is-small(:href="twitter_url" target="_blank") ツイート

    .column.is-size-7
      template(v-if="current_data")
        .field.box
          template(v-for="e in weapon_names")
            b-radio(size="is-small" v-model="current_name" :native-value="e")
              span(v-text="e")
        .field.box
          template(v-for="e in sub_names")
            b-radio(size="is-small" v-model="current_sub_name" :native-value="e")
              span(v-text="e")
        .field.box
          template(v-for="e in sp_names")
            b-radio(size="is-small" v-model="current_sp_name" :native-value="e")
              span(v-text="e")

</template>

<script>
import splatoon_weapon_list from "./splatoon_weapon_list.js"
import button26_mp3 from "@/assets/button26.mp3"
import button62_mp3 from "@/assets/button62.mp3"
import { Howl, Howler } from 'howler'

export default {
  name: "splatoon_weapon_quiz3",
  data() {
    return {
      splatoon_weapon_list,
      limit: 2,
      current_name: null,
      current_sub_name: null,
      current_sp_name: null,

      current_index: 0,
      o_count: 0,
      x_count: 0,
    }
  },

  methods: {
    count_add(v) {
      let src = null
      if (v === "o_count") {
        src = button26_mp3
      } else {
        src = button62_mp3
      }
      new Howl({src: src, autoplay: true, volume: 1.0})

      this.$data[v] = this.$data[v] + 1
      this.current_index += 1

      this.$nextTick(() => {
        this.current_name     = null
        this.current_sub_name = null
        this.current_sp_name  = null
      })
    },

    anser_valid() {
      if (this.current_name && this.current_sub_name && this.current_sp_name) {
        if (this.current_data.name === this.current_name &&
            this.current_data.sub_name === this.current_sub_name &&
            this.current_data.sp_name === this.current_sp_name) {
          this.count_add("o_count")
        } else {
          this.count_add("x_count")
        }
      }
    },
  },

  watch: {
    current_name()     { this.anser_valid() },
    current_sub_name() { this.anser_valid() },
    current_sp_name()  { this.anser_valid() },
  },

  computed: {
    quiz_list() {
      return _.take(_.shuffle(this.splatoon_weapon_list), this.limit)
    },

    weapon_names() {
      return _.sortBy(_.uniq(this.quiz_list.map(e => e.name)))
    },

    sub_names() {
      return _.sortBy(_.uniq(this.splatoon_weapon_list.map(e => e.sub_name)))
    },

    sp_names() {
      return _.sortBy(_.uniq(this.splatoon_weapon_list.map(e => e.sp_name)))
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
      return `${this.$options.title} 正解率:${this.rate}`
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.splatoon_weapon_quiz3
  .weapon
    width: 100%
  progress
    width: 100%
</style>
