module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    es2022: true,
  },
  plugins: ['@typescript-eslint/eslint-plugin', '@darraghor/nestjs-typed'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@darraghor/nestjs-typed/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  overrides: [
    {
      files: ['**/seeders/**/*', '**/migrations/**/*'],
      rules: {
        '@darraghor/nestjs-typed/injectable-should-be-provided': 'off',
      },
    },
  ],
  rules: {
    '@darraghor/nestjs-typed/api-method-should-specify-api-response': 'off',
    '@darraghor/nestjs-typed/api-property-matches-property-optionality': 'off',
    '@darraghor/nestjs-typed/controllers-should-supply-api-tags': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
