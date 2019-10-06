const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolveLoader: {
    alias: {
      "file-loader": path.resolve(__dirname, "src", "file-loader"),
      "url-loader": path.resolve(__dirname, "src", "url-loader"),
      "babel-loader": path.resolve(__dirname, "src", "babel-loader"),
      "banner-loader": path.resolve(__dirname, "src", "banner-loader"),
      "style-loader": path.resolve(__dirname, "src", "style-loader"),
      "css-loader": path.resolve(__dirname, "src", "css-loader"),
      "less-loader": path.resolve(__dirname, "src", "less-loader")
    }
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(png|jpe?g|webp|gif)$/,
        use: {
          // loader: "file-loader" // 根据图片生成一个md5，保存到dist目录下，同时返回当前的图片路径

          // 经过file-loader处理路径，并根据limit转换成base64
          loader: "url-loader",
          options: {
            limit: 200 * 1024
          }
        }
      },
      {
        test: /\.js$/,
        use: [
          {
            // 生成文件注释
            loader: "banner-loader",
            options: {
              text: "qm",
              filename: path.resolve(__dirname, "src", "assets", "banner.txt")
            }
          },
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/env"]
            }
          }
        ]
      }
    ]
  }
};
