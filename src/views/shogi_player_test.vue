<template lang="pug">
.shogi_player_test
  h2.title {{current_title}}
  hr

  .columns
    .column
      form_parts

      .field.is-horizontal
        .field-label.is-small
          label.label
        .field-body

          .field.is-narrow
            .control
              label.checkbox
                input(type="checkbox" v-model="real_value_p")
                span.is-size-7
                  | 詳細

      .field.is-horizontal
        .field-label
        .field-body
          .field
            .control
              .buttons
                button.button.is-small(@click="all_reset") リセット
                button.button.is-small(@click="run_user_case1") 送信1
                button.button.is-small(@click="run_user_case2") 送信2

      template(v-if="NODE_ENV !== 'production'")
        .box
          div {{api_params}}

    .column
      .box
        shogi-player(:kifu_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'" :start_turn="0" :slider_show="true" :theme="'real'" :variation="'g'")
      .box
        b-table(:data="result_rows" :hoverable="true" :columns="table_columns" narrowed)

</template>

<script>
import dayjs from "dayjs"
import form_parts from "./form_parts.vue"

import Vue from 'vue'

import Vuex from "vuex"
Vue.use(Vuex)

import "shogi-player/src/store/index.js"

// import Vue from "vue/dist/vue.esm" // esm版はvueのtemplateをパースできる
// window.Vue = Vue
// 
// import Vuex from "vuex"
// Vue.use(Vuex)

// 
// import store from '../store'

import ShogiPlayer from "shogi-player/src/components/ShogiPlayer.vue"
Vue.component("shogi-player", ShogiPlayer)

import PresetInfo from "shogi-player/src/preset_info"
Object.defineProperty(Vue.prototype, "PresetInfo", {value: PresetInfo})

import RunModeInfo from "shogi-player/src/run_mode_info"
Object.defineProperty(Vue.prototype, "RunModeInfo", {value: RunModeInfo})

import ThemeInfo from "shogi-player/src/theme_info"
Object.defineProperty(Vue.prototype, "ThemeInfo", {value: ThemeInfo})

import SizeInfo from "shogi-player/src/size_info"
Object.defineProperty(Vue.prototype, "SizeInfo", {value: SizeInfo})

import VariationInfo from "shogi-player/src/variation_info"
Object.defineProperty(Vue.prototype, "VariationInfo", {value: VariationInfo})

export default {
  name: "shogi_player_test",
  components: {
    form_parts,
  },
  data() {
    return {
      result_rows: [],

      real_value_p: false,

      string_var1_p: true,
      string_var1: null,

      text_var1_p: true,
      text_var1: null,

      radio_var1_p: true,
      radio_var1: null,

      checkbox_var1_p: true,
      checkbox_var1: [],

      range_var1_p: true,
      range_var1: 0,

      select_var1_p: true,
      select_var1: 0,

      form_parts: [
        { key: "string_var1",  name: "文字列1",    default_value: "(string_var1)", real_name: "string_var1", display_key: "string_var1_p",   type: "string", params: {                             }, },
        { key: "text_var1",    name: "テキスト1",  default_value: "(text_var1)",   real_name: "text_var1",   display_key: "text_var1_p",     type: "text",   params: {                             }, },
        { key: "range_var1",   name: "範囲1",      default_value:  50,             real_name: "range_var1",  display_key: "range_var1_p",    type: "range",  params: { min: 0,  max: 100, step: 1, }, },
        {
          key: "radio_var1",
          name: "ラジオボタン1",
          real_name: "radio_var1",
          display_key: "radio_var1_p",
          default_value: "value1",
          type: "radio",
          elems: [
            { name: "選択肢1",  value: "value1", tooltip: "ツールチップ1", },
            { name: "選択肢2",  value: "value2", tooltip: "ツールチップ2", },
          ],
        },
        {
          name: "チェックボックス1",
          key: "checkbox_var1",
          real_name: "checkbox_var1",
          display_key: "checkbox_var1_p",
          default_value: ["value1"],
          type: "checkbox",
          elems: [
            { name: "選択肢1",  value: "value1", tooltip: "ツールチップ1", },
            { name: "選択肢2",  value: "value2", tooltip: "ツールチップ2", },
          ],
        },
        {
          key: "select_var1",
          name: "プルダウン1",
          real_name: "select_var1",
          display_key: "select_var1_p",
          default_value: "value1",
          type: "select",
          elems: [
            { name: "選択肢1",  value: "value1", },
            { name: "選択肢2",  value: "value2", },
          ],
        },
      ],
    }
  },

  created() {
    this.all_reset()
  },

  mounted() {
  },

  watch: {
  },

  methods: {
    run_user_case1() {
      this.result_rows.push({
        time: dayjs().format("YYYY-MM-DD hh:mm:ss.SSS"),
        params: this.api_params,
      })
    },

    run_user_case2() {
      fetch("https://yesno.wtf/api")
        .then(r => r.json())
        .then(v => {
          this.result_rows.push({
            time: dayjs().format("YYYY-MM-DD hh:mm:ss.SSS"),
            params: v,
          })
        })
    },

    form_parts_reset() {
      this.form_parts.forEach(e => this[e.key] = e.default_value)
    },

    result_rows_reset() {
      this.result_rows = []
    },

    all_reset() {
      this.result_rows_reset()
      this.form_parts_reset()
    },
  },

  computed: {
    table_columns() {
      return [
        { field: 'time',   label: '時間',         sortable: true, numeric: true, },
        { field: 'params', label: 'パラメーター', sortable: true,                },
      ]
    },

    api_params() {
      const hash = {}
      if (this.string_var1_p) {
        hash["string_var1"] = this.string_var1
      }
      if (this.text_var1_p) {
        hash["text_var1"] = this.text_var1
      }
      if (this.radio_var1_p) {
        hash["radio_var1"] = this.radio_var1
      }
      if (this.range_var1_p) {
        hash["range_var1"] = this.range_var1
      }
      if (this.checkbox_var1_p) {
        hash["checkbox_var1"] = this.checkbox_var1
      }
      if (this.select_var1_p) {
        hash["select_var1"] = this.select_var1
      }
      return hash
    },
  },
}
</script>

<style lang="sass">
@import "../assets/scss/variables"

$sp_assets_dir: "../../node_modules/shogi-player/src/assets"
@import "../../node_modules/shogi-player/src/components/ShogiPlayer.sass"

.shogi_player_test
</style>
