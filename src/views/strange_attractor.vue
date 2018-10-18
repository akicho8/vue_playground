<template lang="pug">
.strange_attractor
  h2.title {{$options.title}}
  hr
  .canvas_wrap
    canvas
</template>

<script>

export default {
  name: 'strange_attractor',
  title: "ストレンジアトラクター",
  data() {
    return {
    }
  },

  mounted() {
    const canvas = document.querySelector(".canvas_wrap canvas")
    const ctx = canvas.getContext("2d")

    if (true) {
      function resize() {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
      resize()
      window.addEventListener("resize", () => resize(), false)
    }

    let x = 1
    let y = 1

    const a = 1.93
    const b = -1.7
    const c = -0.61
    const d = -0.77

    const run = () => {
      requestAnimationFrame(run)
      for (let i = 0; i < 500; i++) {
        const xn = Math.sin(a * y) - c * Math.cos(a * x)
        const yn = Math.sin(b * x) - d * Math.cos(b * y)
        x = xn
        y = yn
        const cx = canvas.width / 2
        const cy = canvas.height / 2
        const dx = cx + x * canvas.width * 0.25
        const dy = cy + y * canvas.height * 0.25

        const pixel = ctx.getImageData(dx, dy, 1, 1)
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
        ctx.beginPath()
        ctx.fillStyle = `rgb(${r0}, ${g0}, ${b0})`
        ctx.arc(dx, dy, 1, 0, 2 * Math.PI)
        ctx.fill()
      }
    }
    run()
  },
}
</script>

<style scoped lang="sass">
.canvas_wrap
  height: 480px
  background: black
  canvas
    width: 100%
    height: 100%
</style>
