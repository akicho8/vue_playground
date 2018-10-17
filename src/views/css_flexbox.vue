<template lang="pug">
.css_flexbox
  h2.title CSS Flexbox
  hr

  .container_wrap
    .container(:style="container_style")
      .container_text.has-text-grey-light.is-size-7
        | .container
      .item(v-for="i in box_count" :class="item_class(i)" @click="active_toggle(i)" :style="item_style(i)" v-text="i")

  section
    .box
      css_flexbox_inputs(:all="parent_elems")

      template(v-if="active_item")
        hr
        css_flexbox_inputs(:all="child_elems")

    .field.is-horizontal
      .field-label.is-small
        label.label
          | 個数
      .field-body
        .field
          .control
            input(type="range" v-model.number="box_count" min="1" max="50" step="1")
            span.range_number
              | {{box_count}}

    .field.is-horizontal
      .field-label.is-small
        label.label
          | サイズ
      .field-body
        .field.has-addons.is-narrow
          p.control
            span.button.is-static.is-small
              | 親
          p.control
            input.input.is-small(type="text" v-model.trim="parent_w" placeholder="w" size="4")
          p.control
            input.input.is-small(type="text" v-model.trim="parent_h" placeholder="h" size="4")

        .field.has-addons.is-narrow
          p.control
            span.button.is-static.is-small
              | 子
          p.control
            input.input.is-small(type="text" v-model.trim="item_w" placeholder="w" size="4")
          p.control
            input.input.is-small(type="text" v-model.trim="item_h" placeholder="h" size="4")

    .field.is-horizontal
      .field-label.is-small
        label.label
      .field-body

        .field.is-narrow
          .control
            label.checkbox
              input(type="checkbox" v-model="real_value_p")
              span.is-size-7
                | 実際の値

        .field.is-narrow
          .control
            label.checkbox
              input(type="checkbox" v-model="show_all_p")
              span.is-size-7
                | 初期値も表示

        .field.is-narrow
          .control
            a.button.is-small(@click="var_reset")
              | リセット

  pre.is-size-6(v-text="flex_css")

  .content.is-size-7
    ul
      li 子にサイズが指定されていると「伸」びない
      li 並び「↓」のとき3時の方向を上と考えると理解しやすい
      li 並び「↑」のときは9時の方向
      li 折り返さないとき「行」の効果なし

</template>

<script>
import css_flexbox_inputs from "./css_flexbox_inputs"

export default {
  name: 'css_flexbox',
  components: {
    css_flexbox_inputs,
  },
  data() {
    return {
      box_count: 24,
      real_value_p: false,
      active_item: null,
      show_all_p: false,
      parent_w: "640",
      parent_h: "240",
      item_w: "",
      item_h: "",

      // 親
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignItems: "center",
      alignContent: "stretch",

      // 子
      order: 0,
      flexGrow: "0",
      flexShrink: "1",
      flexBasis: "auto",
      alignSelf: "auto",

      parent_elems: [
        {
          key: "flexDirection",
          name: "並び",
          disabled: () => false,
          default: "row",
          list: [
            { value: "row",            name: "→", },
            { value: "row-reverse",    name: "←", },
            { value: "column",         name: "↓", },
            { value: "column-reverse", name: "↑", },
          ],
        },
        {
          key: "flexWrap",
          name: "折り返し",
          disabled: () => false,
          default: "nowrap",
          list: [
            { value: "nowrap",       name: "無", },
            { value: "wrap",         name: "↓", },
            { value: "wrap-reverse", name: "↑", },
          ],
        },
        {
          key: "justifyContent",
          name: "X",
          disabled: () => false,
          default: "flex-start",
          list: [
            { value: "flex-start",    name: "左", },
            { value: "center",        name: "中", },
            { value: "space-between", name: "端", },
            { value: "space-around",  name: "散", },
            { value: "flex-end",      name: "右", },
          ],
        },
        {
          key: "alignItems",
          name: "Y",
          disabled: () => false,
          default: "stretch",
          list: [
            { value: "stretch",    name: "伸",   },
            { value: "flex-start", name: "上",   },
            { value: "baseline",   name: "上隙", },
            { value: "center",     name: "中",   },
            { value: "flex-end",   name: "下",   },
          ],
        },
        {
          key: "alignContent",
          name: "行",
          disabled: e => e.flexWrap === "nowrap",
          default: "stretch",
          list: [
            { value: "stretch",       name: "伸", },
            { value: "center",        name: "中", },
            { value: "flex-start",    name: "上", },
            { value: "flex-end",      name: "下", },
            { value: "space-around",  name: "散", },
            { value: "space-between", name: "端", },
          ],
        },
      ],

      child_elems: [
        {
          key: "order",
          name: "順",
          disabled: () => false,
          default: 0,
          range: {
            min: -3,
            max: 3,
          },
        },
        {
          key: "alignSelf",
          name: "Y",
          description: "alignItems は全体だが alignSelf は個別に設定する",
          disabled: () => false,
          default: "auto",
          list: [
            { value: "auto",       name: "自動"  },
            { value: "stretch",    name: "伸",   },
            { value: "flex-start", name: "上",   },
            { value: "baseline",   name: "上隙", },
            { value: "center",     name: "中",   },
            { value: "flex-end",   name: "下",   },
          ],
        },
        {
          key: "flexGrow",
          name: "膨率",
          disabled: () => false,
          default: "0",
          list: [
            { value: "0", },
            { value: "1", },
            { value: "2", },
            { value: "3", },
            { value: "4", },
            { value: "5", },
          ],
        },
        {
          key: "flexShrink",
          name: "縮率",
          disabled: () => false,
          default: "1",
          list: [
            { value: "0", },
            { value: "1", },
            { value: "2", },
            { value: "3", },
            { value: "4", },
            { value: "5", },
          ],
        },
        {
          key: "flexBasis",
          name: "幅",
          disabled: () => false,
          default: "auto",
          list: [
            { value: "auto", },
            { value: "0%",   },
            { value: "25%",  },
            { value: "50%",  },
            { value: "75%",  },
            { value: "100%", },
          ],
        },
      ],
    }
  },

  methods: {
    item_class(i) {
      const list = [
        `size${(i - 1) % 3}`,
      ]
      if (this.active_item === i) {
        list.push("has-background-primary")
      }
      return list
    },

    active_toggle(i) {
      if (this.active_item === i) {
        this.active_item = null
      } else {
        this.active_item = i
      }
    },

    item_style(i) {
      const hash = {}
      if (this.item_w !== "") {
        hash.width = `${this.item_w}px`
      }
      if (this.item_h !== "") {
        hash.height = `${this.item_h}px`
      }
      if (this.active_item === i) {
        Object.assign(hash, {
          order:      this.order,
          alignSelf:  this.alignSelf,
          flexGrow:   this.flexGrow,
          flexShrink: this.flexShrink,
          flexBasis:  this.flexBasis,
        })
      }
      return hash
    },

    var_reset() {
      [...this.parent_elems, ...this.child_elems].forEach(e => this[e.key] = e.default)
    },
  },

  computed: {
    container_style() {
      const hash = {}
      if (this.parent_w !== "") {
        hash.width = `${this.parent_w}px`
      }
      if (this.parent_h !== "") {
        hash.height = `${this.parent_h}px`
      }
      Object.assign(hash, {
        flexDirection:  this.flexDirection,
        flexWrap:       this.flexWrap,
        justifyContent: this.justifyContent,
        alignItems:     this.alignItems,
        alignContent:   this.alignContent,
      })
      return hash
    },

    flex_css() {
      let str = ""
      str += `.container\n`
      str += `  display: flex\n`
      if (this.show_all_p || this.flexDirection !== "row") {
        str += `  flex-direction: ${this.flexDirection}\n`
      }
      if (this.show_all_p || this.flexWrap !== "nowrap") {
        str += `  flex-wrap: ${this.flexWrap}\n`
      }
      if (this.show_all_p || this.justifyContent !== "flex-start") {
        str += `  justify-content: ${this.justifyContent}\n`
      }
      if (this.show_all_p || this.alignItems !== "stretch") {
        str += `  align-items: ${this.alignItems}\n`
      }
      if (this.show_all_p || this.flexWrap !== "nowrap") {
        if (this.show_all_p || this.alignContent !== "stretch") {
          str += `  align-content: ${this.alignContent}\n`
        }
      }
      if (this.active_item) {
        str += `\n`
        str += `  .item:nth-child(${this.active_item})\n`
        if (this.show_all_p || this.order !== 0) {
          str += `      order: ${this.order}\n`
        }
        if (this.show_all_p || this.flexGrow !== "0") {
          str += `      flex-grow: ${this.flexGrow}\n`
        }
        if (this.show_all_p || this.flexShrink !== "1") {
          str += `      flex-shrink: ${this.flexShrink}\n`
        }
        if (this.show_all_p || this.flexBasis !== "auto") {
          str += `      flex-basis: ${this.flexBasis}\n`
        }
        if (this.show_all_p || this.alignSelf !== "auto") {
          str += `      align-self: ${this.alignSelf}\n`
        }
      }
      return str
    },
  },
}
</script>

<style lang="sass">
  .container_wrap
    margin: 1rem
    display: flex
    justify-content: center
    align-items: center

    .container
      display: flex
      user-select: none
      border: 1px dotted #00d1b2

      .item
        border: 1px solid #00d1b2
        padding: 0.5rem

      position: relative
      .container_text
        position: absolute
        top: 0
        left: 0

  .size0
    font-size: 1rem

  .size1
    font-size: 1.5rem

  .size2
    font-size: 2rem

  input
    &[type="range"]
      margin-top: 0.6em
    &[type="checkbox"]
      margin-right: 0.25em

  .range_number
    font-size: 0.75rem
    margin-left: 0.5rem
    position: relative
    top: -0.25em

  pre
    margin: 1rem 0

  .default
    font-weight: bold
</style>
