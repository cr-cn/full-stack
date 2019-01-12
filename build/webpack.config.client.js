const path = require("path");
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const config = {
  entry: {
    app: path.join(__dirname, "../client/app.js")
  },
  output: {
    filename: "[name].[hash].js",
    path: path.join(__dirname, "../dist"),
    publicPath: "/public/"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /.(js|jsx)$/,
        loader: "eslint-loader",
        exclude: [path.resolve(__dirname, "../node_modules")]
      },
      {
        test: /.jsx$/,
        loader: "babel-loader"
      },
      {
        test: /.js$/,
        loader: "babel-loader",
        exclude: [path.join(__dirname, "../node_modules")]
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, "../client/template.html")
    })
  ]
};

if (isDev) {
  config.entry = {
    app: ["react-hot-loader/patch", path.join(__dirname, "../client/app.js")]
  };
  config.devServer = {
    host: "0.0.0.0",
    port: "8888",
    contentBase: path.join(__dirname, "../dist"),
    overlay: {
      errors: true
    },
    publicPath: "/public",
    hotOnly: true,
    // 配置对应关系，配置所有404请求都到这个页面
    // 如果 js 文件访问不到，把项目目录里的 dist 文件夹删除即可
    historyApiFallback: {
      index: "/public/index.html"
    }
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}

module.exports = config;
