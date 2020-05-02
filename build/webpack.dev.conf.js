/**
 * 开发配置
 */

const BaseConfig = require('./webpack.base.conf')

const webpack = require('webpack')
const merge = require('webpack-merge') // 合并配置

const path = require('path')

module.exports = merge(BaseConfig('development'), {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    port: 8888,
    hot: true,
    // 浏览器显示错误
    overlay: true,
    // 代理解决跨域
    proxy: {
      '/comments': {
        target: 'https://m.weibo.cn',
        changeOrigin: true,
        logLevel: 'debug',
        herders: {},
        // 找不到页面默认跳到 index
        historyApiCallback: true
      }
    }
  },
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // 显示模块相对路径
    new webpack.NamedModulesPlugin()
  ]
})
