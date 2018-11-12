<template lang="pug">
.general_form_template
  .h2.title {{$options.title}}
  hr

  .section
    .buttons
      a.button.is-info(href="https://bulma.io/documentation/form/general/" target="_blank") Bulma Form General
      a.button.is-info(href="https://buefy.github.io/#/documentation/start" target="_blank") Buefy Documentation

  .title.is-5 パスワード
  hr
  .section
    .field.is-horizontal
      .field-label.is-large
        label.label パスワード
      .field-body
        .field
          p.control.is-large
            input.input.is-large(type="password" v-model="my_password" placeholder="")
          p.help
            button.button.is-small(@click="password_set") パスワード生成

  .title.is-5 お名前
  hr
  .section
    .field.is-horizontal
      .field-label.is-large
        label.label 氏名
      .field-body
        .field
          p.control.is-large.is-expanded.has-icons-left
            input.input.is-large(type="text" placeholder="姓")
            span.icon.is-small.is-left
              i.fas.fa-user
        .field
          p.control.is-large.is-expanded.has-icons-left
            input.input.is-large(type="text" placeholder="名")
            span.icon.is-small.is-left
              i.fas.fa-user
    .field.is-horizontal
      .field-label.is-large
        label.label ふりがな
      .field-body
        .field
          p.control.is-large.is-expanded.has-icons-left
            input.input.is-large(type="text" placeholder="せい")
            span.icon.is-small.is-left
              i.fas.fa-user
        .field
          p.control.is-large.is-expanded.has-icons-left
            input.input.is-large(type="text" placeholder="めい")
            span.icon.is-small.is-left
              i.fas.fa-user

  .title.is-5 ご連絡先
  hr
  .section
    .field.is-horizontal
      .field-label.is-large
        label.label 電話番号
      .field-body
        .field.is-expanded
          .field.has-addons
            p.control
              a.button.is-large.is-static +44
            p.control.is-expanded
              input.input.is-large(type="tel" placeholder="090-1234-5678")
          p.help Do not enter the first zero

    .field.is-horizontal
      .field-label.is-large
        label.label 電話番号
      .field-body
        .field
          p.control.is-large
            input.input.is-large(type="text" placeholder="090")
        p.control.is-size-3
          | -
        .field
          p.control.is-large
            input.input.is-large(type="text" placeholder="1234")
        p.control.is-size-3
          | -
        .field
          p.control.is-large
            input.input.is-large(type="text" placeholder="5678")

    .field.is-horizontal
      .field-label.is-large
        label.label 電話番号
      .field-body
        .field.has-addons
          p.control.is-large
            input.input.is-large(type="text" placeholder="090")
          p.control
            .is-size-3 -
          p.control.is-large
            input.input.is-large(type="text" placeholder="090")
          p.control
            .is-size-3 -
          p.control.is-large
            input.input.is-large(type="text" placeholder="090")

    .field.is-horizontal
      .field-label.is-large
        label.label 電話番号
      .field-body
        .field.has-addons
          p.control.is-large
            input.input.is-large(type="text" placeholder="090")
          p.control
            a.button.is-large.is-static -
          p.control.is-large
            input.input.is-large(type="text" placeholder="090")
          p.control
            a.button.is-large.is-static -
          p.control.is-large
            input.input.is-large(type="text" placeholder="090")

    .field.is-horizontal
      .field-label.is-large
        label.label 電話番号
      .field-body
        .field.is-expanded
          .field.is-grouped
            p.control.is-large
              input.input.is-large(type="text" placeholder="090")
            p.control
              span.is-size-3 -
            p.control.is-large
              input.input.is-large(type="text" placeholder="090")
            p.control
              span.is-size-3 -
            p.control.is-large
              input.input.is-large(type="text" placeholder="090")
          .field
            | 横幅に連動しない

    .field.is-horizontal
      .field-label.is-large
        label.label メールアドレス
      .field-body
        .field.is-expanded
          p.control.has-icons-left.has-icons-right
            input.input.is-large(type="email" placeholder="your-name@gmail.com")
            span.icon.is-small.is-left
              i.fas.fa-envelope
            span.icon.is-small.is-right
              i.fas.fa-check
          p.help 右端にチェックがあるパターン

    .field.is-horizontal
      .field-label.is-large
        label.label 確認用メールアドレス
      .field-body
        .field.is-expanded
          p.control.has-icons-left.has-icons-right
            input.input.is-large(type="email" placeholder="your-name@gmail.com")
            span.icon.is-small.is-left
              i.fas.fa-envelope
            span.icon.is-small.is-right
              i.fas.fa-check
          p.help メールアドレスが一致したら右端にチェックが付く

  .title.is-5 ご意見
  hr
  .section

    .field.is-horizontal
      .field-label.is-large
        label.label 製品名

      .field-body
        .field.is-narrow
          .control
            .select.is-fullwidth.is-large
              select
                option プレイステーション4
                option Nintendo Switch
                option セガサターン

    .field.is-horizontal
      .field-label.is-large
        label.label 件名
      .field-body
        .field
          .control
            input.input.is-large.is-danger(type="text" placeholder="e.g. Partnership opportunity")
          p.help.is-danger
            | 入力されていません

    .field.is-horizontal
      .field-label.is-large.is-normal
        label.label 内容

      .field-body
        .field
          .control
            textarea.textarea.is-large(placeholder="詳しく入力してください" rows="10")

    .field.is-horizontal
      .field-label.is-large
        label.label 返信
      .field-body
        .field.is-narrow
          .control
            .field-label.is-large
              label.radio
                input(type="radio" name="member")
                | 必要

              label.radio
                input(type="radio" name="member")
                | 不要

  hr
  .section
    .field.is-horizontal
      .field-label.is-large
        //- Left empty for spacing
      .field-body
        .field
          .control
            button.button.is-primary
              | 送信
</template>

<script>
export default {
  name: "general_form_template",
  title: "一般向けフォームテンプレート",
  data() {
    return {
      my_password: null,
    }
  },

  created() {
    this.all_reset()
  },

  watch: {
  },

  methods: {
    password_set() {
      this.my_password = this.password_generate()
    },
    password_generate() {
      return Math.floor(Math.random() * 100000000000000000).toString(36)
    },
  },

  computed: {
  },
}
</script>

<style scoped lang="sass">
.general_form_template
</style>
