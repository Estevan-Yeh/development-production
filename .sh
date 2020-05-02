# webpack
npm i webpack webpack-cli webpack-dev-server -D

# 删除 dist
npm i clean-webpack-plugin -D

# babel7
npm i @babel/core babel-loader @babel/preset-env @babel/plugin-transform-runtime -D
# ES6 内置方法和函数转化垫片、重复使用 Babel 注入的程序代码
npm i @babel/polyfill @babel/runtime -S

# jq
npm i jquery -S

# 自动生成 html
npm i html-webpack-plugin html-loader -D

# css/字体图标处理依赖
npm i css-loader style-loader mini-css-extract-plugin optimize-css-assets-webpack-plugin -D

# css 前缀
npm install postcss-loader autoprefixer -D

# less
npm i less less-loader -D

# 图片/字体处理
npm i url-loader file-loader -D
cnpm i image-webpack-loader -D

# webpack 中使用 img 标签
cnpm i html-withimg-loader -D
