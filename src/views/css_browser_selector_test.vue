<template lang="pug">
.css_browser_selector_test
  h2.title {{current_title}}
  hr
  .tags
    template(v-for="e in class_list")
      .tag.is-light {{e}}
</template>

<script>

export default {
  name: "css_browser_selector_test",
  data() {
    return {
    }
  },
  computed: {
    class_list() {
      return Object.values(document.querySelector("html").classList)
    },
  },
}
</script>
