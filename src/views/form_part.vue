<template lang="pug">
.field.is-horizontal
  .field-label.is-small
    label.label
      template(v-if="real_value_p")
        span(v-text="form_part.real_name || form_part.name" :title="form_part.name")
      template(v-else)
        span(v-text="form_part.name")
  .field-body
    template(v-if="form_part.display_key")
      .field.is-narrow
        .control
          input(type="checkbox" v-model="inside_value_p")

    .field
      .controll
        template(v-if="form_part.type === 'radio'")
          template(v-for="e in form_part.elems")
            label.radio.is-size-7
              input(type="radio" v-model="inside_value" :value="e.value")
              b-tooltip(:label="e.tooltip" multilined)
                template(v-if="real_value_p")
                  span(v-text="e.value" :title="e.name || e.value")
                template(v-else)
                  span(v-text="e.name || e.value" :title="e.value")

        template(v-if="form_part.type === 'checkbox'")
          template(v-for="e in form_part.elems")
            label.checkbox.is-size-7
              input(type="checkbox" v-model="inside_value" :value="e.value" :disabled="disabled(form_part)")
              b-tooltip(:label="e.tooltip" multilined)
                template(v-if="real_value_p")
                  | {{e.value}}
                template(v-else)
                  | {{e.name || e.value}}

        template(v-if="form_part.type === 'select'")
          .select.is-small
            select(v-model="inside_value" :disabled="disabled(form_part)")
              template(v-for="e in form_part.elems")
                option(:value="e.value")
                  template(v-if="real_value_p")
                    | {{e.value}}
                  template(v-else)
                    | {{e.name || e.value}}

        template(v-if="form_part.type === 'range'")
          input(type="range" v-model.number="inside_value" :min="form_part.params.min" :max="form_part.params.max" :step="form_part.params.step" :disabled="disabled(form_part)")
          span.range_number
            | {{value}}

        template(v-if="form_part.type === 'string'")
          input.input.is-small(type="text" v-model.number="inside_value" :disabled="disabled(form_part)")

        template(v-if="form_part.type === 'text'")
          textarea.textarea.is-small(v-model.number="inside_value" :disabled="disabled(form_part)")
</template>

<script>
export default {
  name: "form_part",
  props: {
    form_part:    { required: true,                  },
    real_value_p: { required: false, default: false, },
    value:        { required: true,                  },
    value_p:      { required: false,                 },
  },
  computed: {
    inside_value: {
      set(v) { this.$emit("update:value", v) },
      get()  { return this.value             },
    },
    inside_value_p: {
      set(v) { this.$emit("update:value_p", v) },
      get()  { return this.value_p             },
    },
  },
  methods: {
    disabled(form_part) {
      return !(!form_part.display_key || this.value_p)
    },
  },
}
</script>

<style scoped lang="sass">
</style>
