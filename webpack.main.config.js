'use strict';

process.env.BABEL_ENV = 'main';

const path = require('path');
const webpack = require('webpack');
const BabiliPlugin = require("babili-webpack-plugin");

const pkg = require('./app/package.json');

const isProduction = process.env.NODE_ENV === 'production';

let mainConfig = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ?
    '' : 'source-map',
  entry: {
    main: ['babel-polyfill', path.join(__dirname, 'app/src/main/index.js')]
  },
  externals: Object.keys(pkg.dependencies || {}),
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader'
      // }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'app/dist')
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: [
      '.js', '.json', '.node'
    ]
    //modules: [path.join(__dirname, 'app/node_modules')]
  },
  target: 'electron-main'
};

if (isProduction) {
  mainConfig.plugins.push(new BabiliPlugin({}, {
    comments: false
  }))
}

module.exports = mainConfig;
