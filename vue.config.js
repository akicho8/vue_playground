var path = require('path')
var PrerenderSpaPlugin = require('prerender-spa-plugin')

// // プロダクトモードでのみ追加
// const
// if (process.env.NODE_ENV === 'production') {
//   {
//     plugins: [
//       // ★ Prerender SPA Plugin を登録
//       new PrerenderSpaPlugin(
//         // 出力先 dist や www など
//         path.join(__dirname, 'dist'),
//         // 生成したいページ
//         [ '/', '/about' ]
//       )
//     ]
//   }
// }





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

  // Rails5.1でVue.jsで単一ファイルコンポーネントのエラーがでる（You are using the runtime-only build of Vue where the template compiler is not available）
  // https://qiita.com/magaya0403/items/3fbe9aa20c6a66b76662
  // Vue CLI 3でsrcパスの変更方法
  // https://qiita.com/tsuyoz/items/d9e922353ec326dccba3
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      },
    },

    // https://qiita.com/mio3io/items/bd2d91fc2a7785f9022c
    plugins: [
      // ★ Prerender SPA Plugin を登録
      new PrerenderSpaPlugin(
        // 出力先 dist や www など
        path.join(__dirname, 'dist'),
        // 生成したいページ
        [
          '/',
          '/about',
        ],
      ),
    ],
  },

  // pluginOptions: {
  //   meta: {
  //     // projectName: 'My project',
  //     // url: 'https://example.com',
  //     // description: 'Lorem ipsum dolor sid amet',
  //     // twitterHandle: 'example',
  //     // socialImage: 'images/social.jpg',
  //     googleAnalytics: 'UA-134504422-1',
  //   },
  // },

}
