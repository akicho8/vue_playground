<template lang="pug">
.strange_attractor
  h2.title {{current_title}}
  hr

  .columns
    .column.is-one-third
      template(v-for="param_info in param_infos")
        .field.is-horizontal
          .field-label.is-small
            label.label
              | {{param_info.name}}
          .field-body
            .field.is-narrow
              .controll
                input(type="range" v-model.number="$data[param_info.key]" :min="param_info.min" :max="param_info.max" :step="param_info.step")
                | {{$data[param_info.key]}}

      .buttons
        template(v-if="interval_id")
          button.button.is-rounded.is-danger(@click="stop_run") 停止
        template(v-else)
          button.button.is-rounded.is-primary(@click="start_run") 自動
        button.button.is-rounded(@click="params_reset") リセット
        button.button.is-rounded(@click="random_run") ランダム

    .column
      .canvas_wrap
        canvas
</template>

<script>
import canvas_methods from "./canvas_methods.js"

export default {
  name: 'strange_attractor',
  mixins: [canvas_methods],
  data() {
    return {
      param_a: null,
      param_b: null,
      param_c: null,
      param_d: null,

      arc_size: 8,
      speed: 256,
      counter: 0,
      interval_id: null,
    }
  },

  watch: {
    param_a()  { this.canvas_clear() },
    param_b()  { this.canvas_clear() },
    param_c()  { this.canvas_clear() },
    param_d()  { this.canvas_clear() },
    arc_size() { this.canvas_clear() },
    speed()    { this.canvas_clear() },
  },

  created() {
    this.params_reset()
  },

  methods: {
    params_reset() {
      this.param_a = 1.93
      this.param_b = -1.7
      this.param_c = -0.61
      this.param_d = -0.77
    },

    random_run() {
      this.param_a = Math.random() - 0.5
      this.param_b = Math.random() - 0.5
      this.param_c = Math.random() - 0.5
      this.param_d = Math.random() - 0.5
    },

    start_run() {
      this.clear_interval_safe()
      this.interval_id = setInterval(this.step_next, 1000 / 2)
      this.counter = Math.random() * 256
    },

    stop_run() {
      this.clear_interval_safe()
    },

    clear_interval_safe() {
      if (this.interval_id) {
        clearInterval(this.interval_id)
        this.interval_id = null
      }
    },

    step_next() {
      this.counter += 1
      this.param_a =  1.93 + Math.sin((this.counter + 1) / 64) * 2.0
      this.param_b = -1.7  + Math.sin((this.counter + 2) / 64) * 2.0
      this.param_c = -0.61 + Math.sin((this.counter + 3) / 64) * 2.0
      this.param_d = -0.77 + Math.sin((this.counter + 4) / 64) * 2.0
    },

  },

  computed: {
    param_infos() {
      return [
        { key: "param_a",  name: "a",             min: -3, max: 3,    step: 0.01, },
        { key: "param_b",  name: "b",             min: -3, max: 3,    step: 0.01, },
        { key: "param_c",  name: "c",             min: -3, max: 3,    step: 0.01, },
        { key: "param_d",  name: "d",             min: -3, max: 3,    step: 0.01, },
        { key: "arc_size", name: "ドットサイズ",  min: 1,  max: 32,   step: 1,    },
        { key: "speed",    name: "描画数/1fps", min: 1,  max: 2048, step: 1,    },
      ].reduce((a, e, i) => ({...a, [e.key]: {code: i, ...e}}), {})
    },
  },

  mounted() {
    setInterval(() => { this.counter += 1 }, 1000)

    this.canvas_resize_hook()

    // const a = 1.93
    // const b = -1.7
    // const c = -0.61
    // const d = -0.77

    let x = 1.0
    let y = 1.0
    const run = () => {
      const a = this.param_a
      const b = this.param_b
      const c = this.param_c
      const d = this.param_d
      const speed = this.speed

      requestAnimationFrame(run)
      for (let i = 0; i < speed; i++) {
        const xn = Math.sin(a * y) - c * Math.cos(a * x)
        const yn = Math.sin(b * x) - d * Math.cos(b * y)
        x = xn
        y = yn
        const cx = this.canvas.width / 2
        const cy = this.canvas.height / 2
        const dx = cx + x * this.canvas.width * 0.25
        const dy = cy + y * this.canvas.height * 0.25

        const pixel = this.context.getImageData(dx, dy, 1, 1)
        const data = pixel.data
        let r0 = data[0] + 4 * 1
        let g0 = data[1] + 4 * 2
        let b0 = data[2] + 4 * 4
        if (r0 > 255) {
          r0 = 255
        }
        if (g0 > 255) {
          g0 = 255
        }
        if (b0 > 255) {
          b0 = 255
        }
        this.context.beginPath()
        this.context.fillStyle = `rgb(${r0}, ${g0}, ${b0})`
        this.context.arc(dx, dy, this.arc_size, 0, 2 * Math.PI)
        this.context.fill()
      }
    }
    run()
  },
}
</script>

<style scoped lang="sass">
.canvas_wrap
  height: 68vmin
  background: black
  canvas
    width: 100%
    height: 100%
</style>
