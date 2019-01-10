<template lang="pug">
.sass_test
  .h2.title {{$options.title}}
  hr

  b-message(title="SASS" type="" :closable="false")
    textarea.textarea(v-model.trim="sass_body")
  template(v-if="css_error !== null")
    b-message(title="変換失敗" type="is-danger" :closable="false")
      | {{css_error}}
  template(v-if="css_body !== null")
    b-message(title="CSS" :closable="false")
      | {{css_body}}
</template>

<script>
const sass = require('sass')

export default {
  name: "sass_test",
  title: "SassTest",
  data() {
    return {
      sass_body: null,
      css_body: null,
      css_error: null,
    }
  },
  created() {
    console.log(location.hash)
    if (location.hash) {
      let s = location.hash
      s = s.replace(/^#/, "")
      this.sass_body = decodeURIComponent(s)
    } else {
      this.sass_body = `body { color: blue; };`
    }
  },
  watch: {
    sass_body() {
      location.hash = this.sass_body

      // , indentedSyntax: false
      sass.render({data: this.sass_body}, (error, result) => {
        if (error) {
          this.css_error = error
        } else {
          this.css_body = result.css.toString()
        }
      })
    },
  },
}
</script>
