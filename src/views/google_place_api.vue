<template lang="pug">
.google_place_api
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      template(v-for="form_part in form_parts")
        form_part(:form_part="form_part" :value.sync="$data[form_part.key]" :value_p.sync="$data[form_part.display_key]")

      .field.is-horizontal
        .field-label
        .field-body
          .field
            .control
              .buttons
                button.button.is-small(@click="search_run") 検索

      .content.is-small
        a(:href="search_from_address_url" target="_blank") WEB経由のAPI実行でJSON確認

      //- template(v-if="NODE_ENV !== 'production'")
      //-   .box
      //-     div {{api_params}}

      b-table.box(:data="shop_items" :hoverable="true" narrowed)
        template(slot-scope="props")
          b-table-column(label="アイコン")
            img(:src="props.row.icon" width="16")
          b-table-column(label="名前")
            a(@click="shop_info_click(props.row)")
              | {{props.row.name}}
          b-table-column(label="住所")
            | {{props.row.formatted_address}}
          b-table-column(label="営業中")
            template(v-if="props.row.opening_hours")
              | {{props.row.opening_hours.open_now}}

    .column
      .gmap_div(ref="gmap")

</template>

<script>
const INFLUENCE_RADIUS = 1000   // 最初の店の周辺何メートルを探す？
// const DEBOUNCE_DELAY   = 500    // 入力後何ms待ってAPIを実行するか

// import dayjs from "dayjs"
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
      shop_items: [],
      markers: [],
      query_value: null,

      value_lat: 35.6436763,
      value_lng: 139.6690974,

      // { key: "value_lat",     name: "経度",  default_value: 35.6436763,         real_name: "lat",     display_key: null,   type: "string", params: {}, },
      // { key: "value_lng",     name: "緯度",  default_value: 139.6690974,        real_name: "lng",     display_key: null,   type: "string", params: {}, },

      gmap: null,

      form_parts: [
        { key: "query_value",   name: "キーワード",  default_value: "キャロットタワー", real_name: "address", display_key: null,   type: "string", params: {}, },
        // { key: "value_lat",     name: "経度",  default_value: 35.6436763,         real_name: "lat",     display_key: null,   type: "string", params: {}, },
        // { key: "value_lng",     name: "緯度",  default_value: 139.6690974,        real_name: "lng",     display_key: null,   type: "string", params: {}, },
      ],
    }
  },

  created() {
    this.all_reset()
  },

  mounted() {
    const ll = new google.maps.LatLng(this.value_lat, this.value_lng)
    this.gmap = new google.maps.Map(this.$refs.gmap, {zoom: 12, center: ll})

    this.search_run()
  },

  // watch: {
  //   query_value() { this.search_run() },
  //   center()    { this.search_run() },
  // },

  methods: {
    shop_info_click(shop_info) {
      // 親に依存しているのは本当はよくないが一般的なライブラリではないのでよしとする
      // this.location_set(shop_info.geometry.location)
      const location = shop_info.geometry.location
      this.gmap.setCenter(location)
      // if (this.currentMarker) {
      //   this.currentMarker.setPosition(location)
      // }
    },

    // 住所検索時の処理
    // search_run: _.debounce(function() {
    //   if (this.query_value === "") {
    //     this.nothing = false
    //     this.shop_items = []
    //   } else {
    //     const params = {
    //       query: this.query_value,
    //       location: this.center,
    //       radius: INFLUENCE_RADIUS,
    //     }
    //     this.service.textSearch(params, (results, status) => {
    //       if (status !== google.maps.places.PlacesServiceStatus.OK) {
    //         this.nothing = true
    //         this.shop_items = []
    //       } else {
    //         this.nothing = false
    //         this.shop_items = results
    //       }
    //     })
    //   }
    // }, DEBOUNCE_DELAY),

    search_run() {
      const params = {
        query: this.query_value,
        location: this.center,
        radius: INFLUENCE_RADIUS,
      }
      this.service.textSearch(params, (results, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          this.shop_items = []
        } else {
          this.shop_items = results

          this.markers.forEach(e => e.setMap(null))
          this.markers = []

          this.shop_items.forEach(e => {
            const marker = new google.maps.Marker()
            marker.setPosition(e.geolocation.location)
            marker.setMap(this.gmap)

            this.markers.push(marker)
          })
        }
      })
    },

    // run_user_case3(url) {
    //   fetch(url, {mode: 'no-cors'})
    //     .then(r => r.json())
    //     .then(v => {
    //       this.shop_items.push({
    //         time: dayjs().format("YYYY-MM-DD hh:mm:ss.SSS"),
    //         params: v,
    //       })
    //     })
    // },

    form_parts_reset() {
      this.form_parts.forEach(e => this[e.key] = e.default_value)
    },

    shop_items_reset() {
      this.shop_items = []
    },

    all_reset() {
      this.shop_items_reset()
      this.form_parts_reset()
    },

    disabled(record) {
      return !(!record.display_key || this.$data[record.display_key])
    },
  },

  computed: {
    service() {
      return new google.maps.places.PlacesService(this.gmap)
    },
    center() {
      if (this.gmap) {
        return this.gmap.getCenter()
      }
    },

    table_columns() {
      return [
        { field: 'name', label: '名前', sortable: true, numeric: false, },
        // { field: 'icon', label: 'icon', sortable: true, numeric: false, },
        { field: 'formatted_address', label: '住所', },
      ]
    },

    api_base_url() {
      return `https://maps.googleapis.com/maps/api/place/textsearch/json`
    },

    api_params() {
      const hash = {}
      hash["key"] = this.API_KEY
      hash["query"] = this.query_value
      // if (this.center) {
      //   hash["location"] = this.center
      // }
      return hash
    },

    search_from_address_url() {
      return `${this.api_base_url}?${qs.stringify(this.api_params)}`
    },
  },
}
</script>

<style scoped lang="sass">
  .gmap_div
    width: 100
    height: 256px

  input
    margin-top: 0.5em
    border-radius: 1em
  ul
    margin: 1em 0.5em
    li
      margin: 0.25em
      img
        height: 16px
      .shop_info_name
        margin-left: 0.5em
      a
        cursor: pointer
        text-decoration: none
        &:hover
          text-decoration: underline
  .error_message
    color: gray
    font-size: 0.5em
    margin-top: 1.2em
</style>
