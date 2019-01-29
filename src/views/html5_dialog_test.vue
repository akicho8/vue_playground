<template lang="pug">
.html5_dialog_test
  h2.title {{current_title}}
  hr

  .columns
    .column
      dialog(ref="dialog1")
        form(method="dialog")
          .buttons
            button.button(type="submit" value="yes") はい
            button.button(type="submit" value="no") いいえ
      button.button(@click="dialog1_show") はい / いいえ → {{dialog1_retv}}
      .content
        ul
          li form(method="dialog") で submit の value が returnValue に設定される

    .column
      dialog(ref="dialog2")
        button.button(@click="dialog2_ok") OK
      button.button(@click="dialog2_show") ダイアログの外側を押すと閉じる例 → {{dialog2_retv}}
      .content
        ul
          li 厳密にはダイアログ内の隙間をクリックしても閉じてしまう

</template>

<script>
export default {
  name: "html5_dialog_test",
  data() {
    return {
      dialog1_retv: null,
      dialog2_retv: null,
    }
  },

  mounted() {
    ////////////////////////////////////////////////////////////////////////////////

    this.$refs.dialog1.addEventListener("close", (event) => {
      this.dialog1_retv = event.target.returnValue
    })

    ////////////////////////////////////////////////////////////////////////////////

    this.$refs.dialog2.addEventListener("click", (event) => {
      if (event.target === this.$refs.dialog2) {
        event.target.close("外側を押した")
      }
    })
    this.$refs.dialog2.addEventListener("close", (event) => {
      this.dialog2_retv = event.target.returnValue
    })
  },

  methods: {
    dialog1_show() {
      this.$refs.dialog1.showModal()
    },

    ////////////////////////////////////////////////////////////////////////////////
    dialog2_show() {
      this.$refs.dialog2.showModal()
    },
    dialog2_ok() {
      this.$refs.dialog2.close("ok")
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.html5_dialog_test
</style>
