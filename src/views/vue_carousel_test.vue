<template lang="pug">
.vue_carousel_test
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

      .content.is-small
        ul
          li
            a(href="https://github.com/SSENSE/vue-carousel" target="_blank") SSENSE/vue-carousel

      template(v-if="NODE_ENV !== 'production'")
        .box
          div {{api_params}}

    .column
      .box
        carousel(
          :autoplay="slider_flags.includes('autoplay')"
          :loop="slider_flags.includes('loop')"
          :navigationEnabled="slider_flags.includes('navigationEnabled')"
          :paginationEnabled="slider_flags.includes('paginationEnabled')"
          :scrollPerPage="slider_flags.includes('scrollPerPage')"
          :speed="speed * 1000"
          :navigateTo="navigateTo"
          :perPage="perPage"
          :easing="easing"
          )
          slide(v-for="(image_file, key, i) in sample_images_hash" @slideClick="slide_callback" @pageChange="slide_callback" @transitionEnd="slide_callback" :data-value1="i" :data-value2="key")
            img(:src="image_file")

      .box
        b-table(:data="result_rows" :hoverable="true" :columns="table_columns" narrowed)

</template>

<script>
import form_parts from "./form_parts.vue"

// import I9A5312ISUMI_TP_V from "@/assets/I9A5312ISUMI_TP_V.jpg"
// import IS107112702_TP_V from "@/assets/IS107112702_TP_V.jpg"
// import IMARI20160806355715_TP_V from "@/assets/IMARI20160806355715_TP_V.jpg"
// import IMGL5303_TP_V from "@/assets/IMGL5303_TP_V.jpg"
// import ISG106132539_TP_V from "@/assets/ISG106132539_TP_V.jpg"
// import logo from "@/assets/logo.png"
// import rails from "@/assets/rails.png"

export default {
  name: "vue_carousel_test",
  components: {
    form_parts,
  },
  data() {
    return {
      slider_flags: [],
      speed: null,
      perPage: null,
      scrollPerPage: null,
      easing: null,
      navigateTo: null,

      real_value_p: false,

      result_rows: [],

      form_parts: [
        { key: "speed",      name: "スピード",       default_value:  1, real_name: "speed",      type: "range",  params: { min: 0, max: 3, step: 0.1, }, },
        { key: "perPage",    name: "表示数/1ページ", default_value:  1, real_name: "perPage",    type: "range",  params: { min: 0, max: 4, step: 1,   }, },
        { key: "navigateTo", name: "指定位置移動",   default_value:  0, real_name: "navigateTo", type: "number",  params: {  }, },
        {
          name: "フラグ的な設定",
          key: "slider_flags",
          default_value: [
            "autoplay",
            "loop",
            "navigationEnabled",
            "paginationEnabled",
            "scrollPerPage",
          ],
          type: "checkbox",
          elems: [
            { name: "自動再生",             value: "autoplay",          },
            { name: "ループ",               value: "loop",              },
            { name: "ナビ",                 value: "navigationEnabled", },
            { name: "ページネーション",     value: "paginationEnabled", },
            { name: "ページ単位スクロール", value: "scrollPerPage",     },
          ],
        },
        {
          name: "動き方",
          key: "easing",
          default_value: "ease-in-out",
          type: "radio",
          elems: [
            { value: "ease",        },
            { value: "ease-in",     },
            { value: "ease-out",    },
            { value: "ease-in-out", },
            { value: "linear",      },
            { value: "step-start",  },
            { value: "step-end",    },
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
    slide_callback(e) {
      console.log(e)
      this.result_rows.push({
        type: e.type,
        params: inspect(e),
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
        { field: 'type',   label: 'type',  sortable: true, },
        { field: 'params', label: 'event', sortable: true, },
      ]
    },

    api_params() {
      return this.form_parts.reduce((a, e) => ({...a, [e.key]: this.$data[e.key]}))
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.VueCarousel-slide
  display: flex
  align-items: center
  justify-content: center
  max-height: 256px
</style>
