const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

const config = {
	entry: ['babel-polyfill', `${APP_DIR}/index.jsx`],
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				include: APP_DIR,
				loader: 'babel'
			}
		]
	},
	plugins: [
		new LodashModuleReplacementPlugin()
	]
};

module.exports = config;