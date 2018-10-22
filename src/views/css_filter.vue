<template lang="pug">
div
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      template(v-for="record in input_elements")
        .field.is-horizontal
          .field-label.is-small
            label.label
              template(v-if="real_value_p")
                span(v-text="record.real_name || record.name" :title="record.name")
              template(v-else)
                span(v-text="record.name")

          .field-body
            .field.is-narrow
              .control
                input(type="checkbox" v-model="$data[record.display_key]")

            .field.is-narrow
              .controll
                template(v-if="record.list")
                  template(v-for="e in record.list")
                    label.radio.is-size-7
                      input(type="radio" v-model="$data[record.key]" :value="e.value")
                      template(v-if="real_value_p")
                        span(v-text="e.value" :title="e.name || e.value")
                      template(v-else)
                        span(v-text="e.name || e.value" :title="e.value")
                template(v-if="record.range")
                  input(type="range" v-model.number="$data[record.key]" :min="record.range.min" :max="record.range.max" :step="record.range.step" :disabled="!(!record.display_key || $data[record.display_key])")
                  span.range_number
                    | {{$data[record.key]}}

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

      .buttons
        button.button.is-small(@click="mode1_reset") リセット
        button.button.is-small(@click="mode2_reset") ホラー
        button.button.is-small(@click="mode3_reset") 昔の写真
        //- button.button.is-small(@click="mode2_absolute") div1浮遊
        //- button.button.is-small(@click="mode3_25p") 位置25%
        //- button.button.is-small(@click="mode4_0p") 位置0%
        //- button.button.is-small(@click="mode5_center") 中央配置
        //- button.button.is-small(@click="mode6_bottom_saturate") 右下配置

      .content
        pre.is-size-7(v-text="css_body")

      //- .content
      //-   ul.is-size-7.has-text-grey-light
      //-     li 親は absolute でも relative でもどちらでもよい
      //-     li div1 が relative なときサイズを持つので div1 のあとに div2 が配置される
      //-     li 配置なら flexbox を使った方が簡単

      template(v-if="NODE_ENV !== 'production'")
        .box
          div {{img_style}}

    .column
      img(:style="img_style" src="@/assets/ISG106132539_TP_V.jpg")
</template>

<script>
export default {
  name: "css_filter",
  title: "CSS Filter",
  data() {
    return {
      real_value_p: false,

      params_brightness: null,
      params_brightness_p: true,

      params_grayscale: null,
      params_grayscale_p: true,

      params_saturate: null,
      params_saturate_p: false,

      params_contrast: null,
      params_contrast_p: false,

      params_sepia: null,
      params_sepia_p: false,

      params_hue: null,
      params_hue_p: false,

      params_invert: null,
      params_invert_p: false,

      params_blur: null,
      params_blur_p: false,

      params_opacity: null,
      params_opacity_p: false,

      params_shadow: null,
      params_shadow_p: false,

      input_elements: [
        { key: "params_brightness", name: "明るさ",         real_name: "brightness",  default: 100, range: { min: 0,    max: 500,  step: 1,    }, display_key: "params_brightness_p", func: (v) => `brightness(${v}%)`,    },
        { key: "params_contrast",   name: "コントラスト",   real_name: "contrast",    default: 100, range: { min: 0,    max: 500,  step: 1,    }, display_key: "params_contrast_p",   func: (v) => `contrast(${v}%)`,      },
        { key: "params_saturate",   name: "彩度",           real_name: "saturate",    default: 100, range: { min: 0,    max: 300,  step: 1,    }, display_key: "params_saturate_p",   func: (v) => `saturate(${v}%)`,      },
        { key: "params_sepia",      name: "セピア",         real_name: "sepia",       default:   0, range: { min: 0,    max: 100,  step: 1,    }, display_key: "params_sepia_p",      func: (v) => `sepia(${v}%)`,         },
        { key: "params_grayscale",  name: "グレースケール", real_name: "grayscale",   default:   0, range: { min: 0,    max: 100,  step: 1,    }, display_key: "params_grayscale_p",  func: (v) => `grayscale(${v}%)`,     },
        { key: "params_hue",        name: "色相回転",       real_name: "hue-rotate",  default:   0, range: { min: -360, max: 360,  step: 1,    }, display_key: "params_hue_p",        func: (v) => `hue-rotate(${v}deg)`,  }, // 180deg と 0.5turn は同じ
        { key: "params_invert",     name: "階調反転",       real_name: "invert",      default:   0, range: { min: 0,    max: 100,  step: 1,    }, display_key: "params_invert_p",     func: (v) => `invert(${v}%)`,        },
        { key: "params_blur",       name: "ぼかし",         real_name: "blur",        default:   0, range: { min: 0,    max: 100,  step: 1,    }, display_key: "params_blur_p",       func: (v) => `blur(${v}px)`,         },
        { key: "params_opacity",    name: "非透明度",       real_name: "opacity",     default: 100, range: { min: 0,    max: 100,  step: 1,    }, display_key: "params_opacity_p",    func: (v) => `opacity(${v}%)`,       },
        { key: "params_shadow",     name: "影",             real_name: "drop-shadow", default:   0, range: { min: 0,    max: 100,  step: 1,    }, display_key: "params_shadow_p",     func: (v) => `drop-shadow(0px 0px ${v}px gray)`, },
      ],
    }
  },

  created() {
    // this.mode5_center()
    this.mode1_reset()
    this.params_shadow = 10
  },

  methods: {
    mode1_reset() {
      this.input_elements.forEach(e => {
        this.$data[e.display_key] = true

        const v = e.default
        if (v !== undefined) {
          this.$data[e.key] = v
        }
      })
    },

    mode2_reset() {
      this.mode1_reset()
      this.params_invert = 100
      this.params_contrast = 110
    },

    mode3_reset() {
      this.mode1_reset()
      this.params_contrast = 70
      this.params_sepia = 100
      this.params_grayscale = 85
      this.params_blur = 1
      this.params_shadow = 20
    },

    // mode2_absolute() {
    // },
    //
    // mode3_25p() {
    //   this.params_brightness    = 100 / 4
    //   this.params_contrast = 100 / 4
    //   this.params_grayscale   = 100 / 4
    //   this.params_saturate  = 100 / 4
    // },
    //
    // mode4_0p() {
    //   this.params_brightness    = 0
    //   this.params_contrast = 0
    //   this.params_grayscale   = 0
    //   this.params_saturate  = 0
    // },
    //
    // mode5_center() {
    //   this.mode2_absolute()
    //   this.mode3_25p()
    //   this.params_brightness_p    = true
    //   this.params_contrast_p = true
    //   this.params_grayscale_p   = true
    //   this.params_saturate_p  = true
    // },
    //
    // mode6_bottom_saturate() {
    //   this.mode2_absolute()
    //   this.mode4_0p()
    //   this.params_brightness_p    = false
    //   this.params_contrast_p = true
    //   this.params_grayscale_p   = false
    //   this.params_saturate_p  = true
    // },
  },

  computed: {
    img_style() {
      let hash = {}
      const filters = this.input_elements.reduce((a, e, i) => {
        if (this.$data[e.display_key]) {
          a.push(e.func(this.$data[e.key]))
        }
        return a
      }, [])
      if (filters.length >= 1) {
        hash["filter"] = filters.join(" ")
      }
      return hash
    },

    css_body() {
      let str = ""
      str += `img\n`
      if (this.img_style.filter) {
        str += `  filter: ${this.img_style.filter}\n`
      }
      return str
    },
  },
}
</script>

<style scoped lang="sass">
pre
  white-space: pre-wrap
.div1
</style>
