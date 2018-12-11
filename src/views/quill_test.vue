<template lang="pug">
.quill_test
  .h2.title {{$options.title}}
  hr

  quill-editor(v-model="content")

</template>

<script>

// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// import Quill from 'quill'
// import { someModule } from '../yourModulePath/someQuillModule.js'
// Quill.register('modules/someModule', someModule)
//
// import { quillEditor } from 'vue-quill-editor'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: "quill_test",
  title: "quill_test",
  components: {
    quillEditor,
  },
  data() {
    return {
      content: '<p>example content</p>',
      editorOption: { /* quill options */ },
    }
  },
  // manually control the data synchronization
  methods: {
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      // console.log('editor change!', quill, html, text)
      // this.content = html
    }
  },
  computed: {
    // editor() {
    //   return this.$refs.myQuillEditor.quill
    // }
  },
  mounted() {
    // console.log('this is current quill instance object', this.editor)
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"
</style>
