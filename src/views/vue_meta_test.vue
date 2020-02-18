<template lang="pug">
.vue_meta_test
  h2.title {{current_title}}
  hr

  .columns
    .column
      .field
        button.button(@click="button_handle1") 確認
      .field
        | title: {{JSON.stringify(doc_title)}}

    .column

</template>

<script>

export default {
  name: "vue_meta_test",
  metaInfo: {
    title: '(metaInfo.title)',
    link: [
      // { vmid: "apple-touch-icon", rel: "apple-touch-icon", href: require("@/assets/splatoon2_weapon_quiz.png"), },
      // { vmid: "favicon",          rel: "icon",             href: require("@/assets/splatoon2_weapon_quiz.png"), },
    ],
  },

  data() {
    return {
      doc_title: null,
    }
  },

  created() {
  },

  mounted() {
    this.button_handle1()
  },

  watch: {
  },

  methods: {
    button_handle1() {
      this.doc_title = document.title
      console.log(document.querySelector("head"))
    },
  },

  computed: {
  },
}
</script>
