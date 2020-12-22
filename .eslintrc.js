module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:cypress/recommended',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  globals: {
    PR: true
  },
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'nuxt/no-cjs-in-config': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/no-v-html': 'off',
    'vue/no-unused-components': 'off',
    'nuxt/no-env-in-hooks': 'off',
    'indent': [2, 2, {'SwitchCase': 1}],
  }
}
