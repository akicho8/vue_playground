<template lang="pug">
.shogi_player_test
  h2.title {{current_title}}
  hr
  .columns
    .column
      ShogiPlayer(:kifu_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'" :start_turn="0" :slider_show="true" :theme="'simple'" :variation="'g'")
  .columns
    .column
      div 表示されればグローバルな Store が正しく参照されていることがわかる
      div $store.state.global_var1: {{$store.state.global_var1}}

</template>

<script>
import ShogiPlayer from "shogi-player/src/components/ShogiPlayer.vue"

export default {
  name: "shogi_player_test",
  components: {
    ShogiPlayer,
  },
}
</script>

<style lang="sass">
@import "../assets/scss/variables"

$sp_assets_dir: "../../node_modules/shogi-player/src/assets"
@import "../../node_modules/shogi-player/src/components/ShogiPlayer.sass"

.shogi_player_test
</style>
