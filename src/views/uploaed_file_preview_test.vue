<template lang="pug">
.uploaed_file_preview_test
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      .box
        .field
          p 単一ファイルアップロード
          input(type="file" @change="single_file_uploaded_handle" ref="file_input")
        .field
          img(:src="single_img_src")

      .box
        .field
          p 複数ファイルアップロード
          input(type="file" multiple @change="multiple_file_uploaded_handle" ref="multiple_file_input")
        .field
          b-table(:data="file_infos" :hoverable="true" narrowed)
            template(slot-scope="props")
              b-table-column(label="読み込み後")
                img(:src="props.row.img_src")
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
  name: "uploaed_file_preview_test",
  title: "アップロード画像プレビュー (FileReader)",
  data() {
    return {
      single_img_src: null,
      file_infos: [],
    }
  },
  methods: {
    single_file_uploaded_handle() {
      const file = this.$refs["file_input"].files[0]
      console.log(file)
      const reader = new FileReader()
      reader.addEventListener("load", () => { this.single_img_src = reader.result }, false)
      reader.readAsDataURL(file)
    },

    multiple_file_uploaded_handle() {
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
        reader.addEventListener("load", e => this.file_infos.push({file: file, img_src: e.target.result}), false) // e.target と reader は同じ
        reader.readAsDataURL(file)
      }
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.uploaed_file_preview_test
  img
    max-height: 32px
    object-fit: contain
</style>
