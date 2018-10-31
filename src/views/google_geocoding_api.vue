<template lang="pug">
.google_geocoding_api
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
                button.button.is-small(@click="run_user_case1") 住所で検索
                button.button.is-small(@click="run_user_case2") 位置で検索
                button.button.is-small(@click="all_reset") リセット

      .content.box
        .is-size-7
          | ブラウザで開く
        .buttons
          a.button.is-small(:href="search_from_address_url" target="_blank") 住所で検索
          a.button.is-small(:href="search_from_latlng_url" target="_blank") 位置で検索

      template(v-if="NODE_ENV !== 'production'")
        .box
          div {{search_from_address_params}}
          div {{search_from_latlng_params}}

    .column
      .box
        b-table(:data="result_rows" :hoverable="true" :columns="table_columns" narrowed)

</template>

<script>
import dayjs from "dayjs"
import form_part from "./form_part.vue"
import qs from "querystring"

export default {
  name: "google_geocoding_api",
  title: "Google Geocoding API",
  components: {
    form_part,
  },
  data() {
    return {
      result_rows: [],
      real_value_p: false,
      value_address: null,
      value_lat: null,
      value_lng: null,

      form_parts: [
        { key: "value_address", name: "住所",  default_value: "キャロットタワー", real_name: "address", display_key: null,   type: "string", params: {}, },
        { key: "value_lat",     name: "経度",  default_value: 35.6436763,         real_name: "lat",     display_key: null,   type: "string", params: {}, },
        { key: "value_lng",     name: "緯度",  default_value: 139.6690974,        real_name: "lng",     display_key: null,   type: "string", params: {}, },
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
      this.run_user_case3(this.search_from_address_url)
    },

    run_user_case2() {
      this.run_user_case3(this.search_from_latlng_url)
    },

    run_user_case3(url) {
      fetch(url)
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
        { field: 'time',   label: '時間', sortable: true, numeric: true, },
        { field: 'params', label: '戻値', sortable: true,                },
      ]
    },

    google_geocoding_api_base_url() {
      return `https://maps.googleapis.com/maps/api/geocode/json`
    },

    search_from_address_params() {
      const hash = {}
      hash["key"] = this.API_KEY
      hash["address"] = this.value_address
      return hash
    },

    search_from_address_url() {
      return `${this.google_geocoding_api_base_url}?${qs.stringify(this.search_from_address_params)}`
    },

    search_from_latlng_params() {
      const hash = {}
      hash["key"] = this.API_KEY
      hash["latlng"] = [this.value_lat, this.value_lng].join(",")
      return hash
    },

    search_from_latlng_url() {
      return `${this.google_geocoding_api_base_url}?${qs.stringify(this.search_from_latlng_params)}`
    },
  },
}
</script>
