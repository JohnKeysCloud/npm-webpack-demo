const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

module.exports = {
  mode: 'development', // 'production' or 'development
  entry: {
    index: './src/app.js',
    alert: './src/alert.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/', //query string to be added to all assets (e.g. images)
    filename: '[name].bundle.js',
    clean: true, // removes files that aren't in use
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(s[ac]ss)$/i,
            use: [
              // Creates 'style' nodes from JS strings
              'style-loader',
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
              'sass-loader',
            ],
            // executes from bottom to top
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
  devtool: 'inline-source-map', // source map for debugging'
  devServer: {
    static: path.join(__dirname, 'src'), // static files
    port: 3000,
    open: true, // open browser on server start
  },
  optimization: {
    runtimeChunk: 'single'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Cyclone Studios App',
      minify: {
        collapseWhitespace: false,
        removeComments: false,
      },
      // filename: 'index.html', unnecessary because of ejs
      inject: 'head',
      scriptLoading: 'defer',
      hash: false, // add hash to the file so filename is different on every build
      template: './src/app.ejs',
    }),
  ],
};
