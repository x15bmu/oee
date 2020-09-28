module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  extends: [
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:jest/recommended',
  ],
  ignorePatterns: ['.eslintrc.js', 'jest.config.js'],
  rules: {
    'jsx-a11y/anchor-is-valid': ['error', {
      'components': ['Link'],
      'specialLink': ['hrefLeft', 'hrefRight'],
      'aspects': ['invalidHref', 'preferButton'],
    }],
  },
};