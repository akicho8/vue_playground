<template lang="pug">
.uploaed_file_preview
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      .field
        input(type="file" @change="uploaded_handle" ref="file_input")
      .field
        template(v-if="file_src")
          template(v-if="/^image/.test(file_info.type)")
            img(:src="file_src")
          template(v-else-if="/^video/.test(file_info.type)")
            video(:src="file_src" controls)
          template(v-else-if="/^audio/.test(file_info.type)")
            audio(:src="file_src" controls)
          template(v-else)
            | プレビュー未対応

</template>

<script>
export default {
  name: "uploaed_file_preview",
  title: "単一アップロードファイルプレビュー (FileReader)",
  data() {
    return {
      file_info: null,
      file_src: null,
    }
  },
  methods: {
    uploaded_handle() {
      this.file_info = this.$refs["file_input"].files[0]
      console.log(this.file_info)
      const reader = new FileReader()
      reader.addEventListener("load", () => { this.file_src = reader.result }, false)
      reader.readAsDataURL(this.file_info)
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.uploaed_file_preview
  img
    max-height: 32px
    object-fit: contain
</style>
