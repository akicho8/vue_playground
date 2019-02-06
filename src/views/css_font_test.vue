<template lang="pug">
.css_font_test
  h2.title {{current_title}}
  hr

  .columns
    .column
      article.message.is-primary
        .message-header
          | Project Paintball
        .message-body
          .project_paintball_font
            | {{sample_text}}
          a(href="http://fizzystack.web.fc2.com/paintball-ja.html" target="_blank") http://fizzystack.web.fc2.com/paintball-ja.html

    .column
      article.message.is-primary
        .message-header
          | イカモドキ
        .message-body
          .ikamodoki_font
            | {{sample_text}}
          a(href="https://aramugi.com/?page_id=807" target="_blank") https://aramugi.com/?page_id=807

    .column
      article.message.is-primary
        .message-header
          | M PLUS Rounded 1c
        .message-body
          .m_plus_font
            | {{sample_text}}
          a(href="https://fonts.google.com/?subset=japanese&selection.family=M+PLUS+Rounded+1c:700" target="_blank") https://fonts.google.com/?subset=japanese&selection.family=M+PLUS+Rounded+1c:700
    .column
      article.message.is-primary
        .message-header
          | Project Paintball + イカモドキ + M PLUS Rounded 1c
        .message-body
          .spla_font
            | {{sample_text}}
  .columns
    .column
      article.message.is-primary
        .message-header
          | ニコもじ
        .message-body
          .nico_moji_font
            | {{sample_text}}
          a(href="https://googlefonts.github.io/japanese/#nicomoji" target="_blank") https://googlefonts.github.io/japanese/#nicomoji
    .column
      article.message.is-primary
        .message-header
          | はんなり
        .message-body
          .hannari_font
            | {{sample_text}}
          a(href="https://googlefonts.github.io/japanese/#hannari" target="_blank") https://googlefonts.github.io/japanese/#hannari

  //- link(href="https://fonts.googleapis.com/earlyaccess/nicomoji.css" rel="stylesheet")
  //- link(href="https://fonts.googleapis.com/earlyaccess/hannari.css" rel="stylesheet")
</template>

<script>
import dayjs from "dayjs"
import form_parts from "./form_parts.vue"

export default {
  name: "css_font_test",
  data() {
    return {
      sample_text: `
あいうえお スプラトゥーン 漢字
0123456789
０１２３４５６７８９
abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ
ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ
+ - ! @ # $ % & ( )
`
    }
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

@import url("https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:700")
@import url("https://fonts.googleapis.com/earlyaccess/nicomoji.css")
@import url("https://fonts.googleapis.com/earlyaccess/hannari.css")

.message-body
  word-break: break-all

//////////////////////////////////////////////////////////////////////////////// イカモドキ
@font-face
  font-family: "IkamodokiFontFace"
  src: url(../assets/ikamodoki/ikamodoki1_0.ttf)

//////////////////////////////////////////////////////////////////////////////// project_paintball
@font-face
  font-family: "ProjectPaintballFontFace"
  src: url(../assets/project_paintball/project_paintball_beta_4_by_japanyoshi-d93slk4.otf)
  // これは project_paintball にあったものだけど公式のなので使ってはならん
  // src: url(../assets/project_paintball/Splatoon1.otf)
  // src: url(../assets/project_paintball/Splatoon2.otf)

.ikamodoki_font
  font-family: "IkamodokiFontFace"   // font-family: "IkamodokiFontFace", "Nico Moji" のようにするとアルファベットは "Nico Moji" を使うようになる
  font-size: 150%

//////////////////////////////////////////////////////////////////////////////// ニコもじ
.nico_moji_font
  font-family: "Nico Moji"
  font-size: 150%

//////////////////////////////////////////////////////////////////////////////// はんなり
.hannari_font
  font-family: "hannari"
  font-size: 150%

//////////////////////////////////////////////////////////////////////////////// 「M PLUS Rounded 1c」Google Font。@import で読み込む方法をつかっている
.m_plus_font
  font-family: "M PLUS Rounded 1c", sans-serif
  font-size: 150%

//////////////////////////////////////////////////////////////////////////////// 「M PLUS Rounded 1c」Google Font。@import で読み込む方法をつかっている
.project_paintball_font
  font-family: "ProjectPaintballFontFace", sans-serif
  font-size: 150%

//////////////////////////////////////////////////////////////////////////////// 合成
.spla_font
  font-family: "ProjectPaintballFontFace", "IkamodokiFontFace", "M PLUS Rounded 1c", sans-serif
  font-size: 150%
</style>
