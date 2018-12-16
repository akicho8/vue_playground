<template lang="pug">
.lzma_package_test
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      b-message(title="入力" type="is-primary" :closable="false")
        textarea.textarea.input_str1(v-model.trim="input_str1")

    .column
      b-message(title="圧縮後配列" type="" :closable="false")
        | {{enc_array}}
      b-message(title="バイナリ化" type="" :closable="false")
        | {{enc_string}}
      b-message.base64(title="BASE64" type="" :closable="false")
        | {{enc_base64}}
      b-message(title="復元" type="is-primary" :closable="false")
        | {{dec_str1}}

      template(v-if="enc_error")
        b-message(title="エラー" type="is-danger" :closable="false")
          | {{enc_error}}

</template>

<script>
import { LZMA } from "lzma/src/lzma_worker-min.js"

export default {
  name: "lzma_package_test",
  title: "圧縮復元 (lzma)",
  data() {
    return {
      input_str1: "",

      enc_error: null,
      enc_base64: null,
      enc_array: null,
      enc_string: null,

      dec_params: null,
      dec_str1: null,
    }
  },

  created() {
    this.input_str1 = "親譲りの無鉄砲で小供の時から損ばかりしている"
  },

  watch: {
    input_str1() {
      const input_params = {input_str1: this.input_str1}
      const enc_json = JSON.stringify(input_params)

      LZMA.compress(enc_json, 9, (result, error) => {
        this.enc_error = error

        this.enc_base64 = null
        this.enc_array = null
        this.enc_string = null
        this.dec_params = null
        this.dec_str1 = null

        if (!this.enc_error) {
          this.enc_array = result
          this.enc_string = String.fromCharCode(...new Uint8Array(result)) // String.fromCharCode.apply(null, new Uint8Array(result)) と同じっぽい
          this.enc_base64 = btoa(this.enc_string)

          const dec_string = atob(this.enc_base64)
          const dec_json = LZMA.decompress(dec_string.split("").map(c => c.charCodeAt(0)))
          this.dec_params = JSON.parse(dec_json)
          this.dec_str1 = this.dec_params["input_str1"]
        }
      })
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"
.lzma_package_test
  .input_str1
    height: 50vh
  .base64
    word-break: break-all
</style>
