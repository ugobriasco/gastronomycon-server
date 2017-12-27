module.exports = {
  extends: 'prettier',
  env: { node: true },
  globals: {
    describe: true,
    beforeEach: true,
    it: true,
    test: true,
    expect: true,
    should: true,
    afterEach: true
  },
  parserOptions: {
    ecmaVersion: 8
  }
};
