<template lang="pug">
.textarea_test
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      textarea.textarea.source_body(v-model="source_body" :rows="rows_size")

    .column
      .content
        div 文書の行数: {{lines_max}}
        div エリア高さ: {{rows_size}}
        br
        div 最小: {{rows_min}}
        div 最大: {{rows_max}}

</template>

<script>
export default {
  name: "textarea_test",
  title: "テキストエリア縦幅自動調整",
  data() {
    return {
      source_body: "1\n2\n3\n4\n5",
      rows_min: 2,
      rows_max: 8,
    }
  },
  computed: {
    lines_max() {
      return (this.source_body || "").split(/\n/).length
    },

    rows_size() {
      return _.clamp(this.lines_max, this.rows_min, this.rows_max)
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"
.textarea_test
</style>
