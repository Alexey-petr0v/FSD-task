const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    pages: path.resolve(__dirname, "pages"),
    dist: path.resolve(__dirname, "dist"),
    blocks: path.resolve(__dirname, "blocks"),
}

module.exports = {
  entry: {
    bundle: PATHS.pages + "/index.js"
  },
  output: {
    filename: "[name].js",
    path: PATHS.dist,
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: PATHS.pages + '/index.pug',
        filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
        template: PATHS.pages + '/colors-and-type.pug',
        filename: 'colors-and-type.html'
    }),
    new HtmlWebpackPlugin({
        template: PATHS.pages + '/form-elements.pug',
        filename: 'form-elements.html'
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
    }),
    new CopyWebpackPlugin([
      {from: PATHS.blocks + '/blocks/**/*.svg', to:'images', flatten: true}
    ]),
    new CopyWebpackPlugin([
      {from: PATHS.blocks + '/blocks/**/*.img', to:'images', flatten: true}
    ]),
    new CopyWebpackPlugin([
      {from: PATHS.blocks + '/blocks/**/*.png', to:'images', flatten: true}
    ]),
    new CopyWebpackPlugin([
      {from: PATHS.blocks + '/blocks/**/*.gif', to:'images', flatten: true}
    ]),
    new CopyWebpackPlugin([
      {from: PATHS.blocks + '/blocks/**/fonts/*', to:'fonts', flatten: true}
    ])
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          },
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
            pretty: true
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
                 {
                     loader: 'file-loader?name=./fonts/[name].[ext]'
                 }
             ]
    }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, PATHS.dist)
  }
}