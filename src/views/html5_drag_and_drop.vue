<template lang="pug">
.html5_drag_and_drop
  .h2.title {{$options.title}}
  hr

  .my_item#item_c(draggable="true" @dragstart="dragstart_handle") C
  .box(@dragover="dragover_handle" @drop="drop_handle")
    .my_item#item_a(draggable="true" @dragstart="dragstart_handle") A
  .box(@dragover="dragover_handle" @drop="drop_handle")
    .my_item#item_b(draggable="true" @dragstart="dragstart_handle") B

  template(v-if="false")
    .box
      b-table(:data="[...result_rows].reverse()" :hoverable="true" :columns="table_columns" narrowed)

</template>

<script>
// import dayjs from "dayjs"
// import form_parts from "./form_parts.vue"

export default {
  name: "html5_drag_and_drop",
  title: "ドラッグアンドドロップ (プリミティブ)",
  // components: {
  //   form_parts,
  // },
  data() {
    return {
      result_rows: [],
    }
  },

  created() {
    this.all_reset()
  },

  watch: {
  },

  methods: {
    result_rows_reset() {
      this.result_rows = []
    },

    all_reset() {
      this.result_rows_reset()
    },

    // ドラッグ開始時
    dragstart_handle(e) {
      this.event_handle(e)
      // ドラッグするデータのid名(なんでもいい)をDataTransferオブジェクトにセット
      e.dataTransfer.setData("target_id", e.target.id)
    },

    // ドラッグ要素がドロップ要素に重なっている間の処理
    dragover_handle(e) {
      this.event_handle(e)
      // dragoverイベントをキャンセルしてドロップ先の要素がドロップを受け付けるようにする
      e.preventDefault()
    },

    // ドロップ時
    drop_handle(e) {
      this.event_handle(e)

      const target_id = e.dataTransfer.getData("target_id") // ドラッグされたデータのid名をDataTransferオブジェクトから取得
      const drag_elem = document.getElementById(target_id)  // id名からドラッグされた要素を取得
      e.currentTarget.appendChild(drag_elem)                // ドロップ先にドラッグされた要素を追加(ここらへんは自力でやるっぽい)
      e.preventDefault()                                    // エラー回避のため、ドロップ処理の最後にdropイベントをキャンセルしておく
    },

    event_handle(e) {
      console.log(e)

      // this.result_rows.push({
      //   time: dayjs().format("YYYY-MM-DD hh:mm:ss.SSS"),
      //   type: e.type,
      //   // from: e.from.dataset.foo,
      //   // to:   e.to.dataset.foo,
      //   // oldIndex: e.oldIndex,
      //   // newIndex: e.newIndex,
      //   attrs: inspect(e),
      // })
    },
  },

  computed: {
    table_columns() {
      return [
        { field: 'time',      label: 'time',    sortable: false, },
        // { field: 'from',      label: 'from',    sortable: false, },
        // { field: 'to',        label: 'to',    sortable: false, },
        { field: 'type',      label: 'type',    sortable: false, },
        // { field: 'oldIndex',  label: 'old',     sortable: false, },
        // { field: 'newIndex',  label: 'new',     sortable: false, },
        { field: 'attrs',  label: 'attrs',     sortable: false, },
      ]
    },
  },
}
</script>

<style scoped lang="sass">
@import "../assets/scss/variables"

.html5_drag_and_drop
  .my_item
    margin: 1em
    padding: 1em
    border: 1px dashed $primary
</style>
