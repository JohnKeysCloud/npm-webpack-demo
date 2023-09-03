const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

module.exports = {
	entry: {
		index: './src/app.js',
		print: './src/print.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: '[name].bundle.js',
		clean: true, // removes files that aren't in use
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource'
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
	devServer: {
		static: path.join(__dirname, 'dist'), // static files
		port: 3000,
		open: true // open browser on server start
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Cyclone Studios App',
			minify: {
				collapseWhitespace: false,
				removeComments: false
			},
			hash: false, // add hash to the file so filename is different on every build
			template: './src/app.ejs'
		})
	],
};
