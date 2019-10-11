const merge = require('webpack-merge');
const base = require('./base');

module.exports = (env, options) =>
	merge.smart(base(env, options), {
		mode: 'production',

		output: {
			filename: '[name].[hash].js'
		},

		optimization: {
			runtimeChunk: 'single',
			splitChunks: {
				chunks: 'all',
				minSize: 0
			}
		}
	});
