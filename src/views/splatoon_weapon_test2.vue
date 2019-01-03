<template lang="pug">
.splatoon_weapon_test2
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      template(v-if="current_data")
        img.buki(:src="require(`@/assets/splatoon_weapon_list/${current_data.key}_xlarge.png`)")

    .column
      .field
        template(v-for="e in buki_names")
          b-radio(size="is-small" v-model="current_buki_name" :native-value="e")
            span(v-text="e")
      .field
        template(v-for="e in sub_names")
          b-radio(size="is-small" v-model="current_sub_name" :native-value="e")
            span(v-text="e")
      .field
        template(v-for="e in sp_names")
          b-radio(size="is-small" v-model="current_sp_name" :native-value="e")
            span(v-text="e")

      template(v-if="current_data")
        .buttons
          button.button.is-large(@click="count_add('o_count')") ○
          button.button.is-large(@click="count_add('x_count')") ×

      .contnent
        p 正解: {{o_count}}
        p 誤答: {{x_count}}

      template(v-if="current_data")
        br
        .box
          .has-text-grey-lighter.is-size-7
            div {{current_data.name}}
            div {{current_data.sub_name}}
            div {{current_data.sp_name}}

    //- .column
    //-   .box
    //-     b-table(:data="mondai_list" :hoverable="true" :columns="table_columns" narrowed)

</template>

<script>
import splatoon_weapon_list from "./splatoon_weapon_list.js"

export default {
  name: "splatoon_weapon_test2",
  title: "スプラトゥーン2ブキクイズ",
  data() {
    return {
      splatoon_weapon_list,
      limit: 2,
      current_buki_name: null,
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
    },
  },

  computed: {
    table_columns() {
      return [
        { field: 'name',     label: '名前',       sortable: true, },
        { field: 'sub_name', label: 'サブ',       sortable: true, },
        { field: 'sp_name',  label: 'スペシャル', sortable: true, },
      ]
    },

    mondai_list() {
      return _.take(_.shuffle(this.splatoon_weapon_list), this.limit)
    },

    // all_buki_names() {
    //   return _.uniq(this.splatoon_weapon_list.map(e => e.name))
    // },

    buki_names() {
      return _.uniq(this.mondai_list.map(e => e.name))
    },

    sub_names() {
      return _.uniq(this.splatoon_weapon_list.map(e => e.sub_name))
    },

    sp_names() {
      return _.uniq(this.splatoon_weapon_list.map(e => e.sp_name))
    },

    current_data() {
      return this.mondai_list[this.current_index]
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
</style>
