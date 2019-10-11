const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, options) => ({
	entry: path.resolve(__dirname, '../src/index.tsx'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js'
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [ 'ts-loader' ],
				exclude: /node_modules/
			}
		]
	},

	resolve: {
		modules: [ 'src', 'node_modules' ],
		extensions: [ '.js', '.ts', '.tsx' ]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			}
		}),
		new CleanWebpackPlugin()
	],

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		historyApiFallback: true,
		compress: true,
		port: 9000,
		hot: true,
		open: true
	}
});
