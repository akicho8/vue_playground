<template lang="pug">
.tiptap_test
  .h2.title {{$options.title}}
  hr

  .columns
    .column
      .editor
        editor-menu-bar(:editor="editor")
        .menubar(slot-scope="{ commands, isActive }")
          .toolbar
            button(class="menubar__button" @click="commands.undo")
              icon(name="undo")

            button(class="menubar__button" @click="commands.redo")
              icon(name="redo")

            button(class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold")
              icon(name="bold")

            button(class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic")
              icon(name="italic")

            button(class="menubar__button" :class="{ 'is-active': isActive.strike() }" @click="commands.strike")
              icon(name="strike")

            button(class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click="commands.underline")
              icon(name="underline")

            button(class="menubar__button" :class="{ 'is-active': isActive.code() }" @click="commands.code")
              icon(name="code")

            button(class="menubar__button" :class="{ 'is-active': isActive.paragraph() }" @click="commands.paragraph")
              icon(name="paragraph")

            button(class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })")
              H1

            button(class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })")
              H2

            button(class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3 })")
              H3

            button(class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list")
              icon(name="ul")

            button(class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list")
              icon(name="ol")

            button(class="menubar__button" :class="{ 'is-active': isActive.blockquote() }" @click="commands.blockquote")
              icon(name="quote")

            button(class="menubar__button" :class="{ 'is-active': isActive.code_block() }" @click="commands.code_block")
              icon(name="code")

            button(class="menubar__button" @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })")
              icon(name="table")

            span(v-if="isActive.table()")
              button(class="menubar__button" @click="commands.deleteTable")
                icon(name="delete_table")

              button(class="menubar__button" @click="commands.addColumnBefore")
                icon(name="add_col_before")

              button(class="menubar__button" @click="commands.addColumnAfter")
                icon(name="add_col_after")

              button(class="menubar__button" @click="commands.deleteColumn")
                icon(name="delete_col")

              button(class="menubar__button" @click="commands.addRowBefore")
                icon(name="add_row_before")

              button(class="menubar__button" @click="commands.addRowAfter")
                icon(name="add_row_after")

              button(class="menubar__button" @click="commands.deleteRow")
                icon(name="delete_row")

              button(class="menubar__button" @click="commands.toggleCellMerge")
                icon(name="combine_cells")

      editor-content(class="editor__content" :editor="editor")

      .field
        a(href="https://github.com/scrumpy/tiptap" target="_blank") https://github.com/scrumpy/tiptap
    .column
      .box
        div(v-html=html)
      .box
        | {{html}}
</template>

<script>
import Icon from './tiptap_icon'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'

import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

export default {
  name: "tiptap_test",
  title: "TiptapTest",
  components: {
    EditorContent,
    EditorMenuBar,
    Icon,
  },

  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new Table(),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
        ],
        content: `
            <h2>
              Tables
            </h2>
            <p>
              Tables come with some useful commands like adding, removing or merging rows and columns. Navigate with <code>tab</code> or arrow keys. Resizing is also supported.
            </p>
            <table>
              <tr>
                <th colspan="3" data-colwidth="100,0,0">Wide header</th>
              </tr>
              <tr>
                <td>One</td>
                <td>Two</td>
                <td>Three</td>
              </tr>
              <tr>
                <td>Four</td>
                <td>Five</td>
                <td>Six</td>
              </tr>
            </table>
          `,
        onUpdate: ({ getJSON, getHTML }) => {
          this.json = getJSON()
          this.html = getHTML()
        },
      }),
      html: null,
      json: null,
    }
  },

  created() {
  },

  mounted() {
  },

  beforeDestroy() {
    this.editor.destroy()
  },

  watch: {
  },

  methods: {
  },

  computed: {
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.editor
  .editor__content

</style>
