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

    { path: '/html5_geolocation_api',       name: 'html5_geolocation_api',       component: () => import(/* webpackChunkName: "html5_geolocation_api" */ './views/html5_geolocation_api.vue'),         },
    { path: '/css_transform',               name: 'css_transform',               component: () => import(/* webpackChunkName: "css_transform" */ './views/css_transform.vue'),                         },
    { path: '/css_flexbox',                 name: 'css_flexbox',                 component: () => import(/* webpackChunkName: "css_flexbox" */ './views/css_flexbox.vue'),                             },
    { path: '/color_scheme',                name: 'color_scheme',                component: () => import(/* webpackChunkName: "color_scheme" */ './views/color_scheme.vue'),                           },
    { path: '/stopwatch',                   name: 'stopwatch',                   component: () => import(/* webpackChunkName: "stopwatch" */ './views/stopwatch.vue'),                                 },
    { path: '/strange_attractor',           name: 'strange_attractor',           component: () => import(/* webpackChunkName: "strange_attractor" */ './views/strange_attractor.vue'),                 },
    { path: '/css_position',                name: 'css_position',                component: () => import(/* webpackChunkName: "css_position" */ './views/css_position.vue'),                           },
    { path: '/navigator_vibrate',           name: 'navigator_vibrate',           component: () => import(/* webpackChunkName: "navigator_vibrate" */ './views/navigator_vibrate.vue'),                 },
    { path: '/css_filter',                  name: 'css_filter',                  component: () => import(/* webpackChunkName: "css_filter" */ './views/css_filter.vue'),                               },
    { path: '/css_object_fit',              name: 'css_object_fit',              component: () => import(/* webpackChunkName: "css_object_fit" */ './views/css_object_fit.vue'),                       },
    { path: '/html_audio_checker',          name: 'html_audio_checker',          component: () => import(/* webpackChunkName: "html_audio_checker" */ './views/html_audio_checker.vue'),               },
    { path: '/web_audio_api_checker',       name: 'web_audio_api_checker',       component: () => import(/* webpackChunkName: "web_audio_api_checker" */ './views/web_audio_api_checker.vue'),         },
    { path: '/web_audio_api_for_mobile',    name: 'web_audio_api_for_mobile',    component: () => import(/* webpackChunkName: "web_audio_api_for_mobile" */ './views/web_audio_api_for_mobile.vue'),   },
    { path: '/google_maps_basic',           name: 'google_maps_basic',           component: () => import(/* webpackChunkName: "google_maps_basic" */ './views/google_maps_basic.vue'),                 },
    { path: '/form_template',               name: 'form_template',               component: () => import(/* webpackChunkName: "form_template" */ './views/form_template.vue'),                         },
    { path: '/google_geocoding_api',        name: 'google_geocoding_api',        component: () => import(/* webpackChunkName: "google_geocoding_api" */ './views/google_geocoding_api.vue'),           },
    { path: '/ruby_code_transpiler',        name: 'ruby_code_transpiler',        component: () => import(/* webpackChunkName: "ruby_code_transpiler" */ './views/ruby_code_transpiler.vue'),           },
    { path: '/general_form_template',       name: 'general_form_template',       component: () => import(/* webpackChunkName: "general_form_template" */ './views/general_form_template.vue'),         },
    { path: '/vue_carousel_test',           name: 'vue_carousel_test',           component: () => import(/* webpackChunkName: "vue_carousel_test" */ './views/vue_carousel_test.vue'),                 },
    { path: '/mavon_editor_test',           name: 'mavon_editor_test',           component: () => import(/* webpackChunkName: "mavon_editor_test" */ './views/mavon_editor_test.vue'),                 },
    { path: '/light_rpn',                   name: 'light_rpn',                   component: () => import(/* webpackChunkName: "light_rpn" */ './views/light_rpn.vue'),                                 },
    { path: '/google_maps_playground',      name: 'google_maps_playground',      component: () => import(/* webpackChunkName: "google_maps_playground" */ './views/google_maps_playground.vue'),       },
    { path: '/form_zenhan',                 name: 'form_zenhan',                 component: () => import(/* webpackChunkName: "form_zenhan" */ './views/form_zenhan.vue'),                             },
    { path: '/vue_draggable_test',          name: 'vue_draggable_test',          component: () => import(/* webpackChunkName: "vue_draggable_test" */ './views/vue_draggable_test.vue'),               },
    { path: '/password_form',               name: 'password_form',               component: () => import(/* webpackChunkName: "password_form" */ './views/password_form.vue'),                         },
    { path: '/lissajous',                   name: 'lissajous',                   component: () => import(/* webpackChunkName: "lissajous" */ './views/lissajous.vue'),                                 },
    { path: '/html5_drag_and_drop',         name: 'html5_drag_and_drop',         component: () => import(/* webpackChunkName: "html5_drag_and_drop" */ './views/html5_drag_and_drop.vue'),             },
    { path: '/puyosimu',                    name: 'puyosimu',                    component: () => import(/* webpackChunkName: "puyosimu" */ './views/puyosimu.vue'),                                   },
    { path: '/google_place_api',            name: 'google_place_api',            component: () => import(/* webpackChunkName: "google_place_api" */ './views/google_place_api.vue'),                   },
    { path: '/arrow_cursor_navigation',     name: 'arrow_cursor_navigation',     component: () => import(/* webpackChunkName: "arrow_cursor_navigation" */ './views/arrow_cursor_navigation.vue'),     },
    { path: '/css_close_button_sample',     name: 'css_close_button_sample',     component: () => import(/* webpackChunkName: "css_close_button_sample" */ './views/css_close_button_sample.vue'),     },
    { path: '/css_balloon_sample',          name: 'css_balloon_sample',          component: () => import(/* webpackChunkName: "css_balloon_sample" */ './views/css_balloon_sample.vue'),               },
    { path: '/quill_test',                  name: 'quill_test',                  component: () => import(/* webpackChunkName: "quill_test" */ './views/quill_test.vue'),                               },
    { path: '/abcjs_test',                  name: 'abcjs_test',                  component: () => import(/* webpackChunkName: "abcjs_test" */ './views/abcjs_test.vue'),                               },
    { path: '/marked_test',                 name: 'marked_test',                 component: () => import(/* webpackChunkName: "marked_test" */ './views/marked_test.vue'),                             },
    { path: '/lzma_package_test',           name: 'lzma_package_test',           component: () => import(/* webpackChunkName: "lzma_package_test" */ './views/lzma_package_test.vue'),                 },
    { path: '/prism_test',                  name: 'prism_test',                  component: () => import(/* webpackChunkName: "prism_test" */ './views/prism_test.vue'),                               },
    { path: '/uploaed_files_preview',       name: 'uploaed_files_preview',       component: () => import(/* webpackChunkName: "uploaed_files_preview" */ './views/uploaed_files_preview.vue'), },
    { path: '/uploaed_file_preview',        name: 'uploaed_file_preview',        component: () => import(/* webpackChunkName: "uploaed_file_preview" */ './views/uploaed_file_preview.vue'), },
    { path: '/textarea_test',               name: 'textarea_test',               component: () => import(/* webpackChunkName: "textarea_test" */ './views/textarea_test.vue'),                         },
    { path: '/babel_transform',             name: 'babel_transform',             component: () => import(/* webpackChunkName: "babel_transform" */ './views/babel_transform.vue'),                     },
    { path: '/js_console',                  name: 'js_console',                  component: () => import(/* webpackChunkName: "js_console" */ './views/js_console.vue'),                     },
    { path: '/chartjs_test',                name: 'chartjs_test',                component: () => import(/* webpackChunkName: "chartjs_test" */ './views/chartjs_test.vue'),                     },
    { path: '/howler_simple_test',          name: 'howler_simple_test',          component: () => import(/* webpackChunkName: "howler_simple_test" */ './views/howler_simple_test.vue'),                     },
    { path: '/howler_play_format_test',     name: 'howler_play_format_test',     component: () => import(/* webpackChunkName: "howler_play_format_test" */ './views/howler_play_format_test.vue'),                     },
    { path: '/splatoon_weapon_quiz1',       name: 'splatoon_weapon_quiz1',       component: () => import(/* webpackChunkName: "splatoon_weapon_quiz1" */ './views/splatoon_weapon_quiz1.vue'),           },
    { path: '/splatoon_weapon_quiz2',       name: 'splatoon_weapon_quiz2',       component: () => import(/* webpackChunkName: "splatoon_weapon_quiz2" */ './views/splatoon_weapon_quiz2.vue'),                     meta: { layout: "simple", } },
    { path: '/splatoon_weapon_quiz3',       name: 'splatoon_weapon_quiz3',       component: () => import(/* webpackChunkName: "splatoon_weapon_quiz3" */ './views/splatoon_weapon_quiz3.vue'),                     },
    { path: '/jplist_test',                 name: 'jplist_test',                 component: () => import(/* webpackChunkName: "jplist_test" */ './views/jplist_test.vue'),                     },
    { path: '/clipboard_copy_test',         name: 'clipboard_copy_test',         component: () => import(/* webpackChunkName: "clipboard_copy_test" */ './views/clipboard_copy_test.vue'),                     },
    { path: '/sass_test',                   name: 'sass_test',                   component: () => import(/* webpackChunkName: "sass_test" */ './views/sass_test.vue'),                     },
    { path: '/text_overflow_ellipsis_test', name: 'text_overflow_ellipsis_test', component: () => import(/* webpackChunkName: "text_overflow_ellipsis_test" */ './views/text_overflow_ellipsis_test.vue'),                     },
    { path: '/tiptap_test',                 name: 'tiptap_test',                 component: () => import(/* webpackChunkName: "tiptap_test" */ './views/tiptap_test.vue'),                     },
    { path: '/tinymce_test',                name: 'tinymce_test',                component: () => import(/* webpackChunkName: "tinymce_test" */ './views/tinymce_test.vue'),                     },
  ]
})
