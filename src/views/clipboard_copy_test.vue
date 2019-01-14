<template lang="pug">
.clipboard_copy_test
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      .buttons
        button.button(@click="copy1_handle") 1. PCでしか動かないと言われている方法1
        button.button(@click="copy2_handle") 2. iPhoneでも動くと言われている方法2
      .buttons
        button.button(@click="reset_handle") リセット

      .field
        input.input(v-model="input_value")

      p
        | document.execCommand("copy") の結果 → {{retval}}

    .column
      .field
        button.button(@click="paste_run") ペースト
      .field
        textarea.textarea(ref="output_dom")

</template>

<script>
export default {
  name: "clipboard_copy_test",
  title: "クリップボードへのコピー",
  data() {
    return {
      retval: null,
      input_value: null,
    }
  },
  methods: {
    reset_handle() {
      this.input_value = Math.floor(Math.random() * 100000000000000000).toString(36)
      this.retval = null
    },

    copy2_handle() {
      const elem = document.createElement("textarea")
      elem.value = this.input_value
      document.body.appendChild(elem)

      const range = document.createRange()
      range.selectNode(elem)
      window.getSelection().addRange(range)
      this.copy_exec()
      window.getSelection().removeAllRanges()

      document.body.removeChild(elem)
    },

    copy1_handle() {
      const elem = document.createElement("textarea")
      elem.value = this.input_value
      document.body.appendChild(elem)
      elem.select()
      this.copy_exec()
      document.body.removeChild(elem)
    },

    copy_exec() {
      this.retval = null
      try {
        this.retval = document.execCommand("copy") // なんの嫌がらせか実際にクリックしていないと動作しないので注意
      } catch(err) {
        alert("ERROR")
      }
    },

    paste_run() {
      this.$refs.output_dom.focus()
      document.execCommand("paste") // うごかない？
      console.log(this.$refs.output_dom.textContent)
    },

  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"
.clipboard_copy_test
</style>
