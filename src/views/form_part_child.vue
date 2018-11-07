<template lang="pug">
span
  template(v-if="info.tooltip")
    b-tooltip(:label="info.tooltip" multilined)
      template(v-if="real_value_p")
        span(v-text="info.value" :title="info.name || info.value")
      template(v-else)
        span(v-text="info.name || info.value" :title="info.value")
  template(v-else)
    template(v-if="real_value_p")
      span(v-text="info.value" :title="info.name || info.value")
    template(v-else)
      span(v-text="info.name || info.value" :title="info.value")
</template>

<script>
export default {
  name: "info",
  props: {
    info:       { required: true,  },
    real_value_p: { required: false, default: false, },
  },
}
</script>

<style scoped lang="sass">
</style>
