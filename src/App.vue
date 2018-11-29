<template lang="pug">
#app
  template(v-if="$route.query.layout !== 'simple'")
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
          router-link.navbar-item(:to="{name: 'css_object_fit'}") CSS object-fit
          router-link.navbar-item(:to="{name: 'color_scheme'}") 配色エディター
          router-link.navbar-item(:to="{name: 'ruby_code_transpiler'}") Ruby Code Transpiler
          router-link.navbar-item(:to="{name: 'css_flexbox'}") CSS Flexbox

          template(v-if="false")
            router-link.navbar-item(to="/about") About
            router-link.navbar-item(to="/html5_geolocation_api") 位置情報取得 (HTML5 Geolocation API)

          .navbar-item.has-dropdown.is-hoverable
            span.navbar-link CSS
            .navbar-dropdown.is-boxed
              router-link.navbar-item(:to="{name: 'css_filter'}") CSS Filter
              router-link.navbar-item(:to="{name: 'css_transform'}") CSS Transform
              router-link.navbar-item(:to="{name: 'css_position'}") CSS Position
              router-link.navbar-item(:to="{name: 'arrow_cursor_navigation'}") CSS 三角ナビゲーション

          .navbar-item.has-dropdown.is-hoverable
            span.navbar-link その他
            .navbar-dropdown.is-boxed
              router-link.navbar-item(:to="{name: 'lissajous'}") いろいろな曲線
              router-link.navbar-item(:to="{name: 'strange_attractor'}") ストレンジアトラクター
              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'light_rpn'}") 逆ポーランド電卓
              router-link.navbar-item(:to="{name: 'vue_carousel_test'}") スライドショー (vue-carousel)
              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'form_template'}") Form Template
              router-link.navbar-item(:to="{name: 'general_form_template'}") 一般向けフォームテンプレート
              router-link.navbar-item(:to="{name: 'password_form'}") パスワード入力
              router-link.navbar-item(:to="{name: 'form_zenhan'}") 全角半角変換
              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'html5_drag_and_drop'}") ドラッグアンドドロップ (プリミティブ)
              router-link.navbar-item(:to="{name: 'vue_draggable_test'}") ドラッグアンドドロップ (Vue.draggable)
              router-link.navbar-item(:to="{name: 'html5_geolocation_api'}") 位置情報取得 (HTML5 Geolocation API)
              router-link.navbar-item(:to="{name: 'navigator_vibrate'}") 振動機能
              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'html_audio_checker'}") HTML Audio
              router-link.navbar-item(:to="{name: 'web_audio_api_checker'}") Web Audio API
              router-link.navbar-item(:to="{name: 'web_audio_api_for_mobile'}") Web Audio API for Mobile
              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'google_maps_playground'}") Google Maps Playground
              router-link.navbar-item(:to="{name: 'google_maps_basic'}") GoogleMapsのいちばん簡単な例
              router-link.navbar-item(:to="{name: 'google_geocoding_api'}") Google Geocoding API
              router-link.navbar-item(:to="{name: 'google_place_api'}") お店検索 (Google Place API)
              //- hr.navbar-divider
              //- hr.navbar-divider
              //- router-link.navbar-item(to="/about") About

        .navbar-end
          template(v-if="NODE_ENV !== 'production'")
            .navbar-item.has-dropdown.is-hoverable
              span.navbar-link ゴミ箱
              .navbar-dropdown.is-boxed
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
