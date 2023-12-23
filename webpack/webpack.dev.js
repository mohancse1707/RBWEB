
/*
 * Copyright (c) 2020. ReserveBuddy.
 * All rights reserved.
 * All data of ReserveBuddy are confidential.
 */

const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const { merge } = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');
const sass = require('sass');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'development';

module.exports = (options) => merge(commonConfig({ env: ENV }), {
  devtool: 'cheap-module-source-map', // https://reactjs.org/docs/cross-origin-errors.html
  mode: ENV,
  entry: [
    './src/main/web/app/index'
  ],
  output: {
    path: utils.root('dist/'),
    filename: 'app/[name].bundle.js',
    chunkFilename: 'app/[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c|le)ss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#2F4858',
                  'link-color': '#219cb5',
                  'border-radius-base': '2px',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      }
    ]
  },
  devServer: {
    inline: true,
    stats: options.stats,
    hot: true,
    contentBase: './dist/',
    proxy: [{
      context: [
        '/api',
        '/swagger-resources',
        '/v2/api-docs',
        '/db',
        '/auth',
        '/app'
      ],
      target: `http${options.tls ? 's' : ''}://18.206.121.214:8100`, // http://35.173.193.81:8100 TO CONNECT SERVER BACKEND USE THIS target: `http${options.tls ? 's' : ''}://18.235.80.224:8123`,
      secure: false,
      changeOrigin: options.tls
    }],
    watchOptions: {
      ignored: /node_modules/
    },
    https: options.tls,
    publicPath: '/',
    historyApiFallback: true,
    watchContentBase: true
  },
  stats: options.stats,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${options.env}'`,
        BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
        // APP_VERSION is passed as an environment variable from the Gradle / Maven build tasks.
        VERSION: `'${process.env.hasOwnProperty('APP_VERSION') ? process.env.APP_VERSION : 'DEV'}'`,
        DEBUG_INFO_ENABLED: options.env === 'development',
        // The root URL for API calls, ending with a '/' - for example: `"https://www.jhipster.tech:8081/myservice/"`.
        // If this URL is left empty (""), then it will be relative to the current context.
        // If you use an API server, in `prod` mode, you will need to enable CORS
        // (see the `jhipster.cors` common JHipster property in the `application-*.yml` configurations)
        //18.206.121.214:8100
        SERVER_API_URL: `'http://18.206.121.214:8100'`
      }
    }),
    new SimpleProgressWebpackPlugin({
          format: options.stats === 'minimal' ? 'compact' : 'expanded'
        }),
    new FriendlyErrorsWebpackPlugin(),
    new BrowserSyncPlugin({
      https: options.tls,
      host: 'localhost',
      port: 9000,
      proxy: {
        target: `http${options.tls ? 's' : ''}://localhost:9060`,
          proxyOptions: {
              changeOrigin: false  //pass the Host header to the backend unchanged  https://github.com/Browsersync/browser-sync/issues/430
          }
      },
      socket: {
        clients: {
          heartbeatTimeout: 60000
        }
      }
      /*
      ,ghostMode: { // uncomment this part to disable BrowserSync ghostMode; https://github.com/jhipster/generator-jhipster/issues/11116
        clicks: false,
        location: false,
        forms: false,
        scroll: false
      } */
    }, {
      reload: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new writeFilePlugin(),
    new webpack.WatchIgnorePlugin([
      utils.root('src/test'),
    ]),
    new WebpackNotifierPlugin({
      title: 'ReserveBuddy',
      contentImage: path.join(__dirname, 'mkt-logo.png'),

    })
  ].filter(Boolean)
});
