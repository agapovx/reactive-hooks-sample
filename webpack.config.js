module.exports = (env = {}, options) => {
	const config = env.config ? env.config : options.mode;

	return require(`./webpack/${config}`)(env, options);
};
