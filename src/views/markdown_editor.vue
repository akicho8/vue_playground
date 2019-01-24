<template lang="pug">
.mavon_editor_test
  h2.title {{current_title}}
  hr

  mavon-editor(v-model="markdown_text" language="en")

  .content.is-small
    ul
      li
        a(href="https://github.com/hinesboy/mavonEditor/blob/master/README-EN.md" target="_blank") Github

  .box
    | {{markdown_text}}

</template>

<script>
import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

export default {
  name: "mavon_editor_test",
  data() {
    return {
      markdown_text: "",

      // toolbars: {
      //   bold: true,
      //   italic: true,
      //   header: true,
      //   underline: true,
      //   strikethrough: true,
      //   mark: true,
      //   superscript: true,
      //   subscript: true,
      //   quote: true,
      //   ol: true,
      //   ul: true,
      //   link: true,
      //   imagelink: true,
      //   code: true,
      //   table: true,
      //   fullscreen: true,
      //   readmodel: true,
      //   htmlcode: true,
      //   help: true,
      //   /* 1.3.5 */
      //   undo: true,
      //   redo: true,
      //   trash: true,
      //   save: true,
      //   /* 1.4.2 */
      //   navigation: true,
      //   /* 2.1.8 */
      //   alignleft: true,
      //   aligncenter: true,
      //   alignright: true,
      //   /* 2.2.1 */
      //   subfield: true,
      //   preview: true,
      // },

    }
  },
}
</script>
