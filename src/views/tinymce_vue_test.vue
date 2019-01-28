<template lang="pug">
.tinymce_vue_test
  h2.title {{current_title}}
  hr

  .columns
    .column
      TinyMceEditor(api-key="" v-model="body" :init="tiny_mce_options" ref="tinymce_dom")
      .field
        a(href="https://www.tiny.cloud/docs/" target="_blank") https://www.tiny.cloud/docs/

    .column
      b-message.is-primary(title="HTML" type="" :closable="false")
        | {{body}}
      b-message.is-primary(title="プレビュー" type="" :closable="false")
        div(v-html="body" key="a")
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

//////////////////////////////////////////////////////////////////////////////// vue-script2

// https://www.npmjs.com/package/vue-script2
import Vue from 'vue'
import VueScript2 from 'vue-script2'

Vue.use(VueScript2)

export default {
  name: "tinymce_vue_test",
  components: {
    TinyMceEditor,
  },
  data() {
    return {
//       body: `
// <div>
// <blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">昨年7月から全国12都市で開催されている「第4回スプラトゥーン甲子園」。<br>今週末1/27(日)の闘会議2019で、いよいよ日本一のナワバリバトルチームが決定する！<br>本日から少しずつ、各地区の代表チームをおさらいするぞ！<br>ニコニコ生放送(<a href="https://t.co/PN3f41zbXl">https://t.co/PN3f41zbXl</a>)<br>YouTube(<a href="https://t.co/umcMEi2vSX">https://t.co/umcMEi2vSX</a>) <a href="https://t.co/hpehMonR7N">pic.twitter.com/hpehMonR7N</a></p>&mdash; Splatoon（スプラトゥーン） (@SplatoonJP) <a href="https://twitter.com/SplatoonJP/status/1087641737084858369?ref_src=twsrc%5Etfw">2019年1月22日</a></blockquote>
// <script2 async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
// </div>
//
// <p style="text-align: left;">あの<strong>イーハトーヴォ</strong>のすきとおった風</p>
// <p style="text-align: left;"><a href="img/icons/mstile-150x150.png">http://localhost:8082/img/icons/mstile-150x150.png</a></p>
// <p style="text-align: left;"><img src="img/icons/mstile-150x150.png" alt="" width="119" height="119" /></p>
// `,

      body: `<div>
<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">昨年7月から全国12都市で開催されている「第4回スプラトゥーン甲子園」。<br>今週末1/27(日)の闘会議2019で、いよいよ日本一のナワバリバトルチームが決定する！<br>本日から少しずつ、各地区の代表チームをおさらいするぞ！<br>ニコニコ生放送(<a href="https://t.co/PN3f41zbXl">https://t.co/PN3f41zbXl</a>)<br>YouTube(<a href="https://t.co/umcMEi2vSX">https://t.co/umcMEi2vSX</a>) <a href="https://t.co/hpehMonR7N">pic.twitter.com/hpehMonR7N</a></p>&mdash; Splatoon（スプラトゥーン） (@SplatoonJP) <a href="https://twitter.com/SplatoonJP/status/1087641737084858369?ref_src=twsrc%5Etfw">2019年1月22日</a></blockquote>
<script2 async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
</div>
`,

    }
  },

  created() {
    // これを入れると一応動く
    VueScript2.load('https://platform.twitter.com/widgets.js').then(() => console.log("VueScript2.load: OK"))
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
          "undo redo | insert | styleselect | forecolor backcolor | fontsizeselect bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code preview",
        ],

        // 必須の設定
        relative_urls: false,      // 相対パス OFF
        remove_script_host: false, // ホスト部分の削除 OFF

        branding: false,           // クレジットを表示する？
        elementpath: true,         // ステイタスバーにタグのパスを表示する？(不要なら statusbar: false とした方がいい)
        inline: false,             // クリックしたときに起動する？
        statusbar: false,          // ステイタスバーを表示する？

        // http://blog.yuhiisk.com/archive/2017/05/11/tiny-mce-before-init-setting.html
        valid_elements: '*[*]',          // 知らないタグを消さないようにする
        extended_valid_elements: '*[*]', // 知らないタグを消さないようにする

        // https://oxynotes.com/?p=11236
        forced_root_block: false,  // 「enter で p」と「shift + enter で br」の組み合わせを逆にする

        // forced_root_block_attrs: "class",
        // forced_root_block: "div",

        // $init_array['valid_children'] = '+a[' . implode( '|', array_keys( $allowedposttags ) ) . ']'; //aタグ内にすべてのタグを入れられるように
        // $init_array['indent'] = true; //インデントを有効に
        // wpautop: false,          // テキストやインライン要素を自動的にpタグで囲む機能を無効に
        // force_p_newlines: false, // 改行したらpタグを挿入する機能を無効に

        fontsize_formats: '50% 75% 100% 125% 150%',
        // fontsize_formats: "超小さい=60% 小さい=75% 普通=100% 大きい=125% 超大きい=150%",
        // content_style: ".mce-content-body {font-size:75;font-family:Arial,sans-serif;}",
        // content_style: ".mce-content-body {font-size:75%}",

        setup(o) {
          o.on('init', () => {
            // this.execCommand("fontName", false, "tahoma");
            o.execCommand("fontSize", false, "100%");
          })
        },

        // https://masshiro.blog/tinymce-table-resize/
        table_resize_bars: false,
        object_resizing: "img", // videoタグにサイズが付与されるのを防ぐ(しかしimgにするとvideoにも適用されてしまう)

        //////////////////////////////////////////////////////////////////////////////// https://www.tiny.cloud/docs/plugins/image/

        // 【便利】設定しておくとツールバーの image の選択肢に出てくる
        image_list: [
          {title: "画像名1", value: this.sample_images[0]},
          {title: "画像名2", value: this.sample_images[1]},
        ],

        image_advtab: true,     // 画像張り付けのときにマージンとか指定できる

        // image_prepend_url: "http://localhost:3000/",
      }
    }
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.tinymce_vue_test

// .mce-content-body
//   font-size: 50px !important

</style>
