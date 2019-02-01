<template lang="pug">
.create_object_url_test
  h2.title {{current_title}}
  hr
  .columns
    .column
      .field
        input.input(v-model="my_body")
      .field
        .buttons
          a.button(@click="create_handle") 文字列をURL化する
          a.button(@click="revoke_handle") 解放する
      .field
        a(:href="my_url" target="_blank") {{my_url}}
      .field
        | Google Chrome では
        |
        a(href="chrome://blob-internals/" target="_blank") chrome://blob-internals/
        |
        | で作成した Blob 一覧を確認できる
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
    create_handle() {
      const blob = new Blob([this.my_body], {type: "text/plain"})
      this.my_url = URL.createObjectURL(blob)
    },
    revoke_handle() {
      URL.revokeObjectURL(this.my_url)
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"
</style>
