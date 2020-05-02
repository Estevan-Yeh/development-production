/**
 * 基础配置
 */
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将 css 单独打包成文件
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin

const path = require('path')

// js
const scriptLoader = [
  {
    loader: 'babel-loader'
  }
]

// css
// development 模式下 css 嵌入 style
const cssLoader = ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
// production 模式下 css 单独打包
const cssExtractLoader = [
  {
    loader: MiniCssExtractPlugin.loader
  },
  'css-loader',
  'less-loader', // 使用 less-loader 将 less 转为 css
  'postcss-loader' // 使用 postcss 为 css 加上浏览器前缀
]

// font
const fontLoader = [
  {
    loader: 'url-loader',
    options: {
      name: '[name]-[hash:5].min.[ext]',
      limit: 5000, // 小于 5kb 使用 base64
      publicPath: 'fonts/',
      outputPath: 'fonts/'
    }
  }
]

// image
const imageLoader = [
  {
    loader: 'url-loader',
    options: {
      name: '[name]-[hash:5].min.[ext]',
      limit: 10000,
      outputPath: 'images/',
      // 解决与 html-webpack-plugin 的冲突
      esModule: false
    }
  },
  {
    loader: 'image-webpack-loader',
    options: {
      // 压缩 jpg/jpeg 图片
      mozjpeg: {
        progressive: true,
        quality: 65 // 压缩率
      },
      // 压缩 png 图片
      pngquant: {
        quality: '65-90',
        speed: 4
      }
    }
  }
]

// 基础插件
const plugins = [new webpack.ProvidePlugin({ $: 'jquery' }), new CleanWebpackPlugin()]

const BaseConfig = env => {
  const styleLoader =
    env === 'production'
      ? cssExtractLoader // 生产环境下压缩 css 代码
      : cssLoader // 开发环境：页内样式嵌入

  const config = {
    entry: { index: './src/app.js' },
    output: {
      // 打包路径
      publicPath: env === 'production' ? './' : '/',
      path: path.resolve(__dirname, '..', 'dist'),
      filename: 'js/[name]-[hash:5].bundle.js',
      chunkFilename: 'js/[name]-[hash:5].chunk.js'
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /(node_modules)/, use: scriptLoader },
        { test: /\.(sa|sc|c)ss$/, use: styleLoader },
        { test: /\.(eot|woff2?|ttf|svg)$/, use: fontLoader },
        { test: /\.(png|jpg|jpeg|gif)$/, use: imageLoader },
        {
          test: /\.html$/,
          loader: 'html-withimg-loader'
        }
      ]
    }
  }

  // 根据 entry 自动生成 HtmlWebpackPlugin 配置，配置多页面
  for (const key in config.entry) {
    plugins.push(
      new HtmlWebpackPlugin({
        filename: `${key}.html`,
        template: path.resolve(__dirname, '..', `${key}.html`),
        minify: {
          // 压缩 HTML 文件
          removeComments: true, // 移除 HTML 中的注释
          collapseWhitespace: true, // 删除空白符与换行符
          minifyCSS: true,
          minifyJS: true
        },
        chunks: [key, 'jquery']
      })
    )
  }

  config.plugins = plugins
  return config
}

module.exports = BaseConfig
