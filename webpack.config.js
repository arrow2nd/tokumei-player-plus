/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevelop = process.env.NODE_ENV === 'development'

// 共通設定
const base = {
  mode: isDevelop ? 'development' : 'production',
  experiments: {
    asset: true
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: './',
    filename: '[name].js',
    assetModuleFilename: 'images/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelop
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', 'json']
  },
  devtool: isDevelop ? 'inline-source-map' : false
}

// main.js
const main = {
  ...base,
  target: 'electron-main',
  entry: {
    main: path.resolve(__dirname, 'src', 'main.ts')
  }
}

// preload.js
const preload = {
  ...base,
  target: 'electron-preload',
  entry: {
    preload: path.resolve(__dirname, 'src', 'preload.ts')
  }
}

// renderer.js
const renderer = {
  ...base,
  target: 'web',
  entry: {
    renderer: path.resolve(__dirname, 'src', 'renderer.tsx')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: 'body',
      minify: isDevelop
    }),
    new MiniCssExtractPlugin()
  ]
}

module.exports = [main, preload, renderer]
