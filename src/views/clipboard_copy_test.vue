<template lang="pug">
.clipboard_copy_test
  h2.title {{current_title}}
  hr

  .columns
    .column
      .buttons
        button.button(@click="pc_handle") 1. PCでしか動かなかった方法
        button.button(@click="ios_handle") 2. iPhoneでも動くが言われているがiPhoneでしか動かない方法
        button.button(@click="main_handle") 3. 順番に試す
      .buttons
        button.button(@click="reset_handle") リセット

      .field
        input.input(v-model="input_value")

      p
        div PC: {{pc_retv}}
        div iOS: {{ios_retv}}
        div 結果: {{retv}}

    .column
      .field
        button.button(@click="paste_run") ペースト(うごかん)
      .field
        textarea.textarea(ref="output_dom")

</template>

<script>
export default {
  name: "clipboard_copy_test",
  data() {
    return {
      retv: null,
      pc_retv: null,
      ios_retv: null,
      input_value: null,
    }
  },

  created() {
    this.reset_handle()
  },

  methods: {
    reset_handle() {
      this.input_value = Math.floor(Math.random() * 100000000000000000).toString(36)
      this.retv = null
      this.pc_retv = null
      this.ios_retv = null
    },

    pc_handle() {
      this.reset_handle()
      this.retv = this.copy_to_clipboard_for_pc(this.input_value)
    },

    ios_handle() {
      this.reset_handle()
      this.retv = this.copy_to_clipboard_for_ios(this.input_value)
    },

    main_handle() {
      this.reset_handle()
      this.retv = this.copy_to_clipboard(this.input_value)
    },

    copy_to_clipboard_for_pc(str) {
      const elem = document.createElement("textarea")
      elem.value = str
      document.body.appendChild(elem)

      elem.select()
      const retv = this.copy_exec()
      this.pc_retv = retv

      document.body.removeChild(elem)
      return retv
    },

    copy_to_clipboard_for_ios(str) {
      const elem = document.createElement("textarea")
      elem.value = str
      document.body.appendChild(elem)

      const range = document.createRange()
      range.selectNode(elem)
      window.getSelection().addRange(range)
      const retv = this.copy_exec()
      this.ios_retv = retv
      window.getSelection().removeAllRanges()

      document.body.removeChild(elem)
      return retv
    },

    // PC用で試して失敗したらios用で試す
    copy_to_clipboard(str) {
      let retv = null

      retv = this.copy_to_clipboard_for_pc(str)
      if (!retv) {
        retv = this.copy_to_clipboard_for_ios(str)
      }

      return retv
    },

    copy_exec() {
      let retv = null
      try {
        retv = document.execCommand("copy") // なんの嫌がらせか実際にクリックしていないと動作しないので注意
      } catch(error) {
        alert(`ERROR: ${error}`)
      }
      return retv
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
