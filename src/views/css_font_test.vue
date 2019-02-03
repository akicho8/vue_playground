<template lang="pug">
.css_font_test
  h2.title {{current_title}}
  hr

  .columns
    .column
      article.message.is-primary
        .message-header
          | イカモドキ
        .message-body
          .spla_font
            | {{sample_text}}
          a(href="https://aramugi.com/?page_id=807" target="_blank") https://aramugi.com/?page_id=807
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

  link(href="https://fonts.googleapis.com/earlyaccess/nicomoji.css" rel="stylesheet")
  link(href="https://fonts.googleapis.com/earlyaccess/hannari.css" rel="stylesheet")
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
+ ! @ # $ % & ( )
`
    }
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.message-body
  word-break: break-all

//////////////////////////////////////////////////////////////////////////////// 「イカモドキ」フォントの場所がわかるもの
@font-face
  font-family: "SplaFontFace"
  src: url(../assets/ikamodoki/ikamodoki1_0.ttf)

.spla_font
  font-family: "SplaFontFace"   // font-family: "SplaFontFace", "Nico Moji" のようにするとアルファベットは "Nico Moji" を使うようになる
  font-size: 150%

//////////////////////////////////////////////////////////////////////////////// 「ニコもじ」Google Font を使う場合は link を読み込んでこれ
.nico_moji_font
  font-family: "Nico Moji"
  font-size: 150%

//////////////////////////////////////////////////////////////////////////////// 「はんなり」Google Font を使う場合は link を読み込んでこれ
.hannari_font
  font-family: "hannari"
  font-size: 150%
</style>
