<template lang="pug">
#app
  template(v-if="$route.query.layout !== 'simple' && $route.meta.layout !== 'simple'")
    nav.navbar.is-transparent.is-primary
      .navbar-brand
        router-link.navbar-item(to="/")
          img(src="@/assets/logo.png" width="32")
          | Vue.js Playground
        .navbar-burger.burger(data-target="main_navar")
          span
          span
          span
      #main_navar.navbar-menu
        .navbar-start
          router-link.navbar-item(:to="{name: 'stopwatch'}") ストップウォッチ
          router-link.navbar-item(:to="{name: 'ruby_code_transpiler'}") Ruby Code Transpiler

          template(v-if="false")
            router-link.navbar-item(to="/about") About
            router-link.navbar-item(to="/html5_geolocation_api") 位置情報取得 (HTML5 Geolocation API)

          .navbar-item.has-dropdown.is-hoverable
            span.navbar-link CSS
            .navbar-dropdown.is-boxed
              router-link.navbar-item(:to="{name: 'css_flexbox'}") CSS Flexbox
              router-link.navbar-item(:to="{name: 'css_position'}") CSS Position
              router-link.navbar-item(:to="{name: 'css_object_fit'}") CSS object-fit
              router-link.navbar-item(:to="{name: 'css_filter'}") CSS Filter
              router-link.navbar-item(:to="{name: 'css_transform'}") CSS Transform
              router-link.navbar-item(:to="{name: 'text_overflow_ellipsis_test'}") TextOverflowEllipsisTest

              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'arrow_cursor_navigation'}") CSS 三角ナビゲーション
              router-link.navbar-item(:to="{name: 'css_close_button_sample'}") CSS 右上配置の閉じる×ボタン
              router-link.navbar-item(:to="{name: 'css_balloon_sample'}") CSS 吹き出し
              router-link.navbar-item(:to="{name: 'color_scheme'}") 配色エディター
              router-link.navbar-item(:to="{name: 'css_pattern_test'}") CSS 背景パターン
              router-link.navbar-item(:to="{name: 'css_animation_restart'}") CSS アニメーション 再スタート
              router-link.navbar-item(:to="{name: 'css_pattern_test2'}") CSS スタイル実験

          .navbar-item.has-dropdown.is-hoverable
            span.navbar-link Google API
            .navbar-dropdown.is-boxed
              router-link.navbar-item(:to="{name: 'google_maps_playground'}") Google Maps Playground
              router-link.navbar-item(:to="{name: 'google_maps_basic'}") GoogleMapsのいちばん簡単な例
              router-link.navbar-item(:to="{name: 'google_geocoding_api'}") Google Geocoding API
              router-link.navbar-item(:to="{name: 'google_place_api'}") お店検索 (Google Place API)

          .navbar-item.has-dropdown.is-hoverable
            span.navbar-link メディア再生
            .navbar-dropdown.is-boxed
              router-link.navbar-item(:to="{name: 'html_audio_checker'}") HTML Audio
              router-link.navbar-item(:to="{name: 'web_audio_api_checker'}") Web Audio API
              router-link.navbar-item(:to="{name: 'web_audio_api_for_mobile'}") Web Audio API for Mobile
              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'howler_simple_test'}") Howlerを使ったサウンド再生テスト
              router-link.navbar-item(:to="{name: 'howler_play_format_test'}") 各種フォーマットのサウンド再生テスト (Howler)

          .navbar-item.has-dropdown.is-hoverable
            span.navbar-link その他
            .navbar-dropdown.is-boxed
              router-link.navbar-item(:to="{name: 'tinymce_vue_test'}") TinyMCE
              router-link.navbar-item(:to="{name: 'chartjs_test'}") グラフ描画 (chart.js)
              router-link.navbar-item(:to="{name: 'js_console'}") JavaScript コンソール
              router-link.navbar-item(:to="{name: 'babel_transform'}") JavaScript コンソール (ES2015変換)
              router-link.navbar-item(:to="{name: 'textarea_test'}") テキストエリア縦幅自動調整
              router-link.navbar-item(:to="{name: 'uploaed_file_preview'}") 単一アップロードファイルプレビュー (FileReader)
              router-link.navbar-item(:to="{name: 'uploaed_files_preview'}") 複数アップロードファイルプレビュー (FileReader)
              router-link.navbar-item(:to="{name: 'prism_test'}") コードフォーマット (prism)
              router-link.navbar-item(:to="{name: 'lzma_package_test'}") 圧縮復元 (lzma)
              router-link.navbar-item(:to="{name: 'marked_test'}") Markdown変換 (marked)
              router-link.navbar-item(:to="{name: 'abcjs_test'}") 楽譜入力 (abcjs)
              router-link.navbar-item(:to="{name: 'splatoon_weapon_quiz1'}") スプラトゥーン2ブキクイズ1
              router-link.navbar-item(:to="{name: 'splatoon_weapon_quiz2'}") スプラトゥーン2ブキクイズ2
              router-link.navbar-item(:to="{name: 'splatoon_weapon_quiz3'}") スプラトゥーン2ブキクイズ3
              router-link.navbar-item(:to="{name: 'lissajous'}") いろいろな曲線
              router-link.navbar-item(:to="{name: 'strange_attractor'}") ストレンジアトラクター
              router-link.navbar-item(:to="{name: 'clipboard_copy_test'}") クリップボードへのコピー
              router-link.navbar-item(:to="{name: 'sass_test'}") SassTest

              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'light_rpn'}") 逆ポーランド電卓
              router-link.navbar-item(:to="{name: 'vue_carousel_test'}") スライドショー (vue-carousel)

              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'form_template'}") FormTemplate
              router-link.navbar-item(:to="{name: 'general_form_template'}") 一般向けフォームテンプレート
              router-link.navbar-item(:to="{name: 'password_form'}") パスワード入力
              router-link.navbar-item(:to="{name: 'form_zenhan'}") 全角半角変換

              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'html5_drag_and_drop'}") ドラッグアンドドロップ (プリミティブ)
              router-link.navbar-item(:to="{name: 'vue_draggable_test'}") ドラッグアンドドロップ (Vue.draggable)
              router-link.navbar-item(:to="{name: 'html5_geolocation_api'}") 位置情報取得 (HTML5 Geolocation API)
              router-link.navbar-item(:to="{name: 'navigator_vibrate'}") 振動機能

              //- hr.navbar-divider
              //- hr.navbar-divider
              //- router-link.navbar-item(to="/about") About

        .navbar-end
          template(v-if="NODE_ENV !== 'production'")
            .navbar-item.has-dropdown.is-hoverable
              span.navbar-link ゴミ箱
              .navbar-dropdown.is-boxed
                router-link.navbar-item(:to="{name: 'jplist_test'}") JplistTest
                router-link.navbar-item(:to="{name: 'tiptap_test'}") TiptapTest
                router-link.navbar-item(:to="{name: 'quill_test'}") quill_test
                router-link.navbar-item(:to="{name: 'puyosimu'}") ぷよぷよシミュレーター
                router-link.navbar-item(:to="{name: 'mavon_editor_test'}") mavonEditor Test
                //- router-link.navbar-item(to="/about") About

          template(v-if="NODE_ENV !== 'production'")
            .navbar-item.has-dropdown.is-hoverable
              span.navbar-link 便利サイト
              .navbar-dropdown.is-boxed
                a.navbar-item(href="https://bulma.io/documentation/form/general/" target="_blank") Bulma
                a.navbar-item(href="https://buefy.github.io/#/documentation/start" target="_blank") Buefy
                a.navbar-item(href="https://vuejsexamples.com/" target="_blank") Vue.js Examples

          template(v-if="NODE_ENV !== 'production'")
            a.navbar-item(href="http://tk2-221-20341.vs.sakura.ne.jp/vp/" target="_blank") production

          router-link.navbar-item(:to="{name: 'about'}") About
  .section
    .container.is-fluid
      router-view
  .bg-window

  template(v-if="false")
    template(v-if="$route.query.layout !== 'simple'")
      footer.footer
        .content.has-text-centered
          a(href="https://github.com/akicho8/vue_playground") GitHub
</template>

<style lang="sass">
#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
</style>
