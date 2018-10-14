<template lang="pug">
.geo_location
  h1
    | 位置情報取得確認
</template>

<script>
import Vue from 'vue'

export default {
  name: 'geo_location',
  mounted() {
    Vue.prototype.$toast.open("クリップボードにコピーしました")
  },
  data() {
    return {
    }
  },
}
</script>

