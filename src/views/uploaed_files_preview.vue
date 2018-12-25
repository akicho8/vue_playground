<template lang="pug">
.uploaed_files_preview
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      .field
        p ファイルアップロード(複数可)
        input(type="file" multiple @change="uploaded_handle" ref="multiple_file_input")
      .field
        b-table(:data="file_infos" :hoverable="true" narrowed)
          template(slot-scope="props")
            b-table-column(label="読み込み後")
              template(v-if="/^image/.test(props.row.file.type)")
                img(:src="props.row.file_src")
              template(v-else-if="/^video/.test(props.row.file.type)")
                video(:src="props.row.file_src" controls)
              template(v-else-if="/^audio/.test(props.row.file.type)")
                audio(:src="props.row.file_src" controls)
              template(v-else)
                | プレビュー未対応
            b-table-column(label="size")
              | {{props.row.file.size}}
            b-table-column(label="name")
              | {{props.row.file.name}}
            b-table-column(label="type")
              | {{props.row.file.type}}
            b-table-column(label="lastModifiedDate")
              | {{props.row.file.lastModifiedDate}}
            b-table-column(label="lastModified")
              | {{props.row.file.lastModified}}
        .has-text-grey-light.is-size-7
          p 本体以外は FileReader する前からわかる
</template>

<script>
export default {
  name: "uploaed_files_preview",
  title: "単一アップロードファイルプレビュー (FileReader)",
  data() {
    return {
      file_infos: [],
    }
  },
  methods: {
    uploaded_handle() {
      const files = this.$refs["multiple_file_input"].files
      console.log(files)

      // 追加モードにしない場合
      // inputタグの方と合わせておいた方が管理しやすいので追加はやめといた方がいい
      if (true) {
        this.file_infos = []
      }

      // files は Array ではなく FileList 型なので常識的に考えたらあるはずの forEach メソッドがないのでこんなことになっている
      for (const file of files) {
        console.log(file)
        const reader = new FileReader()
        reader.addEventListener("load", e => this.file_infos.push({file: file, file_src: e.target.result}), false) // e.target と reader は同じ
        reader.readAsDataURL(file)
      }
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.uploaed_files_preview
  img
    max-height: 32px
    object-fit: contain
</style>
