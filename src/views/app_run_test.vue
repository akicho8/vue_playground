<template lang="pug">
.app_run_test
  h2.title {{current_title}}
  hr
  .buttons
    a.button(href="prefs:root=Photos") カメラ
    a.button(href="prefs:root=LOCATION_SERVICES") 位置情報サービス
    a.button(href="calshow:") カレンダー
    a.button(href="photos-redirect:") photos-redirect
</template>

<script>
export default {
  name: "app_run_test",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
  .app_run_test
</style>
