<template lang="pug">
.puyosimu
  .h2.title {{$options.title}}
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
        | 右ペイン
      .box
        b-table(:data="result_rows" :hoverable="true" :columns="table_columns" narrowed)

</template>

<script>
import dayjs from "dayjs"
import form_parts from "./form_parts.vue"

export default {
  name: "puyosimu",
  title: "ぷよぷよシミュレーター",
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

    disabled(record) {
      return !(!record.display_key || this.$data[record.display_key])
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

<style scoped lang="sass">
@import "../assets/scss/variables"

.puyosimu
</style>
