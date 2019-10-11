const merge = require('webpack-merge');
const base = require('./base');

module.exports = (env, options) =>
	merge.smart(
		{
			mode: 'development',
			devtool: 'cheap-module-eval-source-map',
			optimization: {
				removeAvailableModules: false,
				mergeDuplicateChunks: false,
				removeEmptyChunks: false,
				splitChunks: false
			}
		},
		base(env, options)
	);
