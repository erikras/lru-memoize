'use strict';
var webpack = require('webpack');

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

module.exports = {
  externals: {
    'react': reactExternal
  },
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
