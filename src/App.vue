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
          router-link.navbar-item(:to="{name: 'ruby_code_transpiler'}") Ruby Code Transpiler
          router-link.navbar-item(:to="{name: 'css_object_fit'}") CSS object-fit
          router-link.navbar-item(:to="{name: 'color_scheme'}") 配色エディター
          router-link.navbar-item(:to="{name: 'stopwatch'}") ストップウォッチ
          router-link.navbar-item(:to="{name: 'css_flexbox'}") CSS Flexbox

          template(v-if="false")
            router-link.navbar-item(to="/about") About
            router-link.navbar-item(to="/html5_geolocation_api") Geolocation API

          .navbar-item.has-dropdown.is-hoverable
            span.navbar-link その他の機能
            .navbar-dropdown.is-boxed
              router-link.navbar-item(:to="{name: 'light_rpn'}") 逆ポーランド電卓
              router-link.navbar-item(:to="{name: 'mavon_editor_test'}") mavonEditor Test
              router-link.navbar-item(:to="{name: 'vue_carousel_test'}") Vue Carousel Test
              router-link.navbar-item(:to="{name: 'general_form_template'}") 一般向けフォームテンプレート
              router-link.navbar-item(:to="{name: 'strange_attractor'}") ストレンジアトラクターエディター
              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'css_filter'}") CSS Filter
              router-link.navbar-item(:to="{name: 'css_transform'}") CSS Transform
              router-link.navbar-item(:to="{name: 'css_position'}") CSS Position
              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'html5_geolocation_api'}") HTML5 Geolocation API
              router-link.navbar-item(:to="{name: 'navigator_vibrate'}") 振動機能
              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'html_audio_checker'}") HTML Audio
              router-link.navbar-item(:to="{name: 'web_audio_api_checker'}") Web Audio API
              router-link.navbar-item(:to="{name: 'web_audio_api_for_mobile'}") Web Audio API for Mobile
              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'google_maps_javascript_api'}") Google Maps JavaScript API
              router-link.navbar-item(:to="{name: 'google_geocoding_api'}") Google Geocoding API
              router-link.navbar-item(:to="{name: 'form_template'}") Form Template
              //- hr.navbar-divider
              //- router-link.navbar-item(to="/about") About
        .navbar-end
          template(v-if="NODE_ENV !== 'production'")
            a.navbar-item(href="http://tk2-221-20341.vs.sakura.ne.jp/vp/" target="_blank") production
            a.navbar-item(href="https://bulma.io/documentation/form/general/" target="_blank") Bulma
            a.navbar-item(href="https://buefy.github.io/#/documentation/start" target="_blank") Buefy
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
