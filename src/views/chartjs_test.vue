<template lang="pug">
.chatjs_test
  .h2.title {{$options.title}}
  hr
  canvas(ref="canvas1")

  .content
    ul
      li
        a(href="https://misc.0o0o.org/chartjs-doc-ja/" target="_blank") https://misc.0o0o.org/chartjs-doc-ja/

</template>

<script>
import Chart from "chart.js"

export default {
  name: "chatjs_test",
  title: "グラフ描画 (chart.js)",
  data() {
    return {
    }
  },

  mounted() {
    new Chart(this.$refs.canvas1, {
      type: "line",
      data: {
        labels: ["A", "B", "C", "D", "E"],
        datasets: [
          {
            label: "(label)",
            data: [0, 2, 1, 3, 0],
            backgroundColor: "rgba(153,255,51,0.4)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        elements: {
          line: {
            tension: 0, // ベジェ曲線無効
          },
        },
        animation: {
          duration: 0, // 一般的なアニメーションの時間
        },
      },
    })
  },
}
</script>

<style scoped lang="sass">
</style>
