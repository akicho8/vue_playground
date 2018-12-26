export default {
  data() {
    return {
      stdout: null,
    }
  },
  created() {
    this.console_log_replace()
  },
  destroyed() {
    this.console_log_restore()
  },
  methods: {
    // console.log を window.old_console_log に退避して
    // 元の挙動で入ってきた文字列を奪う
    console_log_replace() {
      if (typeof window.old_console_log === 'undefined') {
        window.old_console_log = console.log
        const vm = this
        console.log = function() {
          window.old_console_log.apply(null, arguments)

          let s = Array.prototype.slice.call(arguments).join(" ")
          s = s.replace(/\n/g, "<br>")
          vm.stdout = (vm.stdout || "") + s
        }
      }
    },
    // 書き換えた console.log を元に戻す
    console_log_restore() {
      if (typeof window.old_console_log !== 'undefined') {
        console.log = window.old_console_log
        delete window.old_console_log
      }
    },
  },
}
