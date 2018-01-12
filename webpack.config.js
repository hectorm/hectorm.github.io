'use strict';

const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const browsers = [
	'Last 2 Chrome versions',
	'Firefox ESR',
	'Explorer 11'
];

const babelLoaderOptions = {
	cacheDirectory: true,
	presets: [['env', {targets: {browsers}}]]
};

const postCSSLoaderOptions = {
	plugins: [
		autoprefixer({browsers}),
		cssnano({discardComments: {removeAll: true}})
	]
};

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
				mangle: true,
				compress: true,
				output: {
					comments: false
				}
			}
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			filename: 'index.html',
			minify: {
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true,
				removeComments: true
			}
		}),
		new StyleExtHtmlWebpackPlugin(),
		new CopyWebpackPlugin([
			{from: 'src/manifest.json'},
			{from: 'src/key.asc'},
			{from: 'src/robots.txt'},
			{from: 'src/img', to: 'img'}
		], {ignore: ['.gitkeep']})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {loader: 'babel-loader', options: babelLoaderOptions}
			},
			{
				test: /\.css$/,
				loader: ExtractTextWebpackPlugin.extract([
					'css-loader',
					{loader: 'postcss-loader', options: postCSSLoaderOptions}
				])
			},
			{
				test: /\.scss$/,
				loader: ExtractTextWebpackPlugin.extract([
					'css-loader',
					{loader: 'postcss-loader', options: postCSSLoaderOptions},
					'sass-loader'
				])
			}
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
