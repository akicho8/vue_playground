<template lang="pug">
.tinymce_vue_test
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      TinyMceEditor(api-key="9qx9mi2wmcz572kkki94zhl493ukduxyhfxpecsszpsnzt52" v-model="body" :init="tiny_mce_options" ref="tinymce_dom")
      .field
        a(href="https://www.tiny.cloud/docs/" target="_blank") https://www.tiny.cloud/docs/

    .column
      b-message.is-primary(title="HTML" type="" :closable="false")
        | {{body}}
      b-message.is-primary(title="プレビュー" type="" :closable="false")
        div(v-html="body")
</template>

<script>
// yarn add tinymce
// yarn add @tinymce/tinymce-vue
// yarn add tinymce-i18n

// ▼ tinymce
require("tinymce/tinymce.min.js") // window.tinymce に設定される

tinymce.EditorManager.baseURL = "/tinymce"
require('tinymce/themes/modern/theme') // これがないとまともに表示されない

// plugins に指定する場合、あらかじめロードしておく必要がある(面倒)
require("tinymce/plugins/wordcount")
require("tinymce/plugins/visualchars")
require("tinymce/plugins/visualblocks")
require("tinymce/plugins/toc")
require("tinymce/plugins/textpattern")
require("tinymce/plugins/textcolor")
require("tinymce/plugins/template")
require("tinymce/plugins/table")
require("tinymce/plugins/tabfocus")
require("tinymce/plugins/spellchecker")
require("tinymce/plugins/searchreplace")
require("tinymce/plugins/save")
require("tinymce/plugins/print")
require("tinymce/plugins/paste")
require("tinymce/plugins/preview")
require("tinymce/plugins/noneditable")
require("tinymce/plugins/pagebreak")
require("tinymce/plugins/nonbreaking")
require("tinymce/plugins/media")
require("tinymce/plugins/link")
require("tinymce/plugins/lists")
require("tinymce/plugins/legacyoutput")
require("tinymce/plugins/insertdatetime")
require("tinymce/plugins/importcss")
require("tinymce/plugins/imagetools")
require("tinymce/plugins/image")
require("tinymce/plugins/hr")
require("tinymce/plugins/help")
require("tinymce/plugins/fullscreen")
require("tinymce/plugins/fullpage")
require("tinymce/plugins/emoticons")
require("tinymce/plugins/directionality")
require("tinymce/plugins/contextmenu")
require("tinymce/plugins/colorpicker")
require("tinymce/plugins/codesample")
require("tinymce/plugins/code")
require("tinymce/plugins/charmap")
require("tinymce/plugins/bbcode")
require("tinymce/plugins/autosave")
require("tinymce/plugins/autoresize")
require("tinymce/plugins/autolink")
require("tinymce/plugins/advlist")
require("tinymce/plugins/anchor")

// require('tinymce/plugins/advlist')
// require('tinymce/plugins/autolink')
// require('tinymce/plugins/lists')
// require('tinymce/plugins/link')
// require('tinymce/plugins/image')
// require('tinymce/plugins/charmap')
// require('tinymce/plugins/print')
// require('tinymce/plugins/preview')
// require('tinymce/plugins/anchor')
// require('tinymce/plugins/searchreplace')
// require('tinymce/plugins/visualblocks')
// require('tinymce/plugins/code')
// require('tinymce/plugins/fullscreen')
// require('tinymce/plugins/insertdatetime')
// require('tinymce/plugins/media')
// require('tinymce/plugins/table')
// require('tinymce/plugins/contextmenu')
// require('tinymce/plugins/paste')
// require('tinymce/plugins/code')

// ▼tinymce-i18n
require("tinymce-i18n/langs/ja.js") // window.tinymce に設定する

// これが謎
// 日本語化するには tinymce 本体を読み込む必要があったけど、これ単体でも tinymce が動く
// window.tinymce が存在するとそっちを使うようになっているような感じはする
// ちなみにこれを使わないと v-model 的な連動ができない
import TinyMceEditor from '@tinymce/tinymce-vue'

export default {
  name: "tinymce_vue_test",
  title: "TinyMCE",
  components: {
    TinyMceEditor,
  },
  data() {
    return {
      body: `
<p style="text-align: left;">あの<strong>イーハトーヴォ</strong>のすきとおった風</p>
<p style="text-align: left;"><a href="img/icons/mstile-150x150.png">http://localhost:8082/img/icons/mstile-150x150.png</a></p>
<p style="text-align: left;"><img src="img/icons/mstile-150x150.png" alt="" width="119" height="119" /></p>
`,
    }
  },
  computed: {
    // https://oxynotes.com/?p=11177
    tiny_mce_options() {
      return {
        height: 400,
        plugins: [
          'advlist',
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          // "print",
          "preview",
          // "anchor",
          "searchreplace",
          // "visualblocks",
          "code",
          "fullscreen",
          // "insertdatetime",
          "media",
          "table",
          "contextmenu",
          "paste",
          "code",
          "textcolor",
        ],
        toolbar: [
          "undo redo | insert | styleselect | forecolor backcolor | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        ],

        branding: false,    // クレジットを表示する？
        elementpath: false, // ステイタスバーにタグのパスを表示する？(不要なら statusbar: false とした方がいい)
        inline: false,      // クリックしたときに起動する？
        statusbar: false,   // ステイタスバーを表示する？

        //////////////////////////////////////////////////////////////////////////////// https://www.tiny.cloud/docs/plugins/image/

        // 【便利】設定しておくとツールバーの image の選択肢に出てくる
        image_list: [
          {title: "画像名1", value: this.sample_images[0]},
          {title: "画像名2", value: this.sample_images[1]},
        ],

        image_advtab: true,     // 画像張り付けのときにマージンとか指定できる

        relative_urls: false,      // 相対パス OFF
        remove_script_host: false, // ホスト部分の削除 OFF

        // image_prepend_url: "http://localhost:3000/",
      }
    }
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.tinymce_vue_test
</style>
