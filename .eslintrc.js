module.exports = {
  root         : true,
  parser       : 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env          : {
    browser: true,
    node   : true
  },
  extends      : 'airbnb-base',
  plugins      : [
    'html'
  ],
  'rules'      : {
    'arrow-parens'            : ['off'],
    'global-require'          : 0,
    'import/no-unresolved'    : 0,
    'no-param-reassign'       : 0,
    'comma-dangle'            : 'off',
    'generator-star-spacing'  : 'off',
    'no-shadow'               : 0,
    'no-console'              : 0,
    'no-unused-vars'          : 0,
    'new-cap'                 : 0,
    'newline-per-chained-call': 0,
    'no-unreachable'          : 0,
    'max-len'                 : ['error', 120, { 'ignoreComments': true, 'ignoreStrings': true, 'ignoreUrls': true }],
    // allow debugger during development
    'no-debugger'             : process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
