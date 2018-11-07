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
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-constant-condition': 'off',
  },
  globals: {
    "inspect": true,
    "_": true,
    "Opal": true,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
