const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    }),
    new HTMLPlugin({
      template:
        '!!ejs-compiled-loader!' +
        path.join(__dirname, '../client/server.template.ejs'),
      filename: 'server.ejs'
    })
  ]
})

if (isDev) {
  // 形成一个 source map，可以调试我们的源代码，而不是编译后的代码
  config.devtool = '#cheap-module-eval-source-map'
  config.entry = {
    app: ['react-hot-loader/patch', path.join(__dirname, '../client/app.js')]
  }
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    compress: true,
    // contentBase: path.join(__dirname, '../dist'),
    overlay: {
      errors: true
    },
    publicPath: '/public/',
    hotOnly: true,
    // 配置对应关系，配置所有404请求都到这个页面
    // 如果 js 文件访问不到，把项目目录里的 dist 文件夹删除即可
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: {
      '/api': 'http://localhost:3333'
    }
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config
