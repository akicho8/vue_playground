<template lang="pug">
#app
  template(v-if="current_layout !== 'nothing'")
    nav.navbar.is-transparent.is-primary
      .navbar-brand
        router-link.navbar-item(to="/")
          img(src="@/assets/logo.png" width="32")
          | Vue.js Playground
        .navbar-burger.burger(data-target="main_navbar")
          span
          span
          span
      #main_navbar.navbar-menu
        .navbar-start
          MenuElement(name="stopwatch")
          MenuElement(name="ruby_code_transpiler")

          template(v-if="false")
            router-link.navbar-item(to="/about") About

          .navbar-item.has-dropdown.is-hoverable
            span.navbar-link CSS
            .navbar-dropdown.is-boxed
              MenuElement(name="css_flexbox")
              MenuElement(name="css_position")
              MenuElement(name="css_object_fit")
              MenuElement(name="css_filter")
              MenuElement(name="css_transform")
              MenuElement(name="css_truncate")
              MenuElement(name="css_font_test")
              MenuElement(name="vue_transition_test")
              MenuElement(name="css_vertical_align")
              MenuElement(name="css_icon_with_message")

              hr.navbar-divider
              MenuElement(name="arrow_cursor_navigation")
              MenuElement(name="css_close_button_sample")
              MenuElement(name="css_balloon_sample")
              MenuElement(name="color_scheme")
              MenuElement(name="css_pattern_test")
              MenuElement(name="css_animation_restart")
              MenuElement(name="css_image_with_text_pattern")
              MenuElement(name="responsive_slide_image")
              MenuElement(name="css_browser_selector_test")
              MenuElement(name="bg_window_test")
              MenuElement(name="css_image_swing")

          .navbar-item.has-dropdown.is-hoverable
            span.navbar-link Google API
            .navbar-dropdown.is-boxed
              MenuElement(name="google_maps_playground")
              MenuElement(name="google_maps_basic")
              MenuElement(name="google_geocoding_api")
              MenuElement(name="google_place_api")

          .navbar-item.has-dropdown.is-hoverable
            span.navbar-link メディア再生
            .navbar-dropdown.is-boxed
              MenuElement(name="html_audio_checker")
              MenuElement(name="web_audio_api_checker")
              MenuElement(name="web_audio_api_for_mobile")
              hr.navbar-divider
              MenuElement(name="howler_simple_test")
              MenuElement(name="howler_play_format_test")

          .navbar-item.has-dropdown.is-hoverable
            span.navbar-link その他
            .navbar-dropdown.is-boxed
              MenuElement(name="camera_api_test")
              MenuElement(name="app_run_test")
              MenuElement(name="vue_meta_test")
              MenuElement(name="shogi_player_test")
              MenuElement(name="reactive_test")
              MenuElement(name="vue_inline_render_component_test")
              MenuElement(name="vue_slot_test")
              hr.navbar-divider
              MenuElement(name="create_object_url_test")
              MenuElement(name="fabric_basic_test")
              MenuElement(name="fabric_export_test")
              MenuElement(name="vue_script2_test1")
              MenuElement(name="vue_script2_test2")
              MenuElement(name="tinymce_vue_test")
              MenuElement(name="chartjs_test")
              MenuElement(name="js_console")
              MenuElement(name="babel_transform")
              MenuElement(name="textarea_test")
              MenuElement(name="uploaed_file_preview")
              MenuElement(name="uploaed_files_preview")
              MenuElement(name="prism_test")
              MenuElement(name="lzma_package_test")
              MenuElement(name="marked_test")
              MenuElement(name="abcjs_test")
              MenuElement(name="lissajous")
              MenuElement(name="strange_attractor")
              MenuElement(name="clipboard_copy_test")
              MenuElement(name="sass_test")
              hr.navbar-divider
              MenuElement(name="light_rpn")
              MenuElement(name="vue_carousel_test")

              hr.navbar-divider
              MenuElement(name="form_template")
              MenuElement(name="general_form_template")
              MenuElement(name="password_form")
              MenuElement(name="form_zenhan")

              hr.navbar-divider
              MenuElement(name="html5_dialog_test")
              MenuElement(name="html5_drag_and_drop")
              MenuElement(name="vue_draggable_test")
              MenuElement(name="html5_geolocation_api")
              MenuElement(name="navigator_vibrate")

              //- hr.navbar-divider
              //- hr.navbar-divider
              //- router-link.navbar-item(to="/about") About

        .navbar-end
          template(v-if="NODE_ENV !== 'production'")
            .navbar-item.has-dropdown.is-hoverable
              span.navbar-link ゴミ箱
              .navbar-dropdown.is-boxed
                MenuElement(name="jplist_test")
                MenuElement(name="tiptap_test")
                MenuElement(name="quill_test")
                MenuElement(name="puyosimu")
                MenuElement(name="mavon_editor_test")
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

  template(v-if="current_layout === 'basic'")
    .section
      .container.is-fluid
        router-view

  template(v-if="current_layout === 'nothing'")
    router-view

  template(v-if="false")
    template(v-if="current_layout === 'basic'")
      footer.footer
        .content.has-text-centered
          a(href="https://github.com/akicho8/vue_playground") GitHub
</template>

<script>
import MenuElement from "./components/MenuElement.vue"

export default {
  name: "App",
  components: {
    MenuElement,
  },
  metaInfo: {
    link: [
      { vmid: "favicon", rel: "icon", href: process.env.BASE_URL + "favicon.ico", },
    ],

    // title: 'Vue.js Playground', // set a title
    // titleTemplate: '%s - Yay!', // title is now "My Example App - Yay!"
    // htmlAttrs: {
    //   lang: 'ja',
    //   amp: undefined // "amp" has no value
    // }
  }
}
</script>

<style lang="sass">
#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
</style>
