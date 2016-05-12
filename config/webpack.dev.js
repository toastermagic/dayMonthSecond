const webpack = require('webpack');
const config = require('./webpack.config.js');

// server address
const SERVER_HOST = 'localhost';
const SERVER_PORT = '4200';

config.devtool = 'eval-source-map';
config.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:'vendor.js', minChunks: Infinity})
);
config.devServer = {
  quiet: false,
  noInfo: false,
  contentBase: './wwwroot',
  historyApiFallback: true,
  host: SERVER_HOST,
  port: SERVER_PORT,
  inline: true,
  watchOptions: {
      aggregateTimeout: 250
  },
  stats: {
      assets: true,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false
  },
  publicPath: '/',
  outputPath: './wwwroot'
};

module.exports = config;
