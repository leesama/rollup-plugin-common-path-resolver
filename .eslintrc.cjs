module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'commitlint.config.cjs'],
  parser: '@typescript-eslint/parser'
}
