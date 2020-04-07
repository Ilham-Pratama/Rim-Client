const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './app/index.tsx',
  output: {
    filename: '[contentHash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash].css'
    }),
    new Dotenv()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
    modules: ['node_modules', path.resolve(__dirname, 'app')]
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'imgs',
            name: '[name].[hash].[ext]'
          }
        }
      }
    ]
  }
};
