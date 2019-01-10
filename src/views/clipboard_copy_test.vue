<template lang="pug">
.clipboard_copy_test
  .h2.title {{$options.title}}
  hr

  .buttons
    button.button(@click="copy1_handle") 既存の dom を addRange する方法でコピー
    button.button(@click="copy2_handle") テキストエリアを作って選択状態にする方法でコピー
  .buttons
    button.button(@click="reset_handle") リセット

  .box(ref="text_elem") {{window.location.href}}
  //- input.input(ref="text_elem" :value="window.location.href")
  div
    | document.execCommand("copy") の戻値: {{retval}}
</template>

<script>
export default {
  name: "clipboard_copy_test",
  title: "クリップボードへのコピー",
  data() {
    return {
      retval: null,
    }
  },
  methods: {
    reset_handle() {
      this.retval = null
    },

    copy1_handle() {
      const range = document.createRange()
      range.selectNode(this.$refs.text_elem)
      window.getSelection().addRange(range)
      this.copy_exec()
      window.getSelection().removeAllRanges()
    },

    copy2_handle() {
      const elem = document.createElement("textarea")
      elem.value = location.href
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
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"
.clipboard_copy_test
</style>
