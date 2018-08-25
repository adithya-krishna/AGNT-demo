const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: 'app.css'
});

const CSSVendorLoaders = [
	{
		loader: 'css-loader',
		query: {
			modules: true,
			sourceMap: true,
			importLoaders: 1,
			localIdentName: '[name]__[local]--[hash:base64:5]',
			minimize: false
		}
	},
	{
		loader: 'postcss-loader',
		options: {
			config: {
				path: 'postcss.config.js'
			}
		}
	}
];

const CSSLoaders = [
	{
		loader: 'css-loader',
		query: {
			modules: true,
			sourceMap: true,
			importLoaders: 2,
			localIdentName: '[name]__[local]--[hash:base64:5]',
			minimize: false,
			url: false
		}
	},
	{
		loader: 'postcss-loader',
		options: {
			config: {
				path: 'postcss.config.js'
			}
		}
	},
	{
		loader: 'sass-loader',
		options: {
			sourceMap: true,
			outputStyle: 'expanded',
			includePaths: [path.resolve(__dirname, 'app'), 'node_modules']
		}
	}
];

module.exports = ctx => {
	return {
		context: __dirname,

		devtool: 'cheap-module-eval-source-map',

		entry: ['babel-polyfill', path.resolve(__dirname, 'app')],

		devServer: {
			historyApiFallback: true,
			compress: true,
			progress: true,
			hot: true,
			contentBase: 'app',
			port: 8080
		},

		output: {
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/',
			filename: 'app.bundle.js'
		},

		resolve: {
			extensions: ['.js', '.jsx', '.json', '.scss'],
			modules: [path.resolve(__dirname, 'app'), 'node_modules']
		},

		plugins: [new webpack.HotModuleReplacementPlugin(), extractSass],

		module: {
			rules: [
				{
					test: /\.jsx?$/,
					use: 'source-map-loader',
					enforce: 'pre'
				},
				{
					test: /\.jsx?$/,
					include: path.resolve(__dirname, 'app'),
					exclude: [path.resolve(__dirname, 'node_modules')],
					use: {
						loader: 'babel-loader',
						query: {
							cacheDirectory: true
						}
					}
				},
				{
					test: /(\.scss)$/,
					use: extractSass.extract({
						fallback: 'style-loader',
						use: CSSLoaders
					})
				},
				{
					test: /(\.css)$/,
					use: extractSass.extract({
						fallback: 'style-loader',
						use: CSSVendorLoaders
					})
				}
			]
		},

		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						name: 'commons',
						chunks: 'initial',
						minChunks: 2
					}
				}
			}
		}
	};
};
