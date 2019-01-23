<template lang="pug">
.vue_script2_test
  h2.title {{$options.title}}
  hr

  .section
    .title 手動で script2 に変換して張り付け
    hr
    .columns
      .column
        <blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">昨年7月から全国12都市で開催されている「第4回スプラトゥーン甲子園」。<br>今週末1/27(日)の闘会議2019で、いよいよ日本一のナワバリバトルチームが決定する！<br>本日から少しずつ、各地区の代表チームをおさらいするぞ！<br>ニコニコ生放送(<a href="https://t.co/PN3f41zbXl">https://t.co/PN3f41zbXl</a>)<br>YouTube(<a href="https://t.co/umcMEi2vSX">https://t.co/umcMEi2vSX</a>) <a href="https://t.co/hpehMonR7N">pic.twitter.com/hpehMonR7N</a></p>&mdash; Splatoon（スプラトゥーン） (@SplatoonJP) <a href="https://twitter.com/SplatoonJP/status/1087641737084858369?ref_src=twsrc%5Etfw">2019年1月22日</a></blockquote>
        <script2 async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script2>

  .section
    .title 自動変換
    hr

    .columns
      .column
        .title 元HTML
        textarea.textarea(v-model="source_body")
      .column
        .title script -> script2 変換
        code(v-text="replaced_body")
      .column
        .title 変換後プレビュー
        div(v-html="replaced_body")

</template>

<script>
// https://www.npmjs.com/package/vue-script2
import Vue from 'vue'
import VS2 from 'vue-script2'

Vue.use(VS2)

export default {
  name: "vue_script2_test",
  title: "scriptタグ埋め込みテスト (vue-script2)",
  data() {
    return {
      source_body: null,
    }
  },
  created() {
    this.source_body = `<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">昨年7月から全国12都市で開催されている「第4回スプラトゥーン甲子園」。<br>今週末1/27(日)の闘会議2019で、いよいよ日本一のナワバリバトルチームが決定する！<br>本日から少しずつ、各地区の代表チームをおさらいするぞ！<br>ニコニコ生放送(<a href="https://t.co/PN3f41zbXl">https://t.co/PN3f41zbXl</a>)<br>YouTube(<a href="https://t.co/umcMEi2vSX">https://t.co/umcMEi2vSX</a>) <a href="https://t.co/hpehMonR7N">pic.twitter.com/hpehMonR7N</a></p>&mdash; Splatoon（スプラトゥーン） (@SplatoonJP) <a href="https://twitter.com/SplatoonJP/status/1087641737084858369?ref_src=twsrc%5Etfw">2019年1月22日</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />`
    // <scirpt></scirpt> の形にすると SyntaxError になるので注意
  },
  computed: {
    replaced_body() {
      // https://www.npmjs.com/package/vue-script2 の変換例より
      const regex = /<!--.*?-->|(?:<(\/)?script([ >]))/gm
      const replacement = (m, p1, p2) => p2 ? `<${p1 || ''}script2${p2}` : m
      return this.source_body.replace(regex, replacement)
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"
</style>
