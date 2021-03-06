'use strict';

process.env.BABEL_ENV = 'main';

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const externals = require('./app/package.json').dependencies;

let mainConfig = {
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ?
    '' : 'source-map',
  entry: {
    main: path.join(__dirname, 'app/src/main/index.js')
  },
  externals: [
    ...Object.keys(externals || {})
  ],
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: './app/dist/main.js',
    path: __dirname
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.join(__dirname, 'app'), 'node_modules']
  },
  target: 'electron-main'
};

module.exports = mainConfig;
