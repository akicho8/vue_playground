<template lang="pug">
.css_text_var1
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      template(v-for="record in input_elements")
        .field.is-horizontal
          .field-label.is-small
            label.label
              template(v-if="real_value_p")
                span(v-text="record.real_name || record.name" :title="record.name")
              template(v-else)
                span(v-text="record.name")
          .field-body
            template(v-if="record.display_key")
              .field.is-narrow
                .control
                  input(type="checkbox" v-model="$data[record.display_key]")

            .field.is-narrow
              .controll
                template(v-if="record.list")
                  template(v-for="e in record.list")
                    label.radio.is-size-7
                      input(type="radio" v-model="$data[record.key]" :value="e.value")
                      b-tooltip(:label="e.tooltip" multilined)
                        template(v-if="real_value_p")
                          span(v-text="e.value" :title="e.name || e.value")
                        template(v-else)
                          span(v-text="e.name || e.value" :title="e.value")

                template(v-if="record.range")
                  input(type="range" v-model.number="$data[record.key]" :min="record.range.min" :max="record.range.max" :step="record.range.step" :disabled="!(!record.display_key || $data[record.display_key])")
                  span.range_number
                    | {{$data[record.key]}}

                template(v-if="record.text_field")
                  input.input.is-small(type="text" v-model.number="$data[record.key]" :disabled="!(!record.display_key || $data[record.display_key])")

      .buttons
        button.button.is-small(@click="preset_fill") 実行
</template>

<script>
export default {
  name: "css_text_var1",
  title: "Form example",
  data() {
    return {
      real_value_p: false,

      text_var1: null,
      text_var1_p: null,
      radio_var1: null,
      range_var1: null,
      range_var1_p: false,

      input_elements: [
        { key: "text_var1",  name: "テキスト1", real_name: "text_var1",   text_field: {},                           display_key: "text_var1_p", },
        { key: "range_var1", name: "範囲1",     real_name: "range_var1",  range: { min: 0,    max: 800, step: 1, }, display_key: "range_var1_p", },
        {
          key: "radio_var1",
          name: "選択項目",
          list: [
            { name: "選択肢1",  value: "value1", tooltip: "ツールチップ1", },
            { name: "選択肢2",  value: "vlaue2", tooltip: "ツールチップ2", },
          ],
        },
      ],
    }
  },

  created() {
    this.preset_trimming()
  },

  watch: {
  },

  methods: {
    preset_default() {
    },

    preset_fill() {
      // fetch("")
      //   .then(response => response.arrayBuffer())
      //   .then(bin => context.decodeAudioData(bin))
      //   .then(buffer => {
      //     const source = context.createBufferSource()
      //     source.buffer = buffer
      //     source.connect(context.destination)
      //     source.start(0)
      //   })
    },
  },

  computed: {
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.img1
  border: 1px dotted $primary
  background: hsla(0, 0, 0, 0.02)
</style>
