<template lang="pug">
.vue_draggable_test
  h2.title {{current_title}}
  hr

  .columns
    .column.is-one-fifth
      //- ドラッグするエリアに少しでもパディングがないとアイテム数が空の場合にドラッグできなくなるので注意

      //- 1つ目
      draggable.box.drag_div(
        data-foo="A"

        v-model="group1_my_items"
        :options="{group: 'shared_group_foo', draggable: '.my_item'}"

        @start="event_handle"
        @add="event_handle"
        @remove="event_handle"
        @update="event_handle"
        @end="event_handle"
        @choose="event_handle"
        @sort="event_handle"
        @filter="event_handle"
        @clone="event_handle"

        @change="event_handle"

        :move="check_move"

        )
        | A
        .my_item(v-for="my_item in group1_my_items" :key="my_item.id")
          | {{my_item.name}}
        button.button.is-small(slot="footer" @click="add_func") 追加

      //- 2つめ
      draggable.box.drag_div(data-foo="B" v-model="group2_my_items" :options="{group: 'shared_group_foo'}")
        | B
        .my_item(v-for="my_item in group2_my_items" :key="my_item.id")
          | {{my_item.name}}

      button.button.is-small(@click="all_reset") リセット
      .content.is-small
        ul
          li
            a(href="https://github.com/SortableJS/Vue.Draggable" target="_blank") SortableJS/Vue.Draggable

    .column
      .box
        b-table(:data="[...result_rows].reverse()" :hoverable="true" :columns="table_columns" narrowed)

</template>

<script>
import draggable from 'vuedraggable'
import dayjs from "dayjs"
import form_parts from "./form_parts.vue"

export default {
  name: "vue_draggable_test",
  components: {
    draggable,
    form_parts,
  },
  data() {
    return {
      group1_my_items: null,
      group2_my_items: null,
      result_rows: null,
    }
  },

  created() {
    this.all_reset()
  },

  watch: {
  },

  methods: {
    add_func() {
      const id = this.group1_my_items.length + this.group2_my_items.length + 1
      this.group1_my_items.push({
        id: id,
        name: `my_item${id}`,
      })
    },

    check_move(evt, originalEvent) {
      // draggedContext: context linked to dragged element
      // index: dragged element index
      // element: dragged element underlying view model element
      // futureIndex: potential index of the dragged element if the drop operation is accepted
      // relatedContext: context linked to current drag operation
      // index: target element index
      // element: target element view model element
      // list: target list
      // component: target VueComponent

      console.log(evt)
      console.log(originalEvent)
      // evt はドラッグ中のアイテムのイベント情報を取得できる
      // evt.draggedContextの中にドラッグ前のドラッグアイテムの情報が格納されている
      // evt.relatedContextの中にドラッグ後のドラッグアイテムの情報が格納されている
      // originalEventはドラッグ後のアイテムのイベント情報を取得できる
      return true
    },

    event_handle(e) {
      console.log(e)
      this.result_rows.push({
        time: dayjs().format("YYYY-MM-DD hh:mm:ss.SSS"),
        type: e.type || "@change",
        from: e.from.dataset.foo,
        to:   e.to.dataset.foo,
        oldIndex: e.oldIndex,
        newIndex: e.newIndex,
        attrs: inspect(e),
      })
    },

    all_reset() {
      this.result_rows = []

      this.group1_my_items = [
        { id: 1, name: "Alice", },
        { id: 2, name: "Bob",   },
        { id: 3, name: "Carol", },
        { id: 4, name: "Dave",  },
        { id: 5, name: "Ellen", },
      ]

      this.group2_my_items = [
        { id: 6, name: "Frank", },
      ]
    },
  },

  computed: {
    table_columns() {
      return [
        { field: 'from',      label: 'from',    sortable: false, },
        { field: 'to',        label: 'to',    sortable: false, },
        { field: 'type',      label: 'type',    sortable: false, },
        { field: 'oldIndex',  label: 'old',     sortable: false, },
        { field: 'newIndex',  label: 'new',     sortable: false, },
        // { field: 'attrs',     label: 'attrs',   sortable: false, },
      ]
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.vue_draggable_test
  .drag_div
    .my_item
      margin: 0.4em 0
      padding: 0.4em
      border: 1px dashed $primary
</style>
