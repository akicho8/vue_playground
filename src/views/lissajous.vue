<template lang="pug">
.lissajous
  .h2.title {{$options.title}}
  hr

  .columns
    .column.is-one-third
      template(v-for="form_part in form_parts")
        form_part(:form_part="form_part" :value.sync="$data[form_part.key]" :value_p.sync="$data[form_part.display_key]")

      .field.is-horizontal
        .field-label
        .field-body
          .field
            .control
              .buttons
                button.button.is-small(@click="all_reset") リセット
              .buttons
                button.button.is-small(@click="case_hosi") ☆

    .column
      .canvas_wrap
        canvas

</template>

<script>
import form_part from "./form_part.vue"
import canvas_methods from "./canvas_methods"

class Point {
  constructor(base, index) {
    this.base = base
    this.index = index
  }
  draw() {
    const cx = this.base.canvas.width / 2
    const cy = this.base.canvas.height / 2
    const s = 2 * Math.PI / this.base.point_count * this.index
    const one = 2 * Math.PI
    const a = one / (60*60) * this.base.speed / this.base.point_count * this.base.counter
    const sin = Math.sin
    const cos = Math.cos

    this.base.context.beginPath();
    this.base.context.lineWidth = 1
    this.base.context.strokeStyle = "hsl(200, 50%, 60%)"

    let x = null
    let y = null

    if (this.base.calc_key === "type1") {
      x = sin(s + a * 3)
      y = cos(s + a * 7)
    }
    if (this.base.calc_key === "type2") {
      x = sin(s + a * 3) - sin(s + a * 0.95) / 5
      y = cos(s + a * 7) - cos(s + a * 0.95) / 5
    }
    if (this.base.calc_key === "type3") {
      x = sin(s + a * 3) - sin(s + a * 0.95) / 5 - sin(s + a * 20.5) / 5
      y = cos(s + a * 7) - cos(s + a * 0.95) / 5 - cos(s + a * 20.5) / 5
    }
    if (this.base.calc_key === "soto_torokoido") {
      const rc = 0.5
      const rm = 0.3
      const rd = 0.5
      const t = (rc - rm) / rm * a
      x = (rc - rm) * cos(s + a) + rd * cos(s + t)
      y = (rc - rm) * sin(s + a) - rd * sin(s + t)
    }

    x *= this.base.canvas.width  * 0.45
    y *= this.base.canvas.height * 0.45

    console.log(x)
    console.log(y)

    this.base.context.arc(cx + x, cy + y, this.base.radius_value, 0, one)
    this.base.context.stroke()
  }
}

export default {
  name: "lissajous",
  title: "いろいろな曲線",
  components: {
    form_part,
  },
  mixins: [canvas_methods],
  data() {
    return {
      counter: 0,
      calc_key: "type1",
      points: null,
      speed: null,
      blur_value: null,
      point_count: null,
      radius_value: null,

      form_parts: [
        { key: "point_count",  name: "個数",       default_value: 3,    type: "number",  params: { min: 0,  max: 100,  step: 1,     }, },
        { key: "speed",        name: "スピード",   default_value: 1.5,  type: "range",   params: { min: 0,  max: 256,  step: 0.1,   }, },
        { key: "blur_value",   name: "残像",       default_value: 0.05, type: "number",  params: { min: 0,  max: 1,    step: 0.001, }, },
        { key: "radius_value", name: "半径",       default_value: 32,   type: "range",   params: { min: 1,  max: 100,  step: 1,     }, },
        {
          key: "calc_key",
          name: "タイプ",
          real_name: "calc_key",
          default_value: "type3",
          type: "radio",
          elems: [
            { name: "タイプA",  value: "type1", },
            { name: "タイプB",  value: "type2", },
            { name: "タイプC",  value: "type3", },
            { name: "内トロコイド",  value: "soto_torokoido", },
          ],
        },
        // {
        //   name: "チェックボックス1",
        //   key: "checkbox_var1",
        //   default_value: ["value1"],
        //   type: "checkbox",
        //   elems: [
        //     { name: "選択肢1",  value: "value1", tooltip: "ツールチップ1", },
        //     { name: "選択肢2",  value: "value2", tooltip: "ツールチップ2", },
        //   ],
        // },
      ],
    }
  },

  created() {
    this.all_reset()
  },

  mounted() {
    this.canvas_resize_hook()
    this.points_create()

    const run = () => {
      window.requestAnimationFrame(run)

      this.context.globalCompositeOperation = "destination-out"
      this.context.fillStyle = `rgba(0, 0, 0, ${this.blur_value})`
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.globalCompositeOperation = "lighter"

      for (const point of this.points) {
        point.draw()
      }
      this.counter += 1
    }
    run()
  },

  watch: {
    point_count() {
      this.points_create()
    }
  },

  methods: {
    case_hosi() {
      this.calc_key = "soto_torokoido"
      this.point_count = 1
      this.speed = 100
      this.blur_value = 0.01
      this.radius_value = 10
    },

    points_create() {
      this.points = []
      for (let i = 0; i < this.point_count; i++) {
        const point = new Point(this, i)
        this.points.push(point)
      }
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
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.lissajous
  .canvas_wrap
    height: 68vmin
    background: black
    canvas
      width: 100%
      height: 100%
</style>
