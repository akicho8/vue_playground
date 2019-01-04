<template lang="pug">
.splatoon_weapon_test2
  .h2.title {{$options.title}}
  hr

  .columns
    .column.is-one-third
      template(v-if="current_data")
        img.buki(:src="require(`@/assets/splatoon_weapon_list/${current_data.key}_xlarge.png`)")
        progress(:value="progress_value")
      .contnent
        .is-size-3
          | 正解:{{o_count}}
          | 誤答:{{x_count}}
          |
          v-template(v-if="current_index >= 1")
            | 正解率:{{Math.floor(this.o_count / (this.o_count + this.x_count) * 100)}}%

    .column
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

export default {
  name: "splatoon_weapon_test2",
  title: "スプラトゥーン2ブキクイズ",
  data() {
    return {
      splatoon_weapon_list,
      limit: 10,
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
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.splatoon_weapon_test2
  .buki
    width: 100%
  .button
    width: 4em
  progress
    width: 100%
</style>
