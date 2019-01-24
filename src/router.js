import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: "is-active", // router-link-exact-active
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/',
      meta: { title: "CSS Filter", },
      component: () => import(/* webpackChunkName: "css_filter" */ './views/css_filter.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },

    { meta: { title: "位置情報取得 (HTML5 Geolocation API)"            }, path: '/html5_geolocation_api',       name: 'html5_geolocation_api',       component: () => import(/* webpackChunkName: "html5_geolocation_api" */ './views/html5_geolocation_api.vue'),               },
    { meta: { title: "CSS Transform"                                   }, path: '/css_transform',               name: 'css_transform',               component: () => import(/* webpackChunkName: "css_transform" */ './views/css_transform.vue'),                               },
    { meta: { title: "CSS Flexbox"                                     }, path: '/css_flexbox',                 name: 'css_flexbox',                 component: () => import(/* webpackChunkName: "css_flexbox" */ './views/css_flexbox.vue'),                                   },
    { meta: { title: "配色エディター"                                  }, path: '/color_scheme',                name: 'color_scheme',                component: () => import(/* webpackChunkName: "color_scheme" */ './views/color_scheme.vue'),                                 },
    { meta: { title: "ストップウォッチ"                                }, path: '/stopwatch',                   name: 'stopwatch',                   component: () => import(/* webpackChunkName: "stopwatch" */ './views/stopwatch.vue'),                                       },
    { meta: { title: "ストレンジアトラクターエディター"                }, path: '/strange_attractor',           name: 'strange_attractor',           component: () => import(/* webpackChunkName: "strange_attractor" */ './views/strange_attractor.vue'),                       },
    { meta: { title: "CSS Position"                                    }, path: '/css_position',                name: 'css_position',                component: () => import(/* webpackChunkName: "css_position" */ './views/css_position.vue'),                                 },
    { meta: { title: "振動機能"                                        }, path: '/navigator_vibrate',           name: 'navigator_vibrate',           component: () => import(/* webpackChunkName: "navigator_vibrate" */ './views/navigator_vibrate.vue'),                       },
    { meta: { title: "CSS Filter"                                      }, path: '/css_filter',                  name: 'css_filter',                  component: () => import(/* webpackChunkName: "css_filter" */ './views/css_filter.vue'),                                     },
    { meta: { title: "CSS object-fit"                                  }, path: '/css_object_fit',              name: 'css_object_fit',              component: () => import(/* webpackChunkName: "css_object_fit" */ './views/css_object_fit.vue'),                             },
    { meta: { title: "HTML Audio"                                      }, path: '/html_audio_checker',          name: 'html_audio_checker',          component: () => import(/* webpackChunkName: "html_audio_checker" */ './views/html_audio_checker.vue'),                     },
    { meta: { title: "Web Audio API"                                   }, path: '/web_audio_api_checker',       name: 'web_audio_api_checker',       component: () => import(/* webpackChunkName: "web_audio_api_checker" */ './views/web_audio_api_checker.vue'),               },
    { meta: { title: "Web Audio API for Mobile"                        }, path: '/web_audio_api_for_mobile',    name: 'web_audio_api_for_mobile',    component: () => import(/* webpackChunkName: "web_audio_api_for_mobile" */ './views/web_audio_api_for_mobile.vue'),         },
    { meta: { title: "GoogleMapsのいちばん簡単な例"                    }, path: '/google_maps_basic',           name: 'google_maps_basic',           component: () => import(/* webpackChunkName: "google_maps_basic" */ './views/google_maps_basic.vue'),                       },
    { meta: { title: "FormTemplate"                                    }, path: '/form_template',               name: 'form_template',               component: () => import(/* webpackChunkName: "form_template" */ './views/form_template.vue'),                               },
    { meta: { title: "Google Geocoding API"                            }, path: '/google_geocoding_api',        name: 'google_geocoding_api',        component: () => import(/* webpackChunkName: "google_geocoding_api" */ './views/google_geocoding_api.vue'),                 },
    { meta: { title: "Ruby Code Transpiler"                            }, path: '/ruby_code_transpiler',        name: 'ruby_code_transpiler',        component: () => import(/* webpackChunkName: "ruby_code_transpiler" */ './views/ruby_code_transpiler.vue'),                 },
    { meta: { title: "一般向けフォームテンプレート"                    }, path: '/general_form_template',       name: 'general_form_template',       component: () => import(/* webpackChunkName: "general_form_template" */ './views/general_form_template.vue'),               },
    { meta: { title: "スライドショー (vue-carousel)"                   }, path: '/vue_carousel_test',           name: 'vue_carousel_test',           component: () => import(/* webpackChunkName: "vue_carousel_test" */ './views/vue_carousel_test.vue'),                       },
    { meta: { title: "mavonEditor Test"                                }, path: '/mavon_editor_test',           name: 'mavon_editor_test',           component: () => import(/* webpackChunkName: "mavon_editor_test" */ './views/mavon_editor_test.vue'),                       },
    { meta: { title: "逆ポーランド電卓"                                }, path: '/light_rpn',                   name: 'light_rpn',                   component: () => import(/* webpackChunkName: "light_rpn" */ './views/light_rpn.vue'),                                       },
    { meta: { title: "Google Maps Playground"                          }, path: '/google_maps_playground',      name: 'google_maps_playground',      component: () => import(/* webpackChunkName: "google_maps_playground" */ './views/google_maps_playground.vue'),             },
    { meta: { title: "全角半角変換"                                    }, path: '/form_zenhan',                 name: 'form_zenhan',                 component: () => import(/* webpackChunkName: "form_zenhan" */ './views/form_zenhan.vue'),                                   },
    { meta: { title: "ドラッグアンドドロップ (Vue.draggable)"          }, path: '/vue_draggable_test',          name: 'vue_draggable_test',          component: () => import(/* webpackChunkName: "vue_draggable_test" */ './views/vue_draggable_test.vue'),                     },
    { meta: { title: "パスワード入力"                                  }, path: '/password_form',               name: 'password_form',               component: () => import(/* webpackChunkName: "password_form" */ './views/password_form.vue'),                               },
    { meta: { title: "いろいろな曲線"                                  }, path: '/lissajous',                   name: 'lissajous',                   component: () => import(/* webpackChunkName: "lissajous" */ './views/lissajous.vue'),                                       },
    { meta: { title: "ドラッグアンドドロップ (プリミティブ)"           }, path: '/html5_drag_and_drop',         name: 'html5_drag_and_drop',         component: () => import(/* webpackChunkName: "html5_drag_and_drop" */ './views/html5_drag_and_drop.vue'),                   },
    { meta: { title: "ぷよぷよシミュレーター"                          }, path: '/puyosimu',                    name: 'puyosimu',                    component: () => import(/* webpackChunkName: "puyosimu" */ './views/puyosimu.vue'),                                         },
    { meta: { title: "お店検索 (Google Place API)"                     }, path: '/google_place_api',            name: 'google_place_api',            component: () => import(/* webpackChunkName: "google_place_api" */ './views/google_place_api.vue'),                         },
    { meta: { title: "三角ナビゲーション"                              }, path: '/arrow_cursor_navigation',     name: 'arrow_cursor_navigation',     component: () => import(/* webpackChunkName: "arrow_cursor_navigation" */ './views/arrow_cursor_navigation.vue'),           },
    { meta: { title: "右上配置の閉じる×ボタン"                        }, path: '/css_close_button_sample',     name: 'css_close_button_sample',     component: () => import(/* webpackChunkName: "css_close_button_sample" */ './views/css_close_button_sample.vue'),           },
    { meta: { title: "CSS 吹き出し"                                    }, path: '/css_balloon_sample',          name: 'css_balloon_sample',          component: () => import(/* webpackChunkName: "css_balloon_sample" */ './views/css_balloon_sample.vue'),                     },
    { meta: { title: "quill_test"                                      }, path: '/quill_test',                  name: 'quill_test',                  component: () => import(/* webpackChunkName: "quill_test" */ './views/quill_test.vue'),                                     },
    { meta: { title: "楽譜入力 (abcjs)"                                }, path: '/abcjs_test',                  name: 'abcjs_test',                  component: () => import(/* webpackChunkName: "abcjs_test" */ './views/abcjs_test.vue'),                                     },
    { meta: { title: "Markdown変換 (marked)"                           }, path: '/marked_test',                 name: 'marked_test',                 component: () => import(/* webpackChunkName: "marked_test" */ './views/marked_test.vue'),                                   },
    { meta: { title: "圧縮復元 (lzma)"                                 }, path: '/lzma_package_test',           name: 'lzma_package_test',           component: () => import(/* webpackChunkName: "lzma_package_test" */ './views/lzma_package_test.vue'),                       },
    { meta: { title: "コードフォーマット (prism)"                      }, path: '/prism_test',                  name: 'prism_test',                  component: () => import(/* webpackChunkName: "prism_test" */ './views/prism_test.vue'),                                     },
    { meta: { title: "単一アップロードファイルプレビュー (FileReader)" }, path: '/uploaed_files_preview',       name: 'uploaed_files_preview',       component: () => import(/* webpackChunkName: "uploaed_files_preview" */ './views/uploaed_files_preview.vue'),               },
    { meta: { title: "単一アップロードファイルプレビュー (FileReader)" }, path: '/uploaed_file_preview',        name: 'uploaed_file_preview',        component: () => import(/* webpackChunkName: "uploaed_file_preview" */ './views/uploaed_file_preview.vue'),                 },
    { meta: { title: "テキストエリア縦幅自動調整"                      }, path: '/textarea_test',               name: 'textarea_test',               component: () => import(/* webpackChunkName: "textarea_test" */ './views/textarea_test.vue'),                               },
    { meta: { title: "JavaScript コンソール (ES2015変換)"              }, path: '/babel_transform',             name: 'babel_transform',             component: () => import(/* webpackChunkName: "babel_transform" */ './views/babel_transform.vue'),                           },
    { meta: { title: "JavaScript コンソール"                           }, path: '/js_console',                  name: 'js_console',                  component: () => import(/* webpackChunkName: "js_console" */ './views/js_console.vue'),                                     },
    { meta: { title: "グラフ描画 (chart.js)"                           }, path: '/chartjs_test',                name: 'chartjs_test',                component: () => import(/* webpackChunkName: "chartjs_test" */ './views/chartjs_test.vue'),                                 },
    { meta: { title: "Howlerを使ったサウンド再生テスト"                }, path: '/howler_simple_test',          name: 'howler_simple_test',          component: () => import(/* webpackChunkName: "howler_simple_test" */ './views/howler_simple_test.vue'),                     },
    { meta: { title: "各種フォーマットのサウンド再生テスト (Howler)"   }, path: '/howler_play_format_test',     name: 'howler_play_format_test',     component: () => import(/* webpackChunkName: "howler_play_format_test" */ './views/howler_play_format_test.vue'),           },
    { meta: { title: "スプラトゥーン2ブキクイズ1"                      }, path: '/splatoon_weapon_quiz1',       name: 'splatoon_weapon_quiz1',       component: () => import(/* webpackChunkName: "splatoon_weapon_quiz1" */ './views/splatoon_weapon_quiz1.vue'),               },
    { meta: { title: "スプラトゥーン2ブキクイズ2", layout: "simple",   }, path: '/splatoon_weapon_quiz2',       name: 'splatoon_weapon_quiz2',       component: () => import(/* webpackChunkName: "splatoon_weapon_quiz2" */ './views/splatoon_weapon_quiz2.vue'),               },
    { meta: { title: "スプラトゥーン2ブキクイズ"                       }, path: '/splatoon_weapon_quiz3',       name: 'splatoon_weapon_quiz3',       component: () => import(/* webpackChunkName: "splatoon_weapon_quiz3" */ './views/splatoon_weapon_quiz3.vue'),               },
    { meta: { title: "JplistTest"                                      }, path: '/jplist_test',                 name: 'jplist_test',                 component: () => import(/* webpackChunkName: "jplist_test" */ './views/jplist_test.vue'),                                   },
    { meta: { title: "クリップボードへのコピー"                        }, path: '/clipboard_copy_test',         name: 'clipboard_copy_test',         component: () => import(/* webpackChunkName: "clipboard_copy_test" */ './views/clipboard_copy_test.vue'),                   },
    { meta: { title: "SassTest"                                        }, path: '/sass_test',                   name: 'sass_test',                   component: () => import(/* webpackChunkName: "sass_test" */ './views/sass_test.vue'),                                       },
    { meta: { title: "文字列を途中で切る"                              }, path: '/css_truncate',                name: 'css_truncate',                component: () => import(/* webpackChunkName: "css_truncate" */ './views/css_truncate.vue'),   },
    { meta: { title: "TiptapTest"                                      }, path: '/tiptap_test',                 name: 'tiptap_test',                 component: () => import(/* webpackChunkName: "tiptap_test" */ './views/tiptap_test.vue'),                                   },
    { meta: { title: "TinyMCE"                                         }, path: '/tinymce_vue_test',            name: 'tinymce_vue_test',            component: () => import(/* webpackChunkName: "tinymce_vue_test" */ './views/tinymce_vue_test.vue'),                         },
    { meta: { title: "CSS 背景パターン"                                }, path: '/css_pattern_test',            name: 'css_pattern_test',            component: () => import(/* webpackChunkName: "css_pattern_test" */ './views/css_pattern_test.vue'),                         },
    { meta: { title: "CSS アニメーション 再スタート"                   }, path: '/css_animation_restart',       name: 'css_animation_restart',       component: () => import(/* webpackChunkName: "css_animation_restart" */ './views/css_animation_restart.vue'),               },
    { meta: { title: "CSS スタイル実験"                                }, path: '/css_pattern_test2',           name: 'css_pattern_test2',           component: () => import(/* webpackChunkName: "css_pattern_test2" */ './views/css_pattern_test2.vue'),                       },
    { meta: { title: "vue-script2: 自分でscript2に変換して張る→成功", }, path: '/vue_script2_test1',           name: 'vue_script2_test1',           component: () => import(/* webpackChunkName: "vue_script2_test1" */ './views/vue_script2_test1.vue'),                       },
    { meta: { title: "vue-script2: 自動で変換してv-htmlで入力→失敗",  }, path: '/vue_script2_test2',           name: 'vue_script2_test2',           component: () => import(/* webpackChunkName: "vue_script2_test2" */ './views/vue_script2_test2.vue'),                       },
  ]
})
