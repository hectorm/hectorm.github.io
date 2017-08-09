'use strict';

const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, 'src/js/main.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new ExtractTextWebpackPlugin('bundle.css'),
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: true,
				output: {
					comments: false,
					// eslint-disable-next-line camelcase
					max_line_len: 512
				}
			}
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			filename: 'index.html',
			minify: {
				maxLineLength: 512,
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true,
				removeComments: true,
				minifyCSS: {
					format: {wrapAt: 512},
					level: {1: {specialComments: 0}}
				}
			}
		}),
		new StyleExtHtmlWebpackPlugin(),
		new CopyWebpackPlugin([
			{from: 'src/manifest.json'},
			{from: 'src/key.asc'},
			{from: 'src/keybase.txt'},
			{from: 'src/robots.txt'},
			{from: 'src/img', to: 'img'}
		], {ignore: ['.gitkeep']})
	],
	module: {
		rules: [
			{test: /\.css$/, loader: ExtractTextWebpackPlugin.extract('css-loader')},
			{test: /\.scss$/, loader: ExtractTextWebpackPlugin.extract(['css-loader', 'sass-loader'])},
			{test: /\.js$/, exclude: /node_modules/, use: {
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
					presets: [['env', {targets: {
						browsers: [
							'Last 2 Chrome versions',
							'Firefox ESR'
						]}
					}]]
				}
			}}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		host: '0.0.0.0',
		port: 9000,
		disableHostCheck: true,
		clientLogLevel: 'info'
	}
};
