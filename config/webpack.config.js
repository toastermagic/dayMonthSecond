const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');

const Auth0Config = require('./auth0.prod.json');
const helpers = require('./helpers');

const METADATA = {
  title: 'dm-rc0',
  baseUrl: '/'
};

module.exports = {
  cache: true,

  metadata: METADATA,

  entry: {
    vendor: [
      //    polyfills needed if core.js not referenced separately (also add "core-js": "^2.3.0" to package.json):
      //    'core-js/es6/array',
      //    'core-js/es6/map',
      //    'core-js/es6/string',
      //    'core-js/es6/symbol',
      //    'core-js/es7/reflect',

      //    if we want to go with the angular2 provided zone + reflect-metadata
      //    'angular2/bundles/angular2-polyfills',

      'zone.js/dist/zone',
      './src/vendor',
      'auth0-lock'
    ],
    app: [
      './src/main',
    ]
  },

  proxy: {
    '/api*': {
      target: 'http://127.0.0.1:5000/api',
      secure: false
    }
  },

  output: {
    filename: '[name].js',
    path: path.resolve('./wwwroot'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['', '.js', '.ts'],
    modulesDirectories: ['node_modules'],
    root: path.resolve('./src'),

    alias: {
      'angular2/core': helpers.root('node_modules/@angular/core/index.js'),
      'angular2/testing': helpers.root('node_modules/@angular/core/testing.js'),
      '@angular/testing': helpers.root('node_modules/@angular/core/testing.js'),
      'angular2/platform/browser': helpers.root('node_modules/@angular/platform-browser/index.js'),
      'angular2/router': helpers.root('node_modules/@angular/router-deprecated/index.js'),
      'angular2/http': helpers.root('node_modules/@angular/http/index.js'),
      'angular2/http/testing': helpers.root('node_modules/@angular/http/testing.js')
    }
    // alias: {
    //   'Auth0Lock': helpers.root('node_modules/auth0-lock/index.js')      
    // }
  },


  module: {
    loaders: [
      {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
        loaders: [
          'transform-loader/cacheable?brfs',
          'transform-loader/cacheable?packageify'
        ]
      },
      {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
        loader: 'transform-loader/cacheable?ejsify'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ts$/,
        exclude: [/\.spec\.ts$/, 'node_modules'],
        loader: 'ts'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'raw-loader!sass-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|otf)/,
        loader: 'url-loader'
      }
    ],

    noParse: [/zone\.js\/dist\/.+/]
  },

  ts: {
    transpileOnly: true
  },

  tslint: {
    emitErrors: true,
    failOnHint: true,
    resourcePath: 'src'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Angular2 Webpack Polyfill Demo',
      chunksSortMode: 'none',
      filename: 'index.html',
      cache: true,
      hash: false,
      inject: 'body',
      template: './src/index.html',
      minify: {
        removeComments: false,
        collapseWhitespace: false
      }
    }),
    new webpack.DefinePlugin({
      'AUTH0_CLIENTID': '"' + Auth0Config.ClientId + '"',
      'AUTH0_DOMAIN': '"' + Auth0Config.Domain + '"'
    }),
    new CopyWebpackPlugin([
      // Copy directory contents to {output}/to/directory/ 
      { from: 'node_modules/bootstrap', to: 'node_modules/bootstrap' }
    ])
  ]
};
