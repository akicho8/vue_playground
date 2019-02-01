<template lang="pug">
.splatoon2_weapon_quiz2
  h2.title {{current_title}}
  hr

  .columns
    .column
      template(v-if="current_data")
        img.buki(:src="require(`@/assets/splatoon2_weapon_list/${current_data.key}_xlarge.png`)")

    .column
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
    //-     b-table(:data="splatoon_list" :hoverable="true" :columns="table_columns" narrowed)

</template>

<script>
import splatoon2_weapon_list from "./splatoon2_weapon_list.js"

export default {
  name: "splatoon2_weapon_quiz2",
  data() {
    return {
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

    splatoon_list() {
      return _.shuffle(splatoon2_weapon_list)
    },

    current_data() {
      return this.splatoon_list[this.current_index]
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.splatoon2_weapon_quiz2
  .buki
    width: 100%
  .button
    width: 4em
</style>
