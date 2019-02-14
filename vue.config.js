module.exports = {
  baseUrl: process.env.BASE_URL,

  // https://cli.vuejs.org/guide/webpack.html#adding-a-new-loader
  chainWebpack: config => {
    config.module
      .rule('raw')
      .test(/\.(txt|md)$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },

  lintOnSave: false,

  // pluginOptions: {
  //   meta: {
  //     projectName: 'My project',
  //     url: 'https://example.com',
  //     description: 'Lorem ipsum dolor sid amet',
  //     twitterHandle: 'example',
  //     socialImage: 'images/social.jpg',
  //     googleAnalytics: 'UA-12345678-1'
  //   },
  // },
}
