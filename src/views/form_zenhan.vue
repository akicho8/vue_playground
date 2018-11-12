<template lang="pug">
.form_zenhan
  .h2.title {{$options.title}}
  hr

  .field.is-horizontal
    .field-label.is-large
      label.label 全角
    .field-body
      .field
        .control
          input.input.is-large(type="text" v-model="zenkaku_val" placeholder="自動的に全角に変換する")
  .field.is-horizontal
    .field-label.is-large
      label.label 半角
    .field-body
      .field
        .control
          input.input.is-large(type="text" v-model="hankaku_val" placeholder="自動的に半角になるけどひらがななどは半角にできない")

</template>

<script>
export default {
  name: "form_zenhan",
  title: "全角半角変換",
  data() {
    return {
      zenkaku_val: null,
      hankaku_val: null,
    }
  },

  created() {
    this.zenkaku_val = "abc"
    this.hankaku_val = "ａｂｃ"
  },

  watch: {
    zenkaku_val(v) {
      this.zenkaku_val = v.replace(/[A-Za-z0-9]/g, s => String.fromCharCode(s.charCodeAt(0) + 65248))
    },
    hankaku_val(v) {
      this.hankaku_val = v.replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 65248))
    },
  },
}
</script>

<style scoped lang="sass">
</style>
