<template lang="pug">
.vue_slot_test
  h2.title {{current_title}}
  hr

  foo
    //- かならず slot 名前を合わせること。複数あると呼ばれた順番によって props の内容がかわってしまう
    template(slot="v2")
      | v2 2
    template(slot="v4" slot-scope="props")
      | v4 {{props.v3}} {{props.v4}}
    template(slot="v3" slot-scope="props")
      | v3 {{props.v3}} {{props.v4}}

</template>

<script>

export default {
  name: "vue_slot_test",
  components: {
    foo: {
      template: `
<div>
  <slot name="v1">v1 1</slot><br>
  <slot name="v2">?</slot><br>
  <slot name="v3" v3="3">?</slot><br>
  <slot name="v4" v4="4">?</slot><br>
</div>`,
    },
  },
}
</script>
