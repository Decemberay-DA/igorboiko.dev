module.exports = {
	chainWebpack: (config) => {
		config.module
			.rule("pug")
			.test(/\.pug$/)
			.use("pug-plain-loader")
			.loader("pug-plain-loader")
			.end()
			.use("html")
			.loader("html-loader")
			.end();
	},
};
