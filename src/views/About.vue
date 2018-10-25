<template lang="pug">
div
  h2.title {{$options.title}}

  .section
    h3.title Vue.js
    b-table(:data="vuejs_infos" :hoverable="true" :columns="[{field: 'name', label: '項目', numeric: true, sortable: true}, {field: 'value', label: '値'}]" narrowed)

  .section
    h3.title Browser
    b-table(:data="browser_infos" :hoverable="true" :columns="[{field: 'name', label: '項目', numeric: true, sortable: true}, {field: 'value', label: '値'}]" narrowed)

  .section
    h3.title Navigator
    //- https://buefy.github.io/#/documentation/table
    b-table(:data="navigator_infos" hoverable narrowed)
      template(slot-scope="props")
        b-table-column(field="name" label="項目" sortable="sortable" numeric="true")
          | {{props.row.name}}
        b-table-column(label="値")
          | {{props.row.value()}}

</template>

<script>
export default {
  name: 'about',
  title: "About",
  data() {
    return {
    }
  },
  computed: {
    vuejs_infos() {
      return [
        { name: "NODE_ENV",        value: this.NODE_ENV                 },
        { name: "$route.query",    value: this.$route.query             },
        { name: "$route.path",     value: this.$route.path              },
        { name: "$route.name",     value: this.$route.name              },
        { name: "$route.params",   value: this.$route.params            },
        { name: "$route",          value: inspect(this.$route)          },
        { name: "$store",          value: inspect(this.$store)          },
        { name: "$router.mode",    value: this.$router.mode             },
        { name: "$router.options", value: inspect(this.$router.options) },
      ]
    },

    browser_infos() {
      return [
        { name: "location", value: location },
      ]
    },

    navigator_infos() {
      return [
        { name: "内部コードネーム",                                                                                                                            value: () => navigator.appCodeName },
        { name: "正式名称",                                                                                                                                    value: () => navigator.appName },
        { name: "バージョン",                                                                                                                                  value: () => navigator.appVersion},
        // { name: "ビルド識別子",                                                                                                                             value: () => navigator.buildID },
        // { name: "network connection",                                                                                                                       value: () => inspect(navigator.connection) },
        { name: "クッキー",                                                                                                                                    value: () => navigator.cookieEnabled},
        // { name: "Reports the value of the user's do-not-track preference. When this value is yes, your web site or application should not track the user.", value: () => navigator.doNotTrack },
        // { name: "Returns the id object which you can use to add support for BrowserID to your web site.",                                                   value: () => navigator.id },
        { name: "言語",                                                                                                                                        value: () => navigator.language},
        // { name: "ブラウザがサポートしている MIME タイプの一覧",                                                                                             value: () => navigator.mimeTypes},
        // { name: "Returns an Apps object you can use to install, manage, and control Open Web apps.",                                                        value: () => navigator.mozApps },
        { name: "バッテリー",                                                                                                                                  value: () => navigator.getBattery() },
        // { name: "navigator.webkitNotification",                                                                                                             value: () => navigator.mozNotification },
        // { name: "navigator.mozSms ",                                                                                                                        value: () => Returns a notification object you can use to deliver notifications to the user from your web application.},
        // { name: "navigator.mozSocial ",                                                                                                                     value: () => Returns a SmsManager object you can use to manage SMS messaging in your web application.},
        // { name: "Returns a Telephony object you can use to create and manage telephone calls.",                                                             value: () => navigator.mozTelephony },
        { name: "オンライン",                                                                                                                                  value: () => navigator.onLine },
        // { name: "現在のオペレーティングシステムを表す文字列",                                                                                               value: () => navigator.oscpu},
        { name: "プラットフォーム",                                                                                                                            value: () => navigator.platform},
        // { name: "ブラウザにインストールされているプラグインの一覧を配列で返す",                                                                             value: () => navigator.plugins},
        { name: "製品名",                                                                                                                                      value: () => navigator.product },
        { name: "ビルド番号",                                                                                                                                  value: () => navigator.productSub },
        // { name: "空文字列（※Netscape 4.7x のみ "US & CA domestic policy" または、 "Export policy" という文字列）",                                         value: () => navigator.securitypolicy },
        // { name: "Returns a boolean indicating whether the browser is running in standalone mode. Available on Apple's iOS Safari only.",                    value: () => navigator.standalone },
        { name: "userAgent",                                                                                                                                   value: () => navigator.userAgent},
        { name: "vendor",                                                                                                                                      value: () => navigator.vendor },
        { name: "ベンダーバージョン",                                                                                                                          value: () => navigator.vendorSub },
        // { name: "Returns a PointerLock object for the Mouse Lock API.",                                                                                     value: () => navigator.webkitPointer },
        { name: "Java機能",                                                                                                                                    value: () => navigator.javaEnabled() },
        // { name: "navigator.mozIsLocallyAvailable ",                                                                                                         value: () => ホストブラウザで Java が有効かどうかを示す},
        // { name: "navigator.preference Gecko 2.0 で廃止 ",                                                                                                   value: () => 指定 URI の文書がネットワークを利用しなくても閲覧可能かどうかをチェックする},
        // { name: "navigator.registerContentHandler",                                                                                                         value: () => ユーザ設定を設定する。このメソッドは、特権を持つコードでのみ使用可能です。現在は廃止されているため、代わりに XPCOM の Preferences API を用います。},
        // { name: "navigator.registerProtocolHandler",                                                                                                        value: () => Web サイトを指定した MIME タイプに関連付ける},
        // { name: "navigator.taintEnabled 非推奨 Gecko 1.7.8 Gecko 9.0 で廃止 ",                                                                              value: () => Web サイト を指定したプロトコルに関連付ける},
        { name: "振動機能",                                                                                                                                    value: () => !!navigator.vibrate },
        { name: "Geolocation API",                                                                                                                                    value: () => !!navigator.geolocation },
      ]
    },
  },
}
</script>
