export default {
  methods: {
    canvas_clear() {
      this.context.fillStyle = "rgb(0, 0, 0)"
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    },

    canvas_resize_hook() {
      const resize = () => {
        const canvas = document.querySelector(".canvas_wrap canvas")
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
      resize()
      window.addEventListener("resize", resize, false)
    },
  },

  computed: {
    canvas() {
      return document.querySelector(".canvas_wrap canvas")
    },

    context() {
      return this.canvas.getContext("2d")
    },
  },

  mounted() {
  },
}
