'use strict';

process.env.BABEL_ENV = 'renderer';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const pkg = require('./app/package.json');

const isProduction = process.env.NODE_ENV === 'production';

let rendererConfig = {
  // fabric JS
  externals: {
    'canvas-prebuilt': 'undefined',
    'canvas': 'undefined',
    'jsdom/lib/jsdom/utils': JSON.stringify({ Canvas: null }),
    'jsdom/lib/jsdom/living/generated/utils': JSON.stringify({ implForWrapper: null }),
    'jsdom': 'null',
    'xmldom': JSON.stringify({ DOMParser: null }),
  },
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ?
    '' : 'source-map',
  devServer: {
    overlay: true
  },
  entry: {
    renderer: [
      'babel-polyfill', path.join(__dirname, 'app/src/renderer/main.js')
    ]
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }, {
      test: /\.html$/,
      use: 'vue-html-loader'
    }, {
      test: /\.js$/,
      exclude: /(?:node_modules|dist)/,
      include: [path.resolve(__dirname, 'app/src/renderer')],
      use: 'babel-loader'
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    // {
    //   test: /\.json$/,
    //   use: 'json-loader'
    // },
    {
      test: /\.scss$/,
      use: [
        !isProduction ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            data: '@import "./app/src/renderer/scss/variables.scss";'
          }
        }
      ],
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      exclude: /node_modules/,
      loaders: [
        'file-loader?context=src/renderer/img&name=/imgs/[name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true
            },
            gifsicle: {
              interlaced: false
            },
            optipng: {
              optimizationLevel: 4
            },
            pngquant: {
              quality: '75-90',
              speed: 3
            }
          }
        }
      ],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '/fonts/[name].[ext]'
        }
      }
    }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack
      .optimize
      .OccurrenceOrderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isProduction ?
          '"production"' : '"development"'
      }
    }),
    // new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.ejs',
      appModules: !isProduction ?
        path.resolve(__dirname, 'app/node_modules') : false
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack
    // .optimize
    // .CommonsChunkPlugin({
    //   name: 'node-static',
    //   minChunks(module, count) {
    //     var context = module.context;
    //     return context && context.indexOf('node_modules') >= 0;
    //   }
    // }),
    // new webpack
    // .optimize
    // .CommonsChunkPlugin({
    //   async: 'multi-package',
    //   minChunks(module, count) {
    //     return count >= 2;
    //   }
    // }),
    // new webpack
    // .optimize
    // .CommonsChunkPlugin({
    //   name: 'vue-build',
    //   minChunks(module, count) {
    //     var context = module.context;
    //     return context && (context.indexOf('node_modules/vue') >= 0);
    //   }
    // })
  ],
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       "node-static": {
  //         test: /node_modules/,
  //         chunks: "initial",
  //         name: "node-static",
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  output: {
    //filename: '[name].js',
    filename: '[name]-bundle.js',
    chunkFilename: '[name]-chunk.js',
    //libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'app/dist')
  },
  resolve: {
    alias: {
      'components': path.join(__dirname, 'app/src/renderer/components'),
      'containers': path.join(__dirname, 'app/src/renderer/containers'),
      'img': path.join(__dirname, 'app/src/renderer/img'),
      'renderer': path.join(__dirname, 'app/src/renderer')
    },
    extensions: [
      '.js',
      '.vue',
      '.json',
      '.css',
      '.node',
      '.scss'
    ],
    modules: [
      path.join(__dirname, 'app/node_modules'),
      path.join(__dirname, 'node_modules')
    ]
  },
  target: 'electron-renderer'
};

if (isProduction) {
  rendererConfig
    .plugins
    .push(new BabiliPlugin({}, {
      comments: false
    }))
} else {
  // rendererConfig
  //   .plugins
  //   .push(new BundleAnalyzerPlugin({analyzerMode: 'static'}))
}

module.exports = rendererConfig;
