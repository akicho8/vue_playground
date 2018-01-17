module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-constant-condition': 'off',
    'no-unused-vars': 'off',
  },
  globals: {
    inspect: true,
    _: true,
    Opal: true,
    google: true,
    jplist: true,
    tinymce: true,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
