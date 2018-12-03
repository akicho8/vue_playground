import sample_images_hash from "./views/sample_images_hash.js"

export default {
  data() {
    return {
      sample_image_index: null,
      sample_images_hash,
    }
  },

  created() {
    this.sample_image_shuffle()
  },

  methods: {
    sample_image_shuffle() {
      this.sample_image_index = _.random(this.sample_images.length - 1)
    },
    relative_move_to_p(sign) {
      const v = this.sample_image_index + sign
      return 0 <= v && v < this.sample_images.length
    },
    relative_move_to(sign) {
      if (this.relative_move_to_p(sign)) {
        this.sample_image_index += sign
      }
    },
  },

  computed: {
    sample_image() {
      return this.sample_images[Math.floor(this.sample_image_index % this.sample_images.length)]
    },
    sample_images() {
      return Object.values(this.sample_images_hash)
    },
  },
}
