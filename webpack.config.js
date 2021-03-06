const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const $ = require("jquery");

const PATHS = {
  pages: path.resolve(__dirname, "pages"),
  docs: path.resolve(__dirname, "docs"),
  projBlocks: path.resolve(__dirname, "project.blocks"),
  libBlocks: path.resolve(__dirname, "library.blocks"),
}

module.exports = {
  entry: {
    bundle: PATHS.pages + "/index.js"
  },
  output: {
    filename: "[name].js",
    path: PATHS.docs,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery/dist/jquery.min.js",
      jQuery: "jquery/dist/jquery.min.js",
      "window.jQuery": "jquery/dist/jquery.min.js"
     }),
     new CopyWebpackPlugin([
       {from: PATHS.projBlocks + '/**/images/*', to:'images', flatten: true}
     ]),
     new CopyWebpackPlugin([
       {from: PATHS.projBlocks + '/**/fonts/*', to:'fonts', flatten: true}
     ]),
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
    new HtmlWebpackPlugin({
      template: PATHS.pages + '/cards.pug',
      filename: 'cards.html'
    }),
    new HtmlWebpackPlugin({
      template: PATHS.pages + '/headers-and-footers.pug',
      filename: 'headers-and-footers.html'
    }),
    new HtmlWebpackPlugin({
      template: PATHS.pages + '/search-room.pug',
      filename: 'search-room.html'
    }),
    new HtmlWebpackPlugin({
      template: PATHS.pages + '/room-details.pug',
      filename: 'room-details.html'
    }),
    new HtmlWebpackPlugin({
      template: PATHS.pages + '/registration.pug',
      filename: 'registration.html'
    }),
    new HtmlWebpackPlugin({
      template: PATHS.pages + '/sign-in.pug',
      filename: 'sign-in.html'
    }),
    new HtmlWebpackPlugin({
      template: PATHS.pages + '/sliders.pug',
      filename: 'sliders.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
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
        include: path.resolve(__dirname, 'project.blocks/fonts/'),
        use: [
                {
                  loader: 'file-loader?name=fonts/[name].[ext]'
                }
             ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        exclude: path.resolve(__dirname, 'project.blocks/fonts/'),
        use: [
                {
                  loader: 'file-loader?name=images/[name].[ext]'
                }
             ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, PATHS.docs)
  }
}