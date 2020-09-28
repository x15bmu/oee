module.exports = {
  preset: 'ts-jest',
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    // See here: https://www.gitmemory.com/issue/zeit/next.js/8663/552344217
    "ts-jest": {
      tsConfig: "tsconfig.jest.json"
    }
  },
};