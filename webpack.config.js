const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist')
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  devServer: {
    contentBase: path.resolve('src'),
    hot: true,
    open: true,
    port: 8000,
    watchContentBase: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'REACT_APP_LAST_FM_ACCESS_TOKEN': JSON.stringify(process.env.REACT_APP_LAST_FM_ACCESS_TOKEN),
        'REACT_APP_MUSIXMATCH_ACCESS_TOKEN': JSON.stringify(process.env.REACT_APP_MUSIXMATCH_ACCESS_TOKEN),
        'REACT_APP_SPOTIFY_ACCESS_TOKEN': JSON.stringify(process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN),
        'MAPBOX_ACCESS_TOKEN': JSON.stringify(process.env.MAPBOX_ACCESS_TOKEN)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new Dotenv()
  ]
}
