import sample_images_hash from "./views/sample_images_hash.js"

export default {
  data() {
    return {
      sample_image_index: null,
      sample_images_hash,
      sample_images: Object.values(sample_images_hash),
    }
  },

  created() {
    this.sample_image_index_set_random()
  },

  methods: {
    sample_image_index_set_random() {
      this.sample_image_index = this.sample_image_random_index_get()
    },
    sample_image_relative_move_to_p(sign) {
      const v = this.sample_image_index + sign
      return 0 <= v && v < this.sample_images.length
    },
    sample_image_relative_move_to(sign) {
      if (this.sample_image_relative_move_to_p(sign)) {
        this.sample_image_index += sign
      }
    },
    sample_image_index_cycle() {
      this.sample_image_index = this.sample_image_index_add(1)
    },
    sample_image_index_add(sign) {
      return Math.floor((this.sample_image_index + sign) % this.sample_images.length)
    },
    sample_images_shuffle() {
      this.sample_images = this.lodash.shuffle(this.sample_images)
    },

    sample_image_random_index_get() {
      return _.random(this.sample_images.length - 1)
    },

    sample_images_random_get() {
      return this.sample_images[this.sample_image_random_index_get()]
    },

    sample_images_add() {
      const list = Object.values(sample_images_hash)
      const object = list[_.random(list.length - 1)]
      this.sample_images.splice(this.sample_image_random_index_get(), 0, object)
    },
    sample_images_remove() {
      this.sample_images.splice(this.sample_image_random_index_get(), 1)
    },
  },

  computed: {
    sample_image() {
      return this.sample_images[this.sample_image_index_safe]
    },

    sample_image_index_safe() {
      return Math.floor(this.sample_image_index % this.sample_images.length)
    },
  },
}
