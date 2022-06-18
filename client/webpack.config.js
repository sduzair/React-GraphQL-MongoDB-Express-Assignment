const webpack = require('webpack');
const path = require('path');

const config = {
  mode: "development",
  devtool: "eval-source-map",   // for detailed sourse maps required for rtk query
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../server/src/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
};

module.exports = config;