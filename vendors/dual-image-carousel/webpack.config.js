const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'src'),
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, './src'),
    hot: true,
    open: true,
    watchContentBase: true,
    port: 3001,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/index.html', to: '' },
        { from: 'src/assets', to: 'assets' },
      ]
    })
  ]
});