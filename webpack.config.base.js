'use strict';
var webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'LruMemoize',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js']
  }
};
