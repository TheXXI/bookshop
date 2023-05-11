const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new TerserWebpackPlugin(),
    new CssMinimizerPlugin(),
    new ESLintPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [ new TerserWebpackPlugin(), new CssMinimizerPlugin() ]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: ESLintPlugin.loader,
      }
    ],
  },
};