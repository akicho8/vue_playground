<template lang="pug">
#app
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
        router-link.navbar-item.is-active(to="/about") About
        router-link.navbar-item(to="/geo_location") 位置情報チェッカー
        .navbar-item.has-dropdown.is-hoverable
          span.navbar-link もっと見る
          .navbar-dropdown.is-boxed
            a.navbar-item           項目1
            a.navbar-item.is-active 項目2
            a.navbar-item           項目3
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
      .columns
        .column.is-2
          ul
            li: router-link(to="/") Home
            li: router-link(to="/about") About
            li: router-link(:to="{name: 'geo_location'}") 位置情報チェッカー
            li: router-link(:to="{name: 'css_transform'}") CSS Transform
            li: router-link(:to="{name: 'css_flexbox'}") CSS Flexbox
            li: router-link(:to="{name: 'color_scheme'}") 配色エディター
            li: router-link(:to="{name: 'stopwatch'}") ストップウォッチ
        .column
          router-view
</template>

<style lang="sass">
#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
</style>
