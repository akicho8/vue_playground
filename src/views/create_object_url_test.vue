<template lang="pug">
.create_object_url_test
  h2.title {{current_title}}
  hr
  .columns
    .column
      .field
        input.input(v-model="my_body")
      .field
        a.button(@click="run_handle1") 文字列をURL化する
      .field
        a(:href="my_url" target="_blank") {{my_url}}

</template>

<script>
export default {
  name: "create_object_url_test",
  data() {
    return {
      my_body: new Date().toString(),
      my_url: null,
    }
  },

  methods: {
    run_handle1() {
      const blob = new Blob([this.my_body], {type: "text/plain"})
      this.my_url = URL.createObjectURL(blob)
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"
</style>
