<template lang="pug">
.vue_carousel_test
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
                button.button.is-small(@click="run_user_case1") 送信1
                button.button.is-small(@click="run_user_case2") 送信2

      .content.is-small
        ul
          li
            a(href="https://github.com/SSENSE/vue-carousel" target="_blank") Github
          li
            a(href="https://keycox.hatenablog.com/entry/2018/09/20/175909" target="_blank") 【Vue Carousel】Vueで カルーセルを作る

      template(v-if="NODE_ENV !== 'production'")
        .box
          div {{api_params}}

    .column
      .box
        carousel(
          :autoplay="slider_flags.includes('autoplay')"
          :loop="slider_flags.includes('loop')"
          :navigation-enabled="slider_flags.includes('navigation-enabled')"
          :pagination-enabled="slider_flags.includes('pagination-enabled')"
          :speed="speed * 1000"
          :perPage="perPage"
          )
          slide
            img(src="@/assets/I9A5312ISUMI_TP_V.jpg")
          slide
            img(src="@/assets/IS107112702_TP_V.jpg")
          slide
            img(src="@/assets/IMARI20160806355715_TP_V.jpg")
          slide
            img(src="@/assets/IMGL5303_TP_V.jpg")
          slide
            img(src="@/assets/ISG106132539_TP_V.jpg")
          slide
            img(src="@/assets/logo.png")
          slide
            img(src="@/assets/rails.png")

      .box
        b-table(:data="result_rows" :hoverable="true" :columns="table_columns" narrowed)

</template>

<script>
import form_part from "./form_part.vue"

// import I9A5312ISUMI_TP_V from "@/assets/I9A5312ISUMI_TP_V.jpg"
// import IS107112702_TP_V from "@/assets/IS107112702_TP_V.jpg"
// import IMARI20160806355715_TP_V from "@/assets/IMARI20160806355715_TP_V.jpg"
// import IMGL5303_TP_V from "@/assets/IMGL5303_TP_V.jpg"
// import ISG106132539_TP_V from "@/assets/ISG106132539_TP_V.jpg"
// import logo from "@/assets/logo.png"
// import rails from "@/assets/rails.png"

export default {
  name: "vue_carousel_test",
  title: "Vue Carousel Test",
  components: {
    form_part,
  },
  data() {
    return {
      result_rows: [],

      real_value_p: false,

      // string_var1_p: true,
      // string_var1: null,

      // text_var1_p: true,
      // text_var1: null,

      radio_var1_p: true,
      radio_var1: null,

      slider_flags: [],

      speed: null,
      perPage: null,

      select_var1_p: true,
      select_var1: 0,

      form_parts: [
        // { key: "string_var1",  name: "文字列1",    default_value: "(string_var1)", real_name: "string_var1", display_key: "string_var1_p",   type: "string", params: {                             }, },
        { key: "speed",        name: "スピード",   default_value:  1,              real_name: "speed",                                       type: "range",  params: { min: 0,  max: 3, step: 0.1, }, },
        { key: "perPage",     name: "要素数/page",     default_value:  1,         real_name: "perPage",                                    type: "range",  params: { min: 0,  max: 4, step: 1, }, },
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
          key: "slider_flags",
          real_name: "slider_flags",
          default_value: [
            "autoplay",
            "loop",
            "navigation-enabled",
            "pagination-enabled",
          ],
          type: "checkbox",
          elems: [
            { name: "自動再生",         value: "autoplay",           tooltip: null, },
            { name: "ループ",           value: "loop",               tooltip: null, },
            { name: "ナビ",             value: "navigation-enabled", tooltip: null, },
            { name: "ページネーション", value: "pagination-enabled", tooltip: null, },
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
        // time: dayjs().format("YYYY-MM-DD hh:mm:ss.SSS"),
        params: this.api_params,
      })
    },

    run_user_case2() {
      fetch("https://yesno.wtf/api")
        .then(r => r.json())
        .then(v => {
          this.result_rows.push({
            // time: dayjs().format("YYYY-MM-DD hh:mm:ss.SSS"),
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
        // { field: 'time',   label: '時間',         sortable: true, numeric: true, },
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
      // if (this.speed_p) {
      //   hash["speed"] = this.speed
      // }
      // if (this.slider_flags_p) {
      //   hash["slider_flags"] = this.slider_flags
      // }
      // if (this.select_var1_p) {
      //   hash["select_var1"] = this.select_var1
      // }

      hash["v-bind:perPage"] = this.perPage

      return hash
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.VueCarousel-slide
  height: 256px
  // color: #FFF
  // background: #59ecff
  display: flex
  align-items: center
  justify-content: center
  // border-right: 1px solid #FFF
  box-sizing: border-box
  // font-size: 12px
  // img
  //   object-fit: contain
</style>
