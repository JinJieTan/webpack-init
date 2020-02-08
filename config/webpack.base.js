const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const hardSourcePlugin = require('hard-source-webpack-plugin');
module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico')
    }),
    new webpack.NamedModulesPlugin(),
    new hardSourcePlugin()
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.ts(x?)$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  //jsx语法
                  presets: [['@babel/preset-env', { modules: false }]],
                  cacheDirectory: true
                }
              },
              {
                loader: 'awesome-typescript-loader'
              }
            ]
          },
          {
            test: /\.(less|css)$/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader'
              },
              {
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true
                }
              }
            ]
          }
        ]
      }
    ]
  }
};
