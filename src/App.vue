<template lang="pug">
#app
  template(v-if="!$route.query['single']")
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
          template(v-if="false")
            router-link.navbar-item(to="/about") About
            router-link.navbar-item(to="/geo_location") 位置情報チェッカー

          .navbar-item.has-dropdown.is-hoverable
            span.navbar-link 機能
            .navbar-dropdown.is-boxed
              router-link.navbar-item(:to="{name: 'color_scheme'}") 配色エディター
              router-link.navbar-item(:to="{name: 'stopwatch'}") ストップウォッチ
              router-link.navbar-item(:to="{name: 'strange_attractor'}") ストレンジアトラクターエディター
              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'css_transform'}") CSS Transform
              router-link.navbar-item(:to="{name: 'css_flexbox'}") CSS Flexbox
              router-link.navbar-item(:to="{name: 'css_position'}") CSS Position
              hr.navbar-divider
              router-link.navbar-item(:to="{name: 'geo_location'}") 位置情報チェッカー
              router-link.navbar-item(:to="{name: 'navigator_vibrate'}") 振動機能チェッカー
              hr.navbar-divider
              router-link.navbar-item(to="/about") About
        .navbar-end
          // - if current_user
          //   .navbar-item.has-dropdown.is-hoverable
          //     = link_to([current_user], class: "navbar-link", slot: "trigger") do
          //       = image_tag(current_user.avatar_url, class: "header_avatar_image")
          //       span.my_name
          //         = current_user.name
          //     .navbar-dropdown.is-boxed
          //       = link_to("プロフィール", [current_user], class: "navbar-item")
          //       = link_to("設定", [:edit, current_user], class: "navbar-item")
          //       .navbar-divider
          //       = link_to("ログアウト", [:colosseum, :session], method: :delete, class: "navbar-item")
          //       / = link_to "ログアウト", destroy_xuser_session_path, method: :delete

          // - if !current_user
          //   = link_to("ログイン", :new_xuser_session, class: "navbar-item")
          //   = link_to("アカウント登録", :new_xuser_registration, class: "navbar-item")
          //   / .navbar-item.has-dropdown.is-hoverable
          //   /   span.navbar-link ログイン
          //   /   .navbar-dropdown.is-boxed
          //   /     = link_to("Googleアカウントでログイン", :new_xuser_registration, class: "navbar-item")
          //   /     = link_to("Googleアカウントでログイン", :xuser_google_oauth2_callback_function_omniauth_authorize, class: "navbar-item")
          //
          // .navbar-item
          //   | オンライン{{online_only_count}}人
          // .navbar-item
          //   | 対局中{{fighter_only_count}}人

  .section
    .container.is-fluid
      router-view

  template(v-if="false")
    .section
      .container.is-fluid
        .columns
          .column.is-2
            aside.menu
              p.menu-label
                | General
              ul.menu-list
                li: router-link(to="/") Home
                li: router-link(to="/about") About
                li: router-link(:to="{name: 'color_scheme'}") 配色エディター
                li: router-link(:to="{name: 'stopwatch'}") ストップウォッチ
              p.menu-label
                | CSS
              ul.menu-list
                li: router-link(:to="{name: 'css_transform'}") CSS Transform
                li: router-link(:to="{name: 'css_flexbox'}") CSS Flexbox
              p.menu-label
                | JavaScript
              ul.menu-list
                li: router-link(:to="{name: 'geo_location'}") 位置情報チェッカー
          .column
            router-view
  template(v-if="false")
    footer.footer
      .content.has-text-centered
        a(href="https://github.com/akicho8/vue_playground") GitHub
</template>

<style lang="sass">
#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
</style>
