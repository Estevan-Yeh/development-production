/**
 * 生产配置
 */

const merge = require('webpack-merge') // 合并配置
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将 css 单独打包成文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css

module.exports = merge(BaseConfig('production'), {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        jquery: {
          name: 'chunk-jquery',
          priority: 15,
          test: /[\\/]node_modules[\\/]jquery[\\/]/
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:5].css',
      chunkFilename: 'css/[id]-[hash:5].css'
    }),
    // 压缩 css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'), // CSS处理器
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
      canPrint: true // 指示插件是否可以将消息打印到控制台，默认为 true
    })
  ]
})
