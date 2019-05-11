module.exports = {
	publicPath: './',
	integrity: true,
	productionSourceMap: false,
	chainWebpack: config => {
		config.optimization.splitChunks({
			cacheGroups: {
				vendor: {
					test: /\/node_modules\//,
					name: 'vendor',
					chunks: 'all',
					enforce: true,
					priority: -20
				},
				fontawesome: {
					test: /(\/node_modules\/@fortawesome\/)|(\/fontawesome\/)/,
					name: 'fontawesome',
					chunks: 'all',
					enforce: true,
					priority: -10
				}
			}
		});
	},
	css: {
		loaderOptions: {
			sass: {
				data: `@import '~@/scss/utilities/all';`
			}
		}
	}
};
