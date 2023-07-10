const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: fs.realpathSync(process.cwd()) + "/src/index",
    vendor: ['react', 'react-dom']
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    host: '0.0.0.0',
    port: 8000
  },
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ["@babel/preset-env"] }
      },
      {
        test: /\.(css|less)$/,
        use: [{ loader: 'style-loader' }, {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
              localIdentName: "[path]__[local]--[hash:base64:5]",
            },
          }
        }, {
          loader: 'less-loader',
          options: {
            lessOptions: {
              paths: [path.resolve(__dirname, 'node_modules')],
            },
          },
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      title: 'webpack-react',
      templateContent: `<html><body><div id='root'></div></body></html>`
    })
  ],
  resolve: {
    alias: {
      "@": '/src'
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/public'
  }
}