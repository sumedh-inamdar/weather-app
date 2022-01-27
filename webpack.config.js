const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
      new HtmlWebpackPlugin({
          title: 'Weather App',
          minify: {
              collapseWhitespace: true,
          },
          hash: true,
          template: './src/template.html'
      }),
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
      rules: [
          {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
          },
          {
              test: /\.html$/i,
              loader: 'html-loader',
          }
      ],
  },
};