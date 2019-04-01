<template lang="pug">
.reactive_test
  h2.title {{current_title}}
  hr

  .field
    button.button(@click="int_var1 = Math.random()") 変数更新
    | {{JSON.stringify(int_var1)}}

  .field
    button.button(@click="$set(hash_var1, 'key1', Math.random())") ハッシュ更新
    | {{JSON.stringify(hash_var1.key1)}}

  .field
    button.button(@click="obj1.write_on('key1', Math.random())") オブジェクト更新
    | {{obj1.hash1.hash2.key1}}

  .field
    button.button(@click="map_var1.set('key1', Math.random())") Map更新(リアクティブにならない)
    | {{JSON.stringify(map_var1.get('key1'))}}
</template>

<script>

import Vue from "vue"

class Object1 {
  constructor() {
    this.hash1 = {
      hash2: {}
    }
  }
  write_on(key, value) {
    Vue.set(this.hash1.hash2, key, value)
  }
}

export default {
  name: "reactive_test",
  data() {
    return {
      int_var1: null,
      hash_var1: {},
      map_var1: new Map(),
      obj1: new Object1(),
    }
  },
  mounted() {
    this.int_var1 = Math.random()
    this.$set(this.hash_var1, "key1", Math.random())
    this.obj1.write_on('key1', Math.random())
    this.map_var1.set("key1", Math.random())
  },
}
</script>
