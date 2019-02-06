<template lang="pug">
.vue_inline_render_component_test
  h2.title {{current_title}}
  hr
  custom_head(:level="1") 自作のコンポーネントの子要素
</template>

<script>

// https://jp.vuejs.org/v2/guide/render-function.html#createElement-%E5%BC%95%E6%95%B0
export default {
  name: "vue_inline_render_component_test",
  components: {
    custom_head: {
      props: {
        level: { type: Number, required: true },
      },
      render(createElement) {
        return createElement(`h${this.level}`, this.$slots.default)
      },
    },
  },
}
</script>
