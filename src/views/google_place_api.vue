<template lang="pug">
.google_place_api
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      form(@submit.prevent="search_run")
        form_parts

        .field.is-horizontal
          .field-label
          .field-body
            .field
              .control
                .buttons
                  .button.is-primary.is-small(@click.prevent="search_run") 検索
                  .button.is-small(@click.prevent="command1") 吹き出し全表示
                  .button.is-small(@click.prevent="command2") 吹き出し全消去
                  .button.is-small(@click.prevent="command3") 1kmの円配置

      .section
        b-table.box(:data="shop_items" :hoverable="true" narrowed)
          template(slot-scope="props")
            b-table-column(label="画")
              img(:src="props.row.icon" width="16")
            b-table-column(label="名前")
              a(@click="click_handle(props.row)" @mouseover="link_mouseover_handle(props.row)" @mouseout="link_mouseout_handle(props.row)")
                | {{props.row.name}}
            //- b-table-column(label="住所")
            //-   | {{props.row.formatted_address}}
            b-table-column(label="営業中")
              template(v-if="props.row.opening_hours")
                | {{props.row.opening_hours.open_now ? "○" : ""}}

    .column
      .gmap_div(ref="gmap")

  hr

  .content.is-small
    a(:href="search_from_address_url" target="_blank") WEB経由のAPI実行でJSON確認

</template>

<script>
import form_parts from "./form_parts.vue"
import qs from "querystring"

export default {
  name: "google_geocoding_api",
  title: "お店検索 (Google Place API)",
  components: {
    form_parts,
  },
  data() {
    return {
      shop_items: [],
      circle: null,
      query_value: null,
      check_radius: null,

      value_lat: 35.6436763,
      value_lng: 139.6690974,

      // { key: "value_lat",     name: "経度",  default_value: 35.6436763,         real_name: "lat",     display_key: null,   type: "string", params: {}, },
      // { key: "value_lng",     name: "緯度",  default_value: 139.6690974,        real_name: "lng",     display_key: null,   type: "string", params: {}, },

      gmap: null,

      flags: null,

      form_parts: [
        { key: "query_value",   name: "キーワード",    default_value: "卓球", type: "string",  params: {}, },
        { key: "check_radius",  name: "検索半径(km)",  default_value:     1,  type: "number", params: {step: 0.1}, },
        {
          name: "動作",
          key: "flags",
          default_value: ["center_p"],
          type: "checkbox",
          elems: [
            { name: "センタリング", value: "center_p", },
          ],
        },

      ],
    }
  },

  created() {
    this.all_reset()
  },

  mounted() {
    const ll = new google.maps.LatLng(this.value_lat, this.value_lng)
    this.gmap = new google.maps.Map(this.$refs.gmap, {zoom: 12, center: ll})
    // this.service = new google.maps.places.PlacesService(this.gmap)

    this.search_run()
  },

  watch: {
    // flags(v) {
    //   // if (v.includes("info_window")) {
    //   //   this.shop_items.forEach(e => {
    //   //     e.info_window.open(e.marker.getMap(), e.marker)
    //   //   })
    //   // } else {
    //   //   this.shop_items.forEach(e => {
    //   //     e.info_window.close()
    //   //   })
    //   // }
    // },
  },

  methods: {
    click_handle(shop_item) {
      this.shop_item_center(shop_item)
      this.circle_on()
    },

    search_run() {
      const params = {
        query: this.query_value,
        location: this.center,
        radius: 1000 * this.check_radius, // これあんまり効いてない
      }
      console.log(params)
      this.service.textSearch(params, (results, status) => {
        this.points_reset()
        this.shop_items = []
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.shop_items = results
        }
        this.makers_mouse_over_out()
      })
    },

    points_reset() {
      this.shop_items.forEach(e => {
        if (e.point) {
          e.point.marker.setMap(null)
        }
      })
    },

    points_setup() {
      this.points_reset()

      this.shop_items.forEach(e => {
        const point = {}

        // {label: {text: e.name}}
        point.marker = new google.maps.Marker()
        point.marker.setPosition(e.geometry.location)
        point.marker.setMap(this.gmap)

        // marker.setAnimation(google.maps.Animation.BOUNCE)

        point.info_window = new google.maps.InfoWindow({content: e.name})
        // point.marker.addListener("mouseover", () => { point.info_window.open(point.marker.getMap(), point.marker) })
        // point.marker.addListener("mouseout", () => { point.info_window.close() })

        // google.maps.event.addListener circle, "radius_changed", ->
        //   $("#radius_div").text(circle.getRadius())

        e.point = point
      })
    },

    makers_mouse_over_out() {
      this.points_setup()
      this.shop_items.forEach(e => {
        e.point.marker.addListener("mouseover", () => { this.shop_item_show(e) })
        e.point.marker.addListener("mouseout",  () => { this.shop_item_hide(e) })
      })
    },

    link_mouseover_handle(shop_item) {
      if (this.flags.includes("center_p")) {
        this.shop_item_center(shop_item)
      }
      this.shop_item_show(shop_item)
    },

    link_mouseout_handle(shop_item) {
      this.shop_item_hide(shop_item)
    },

    command1() {
      this.shop_items.forEach(e => this.shop_item_show(e))
    },

    command2() {
      this.shop_items.forEach(e => this.shop_item_hide(e))
    },

    command3() {
      this.circle_off()
      this.circle_on()
    },

    circle_off() {
      if (this.circle) {
        this.circle.setMap(null)
        this.circle = null
      }
    },

    circle_on() {
      this.circle_off()

      this.circle = new google.maps.Circle({center: this.gmap.getCenter(), radius: 1000, draggable: true, editable: true})
      this.circle.setMap(this.gmap)
      // 地図のビューポート調整 (なんと円がいちばん綺麗に見れるところまでズームしてくれる)
      this.gmap.fitBounds(this.circle.getBounds())
    },

    form_parts_reset() {
      this.form_parts.forEach(e => this[e.key] = e.default_value)
    },

    all_reset() {
      this.form_parts_reset()
    },

    shop_item_show(shop_item) {
      shop_item.point.info_window.open(shop_item.point.marker.getMap(), shop_item.point.marker)
    },

    shop_item_hide(shop_item) {
      shop_item.point.info_window.close()
    },

    shop_item_center(shop_item) {
      this.gmap.setCenter(shop_item.geometry.location)
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
        { field: 'formatted_address', label: '住所', },
      ]
    },

    api_base_url() {
      return `https://maps.googleapis.com/maps/api/place/textsearch/json`
    },

    // なぜかこっちは radius パラメータが不要
    api_params() {
      const hash = {}
      hash["key"] = this.API_KEY
      hash["query"] = this.query_value
      if (this.center) {
        hash["location"] = [this.center.lat(), this.center.lng()].join(",")
      }
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
    width: 100%
    height: 77vmin
</style>
