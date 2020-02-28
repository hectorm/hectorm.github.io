module.exports = {
	publicPath: '/',
	integrity: true,
	productionSourceMap: false,
	pages: {
		index: {
			entry: 'src/pages/index/main.js',
			template: 'public/index.html',
			filename: 'index.html',
			chunks: ['chunk-vendors', 'chunk-common', 'index']
		},
		donate: {
			entry: 'src/pages/donate/main.js',
			template: 'public/donate/index.html',
			filename: 'donate/index.html',
			chunks: ['chunk-vendors', 'chunk-common', 'donate']
		}
	}
};
