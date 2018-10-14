<template lang="pug">
#app
  .section
    .container.is-fluid
      .columns
        .column.is-2
          ul
            li: router-link(to="/") Home
            li: router-link(to="/about") About
            li: router-link(to="/geo_location") 位置情報
            li: router-link(to="/css_transform") CSS Transform
        .column
          router-view
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
