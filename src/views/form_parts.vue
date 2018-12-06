<template lang="pug">
.field
  //- ↑ 囲みたくないけど vue の仕様のため。div だとマージンされない
  template(v-for="form_part in $parent.form_parts")
    form_part(:form_part="form_part" :value.sync="$parent.$data[form_part.key]" :value_p.sync="$parent.$data[form_part.display_key]")
</template>

<script>
import form_part from "./form_part.vue"

export default {
  name: "form_parts",
  components: {
    form_part,
  },
  props: {
  },
}
</script>

<style scoped lang="sass">
</style>
