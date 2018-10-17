<template lang="pug">
div
  .field.is-horizontal(v-for="record in all")
    template(v-if="!record.disabled($parent)")
      .field-label.is-small
        label.label
          a(:href="`https://developer.mozilla.org/ja/docs/Web/CSS/${_.kebabCase(record.key)}`" target="_blank")
            template(v-if="$parent.real_value_p")
              span(v-text="_.kebabCase(record.key)" :title="record.name")
            template(v-else)
              span(v-text="record.name" :title="_.kebabCase(record.key)")
      .field-body
        .field.is-narrow
          .controll
            template(v-if="record.list")
              template(v-for="e in record.list")
                  label.radio.is-size-7
                    input(type="radio" v-model="$parent[record.key]" :value="e.value" :disabled="record.disabled($parent)")
                    template(v-if="$parent.real_value_p")
                      span(v-text="e.value" :title="e.name || e.value" :class="{'has-text-weight-bold': e.value === record.default}")
                    template(v-else)
                      span(v-text="e.name || e.value" :title="e.value" :class="{'has-text-weight-bold': e.value === record.default}")

            template(v-if="record.range")
              input(type="range" v-model.number="$parent[record.key]" :min="record.range.min" :max="record.range.max" step="1")
              span.range_number
                | {{$parent[record.key]}}
</template>

<script>
export default {
  name: "css_flexbox_inputs",
  props: ["all"],
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
</style>
