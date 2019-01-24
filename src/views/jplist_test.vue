<template lang="pug">
.jplist_test
  h2.title {{current_title}}
  hr

  div(
    style="display: none"
    data-jplist-control="hidden-sort"
    data-group="group1"
    data-path=".name"
    data-order="asc"
    data-type="text")

  input(
    data-jplist-control="textbox-filter"
    data-group="group1"
    data-name="my-filter-1"
    data-path=".name"
    type="text"
    value=""
    data-clear-btn-id="name-clear-btn"
    placeholder="Filter by Name")

  button(type="button" id="name-clear-btn") Clear

  div(data-jplist-group="group1")
    template(v-for="(row, i) in splatoon_weapon_list")
      div(data-jplist-item)
        .name {{row.name}}

  div(data-jplist-control="no-results" data-group="group1" data-name="no-results") No Results Found

</template>

<script>
import splatoon_weapon_list from "./splatoon_weapon_list.js"

require("jplist-es6/dist/1.2.0/jplist-es6.min.js")

export default {
  name: "jplist_test",
  data() {
    return {
      splatoon_weapon_list,
    }
  },

  mounted() {
    jplist.init()
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"
// @import "../../node_modules/jplist-es6/dist/1.2.0/jplist.styles.css"
.jplist_test
</style>
