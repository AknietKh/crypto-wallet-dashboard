module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'airbnb-base',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'vue/multi-word-component-names': 'off',
    'linebreak-style': 'off',
    '@typescript-eslint/ban-ts-comment': ['off'],
    'import/extensions': ['off'],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsForRegex: ['^state'] }],
    'no-console': 'off',
    'max-len': ['error', { code: 150 }]
  },
  settings: {
    'import/resolver': {
      nuxt: {
        extensions: ['.ts', '.json', '.js', '.vue']
      }
    }
  }
}
