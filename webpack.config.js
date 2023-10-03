const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const WorkboxWebPackPlugin = require('workbox-webpack-plugin');

module.exports = (env, argv) => {
  const SERVER_USESSL = { production: true, development: false };
  const SERVER_HOST = { production: 'onrender.com', development: 'localhost' };
  const SERVER_PORT = { production: 443, development: 8088 };

  let productionOnlyPlugins = [];
  if (argv.mode === 'production') {
    productionOnlyPlugins = [
      new WorkboxWebPackPlugin.InjectManifest({
        swSrc: './src/js/sw.js',
        swDest: 'sw.js',
        include: [
          /\/index\.html$/,
        ],
      }),
    ];
  }

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, 'css-loader',
          ],
        },
        {
          test: /\.png$/,
          type: 'asset/resource',
        },
        {
          test: /\.svg$/,
          type: 'asset',
        },
      ],
    },
    plugins: [
      new DefinePlugin({
        SERVER_USESSL: JSON.stringify(SERVER_USESSL[argv.mode]),
        SERVER_HOST: JSON.stringify(SERVER_HOST[argv.mode]),
        SERVER_PORT: JSON.stringify(SERVER_PORT[argv.mode]),
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html',
      }),
      new HtmlWebPackPlugin({
        template: './src/offline.html',
        filename: './offline.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      ...productionOnlyPlugins,
    ],
  };
};
