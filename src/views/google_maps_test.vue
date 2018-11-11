<template lang="pug">
.form_template
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      template(v-for="form_part in form_parts")
        form_part(:form_part="form_part" :real_value_p="real_value_p" :value.sync="$data[form_part.key]" :value_p.sync="$data[form_part.display_key]")

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
                button.button.is-small(@click="search_run") 検索

      template(v-if="NODE_ENV !== 'production'")
        .box
          div {{api_params}}

    .column
      .box
        .gmap_div(ref="gmap")
      .box
        b-table(:data="result_rows" :hoverable="true" :columns="table_columns" narrowed)

</template>

<script>
import dayjs from "dayjs"
import form_part from "./form_part.vue"

export default {
  name: 'google_maps_test',
  title: "Google Maps Test",
  components: {
    form_part,
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
        { key: "string_var1",  name: "住所",  default_value: "キャロットタワー", display_key: null, type: "string", params: { }, },
        // { key: "range_var1",   name: "範囲1",      default_value:  50,                real_name: "range_var1",  display_key: "range_var1_p",    type: "range",  params: { min: 0,  max: 100, step: 1, }, },
        // {
        //   key: "radio_var1",
        //   name: "ラジオボタン1",
        //   real_name: "radio_var1",
        //   display_key: "radio_var1_p",
        //   default_value: "value1",
        //   type: "radio",
        //   elems: [
        //     { name: "選択肢1",  value: "value1", tooltip: "ツールチップ1", },
        //     { name: "選択肢2",  value: "value2", tooltip: "ツールチップ2", },
        //   ],
        // },
        // {
        //   name: "チェックボックス1",
        //   key: "checkbox_var1",
        //   real_name: "checkbox_var1",
        //   display_key: "checkbox_var1_p",
        //   default_value: ["value1"],
        //   type: "checkbox",
        //   elems: [
        //     { name: "選択肢1",  value: "value1", tooltip: "ツールチップ1", },
        //     { name: "選択肢2",  value: "value2", tooltip: "ツールチップ2", },
        //   ],
        // },
        // {
        //   key: "select_var1",
        //   name: "プルダウン1",
        //   real_name: "select_var1",
        //   display_key: "select_var1_p",
        //   default_value: "value1",
        //   type: "select",
        //   elems: [
        //     { name: "選択肢1",  value: "value1", },
        //     { name: "選択肢2",  value: "value2", },
        //   ],
        // },
      ],
    }
  },

  created() {
    this.all_reset()
  },

  mounted() {
    this.search_run()
  },

  watch: {
  },

  methods: {
    search_run() {
      this.geocoder.geocode({"address": this.string_var1}, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          this.result_rows.push({
            time: dayjs().format("YYYY-MM-DD hh:mm:ss.SSS"),
            params: results,
          })

          const location = results[0].geometry.location
          this.gmap.setCenter(location)

          this.maker.setPosition(location)
          this.maker.setAnimation(google.maps.Animation.BOUNCE)
        }
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
    geocoder() {
      return new google.maps.Geocoder()
    },

    gmap() {
      return new google.maps.Map(this.$refs.gmap, {zoom: 15})
    },

    maker() {
      return new google.maps.Marker({map: this.gmap})
    },

    table_columns() {
      return [
        { field: 'time',   label: '時間',         sortable: true, numeric: true, },
        { field: 'params', label: 'パラメーター', sortable: true,                },
      ]
    },

    api_params() {
      const hash = {}
      // if (this.string_var1_p) {
      //   hash["string_var1"] = this.string_var1
      // }
      // if (this.text_var1_p) {
      //   hash["text_var1"] = this.text_var1
      // }
      // if (this.radio_var1_p) {
      //   hash["radio_var1"] = this.radio_var1
      // }
      // if (this.range_var1_p) {
      //   hash["range_var1"] = this.range_var1
      // }
      // if (this.checkbox_var1_p) {
      //   hash["checkbox_var1"] = this.checkbox_var1
      // }
      // if (this.select_var1_p) {
      //   hash["select_var1"] = this.select_var1
      // }
      return hash
    },
  },
}
</script>

<style scoped lang="sass">
  .form_template
    .gmap_div
      width: 100%
      height: 256px
</style>
