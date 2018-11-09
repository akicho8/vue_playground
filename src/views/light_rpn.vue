<template lang="pug">
.light_rpn
  .h2.title {{$options.title}}
  hr

  // @keyup.enter にすると改行するまで待つので長い数字も入力できる
  input.input(v-model.trim="str" @keyup="run" autofocus)
  template(v-for="e in [...stack].reverse()")
    input.input(:value="e" readonly)

</template>

<script>
export default {
  name: "light_rpn",
  title: "逆ポーランド電卓",

  data() {
    return {
      str: "",
      stack: [],
    }
  },

  methods: {
    run() {
      if (this.str != "") {
        if (/\d+/.test(this.str)) {
          this.stack.push(this.str)
        } else {
          const left = this.stack.pop()
          const right = this.stack.pop()
          this.stack.push(eval(`${left}${this.str}${right}`))
        }
        this.str = ""
      }
    },
  },
}
</script>
