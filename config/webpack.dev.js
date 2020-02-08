const merge = require('webpack-merge');
const base_config = require('./webpack.base.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const dev_config = {
  mode: 'development',
  devServer: {
    contentBase: '.',
    open: true, //默认浏览器打开
    port: 2999, //端口号
    hot: true, //热更新选型
    progress: true, //进度条展示
    proxy: {
      //解决跨域问题
      '/api': {
        target: 'http://127.0.0.1:7878',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin()
  ] //webpack的热更新插件
};

module.exports = merge([base_config, dev_config]);
