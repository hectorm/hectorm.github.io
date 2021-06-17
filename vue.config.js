module.exports = {
	publicPath: './',
	integrity: process.env.NODE_ENV === 'production',
	productionSourceMap: false,
	pages: {
		index: {
			entry: 'src/pages/index/main.js',
			template: 'public/index.html',
			filename: 'index.html',
			chunks: ['chunk-vendors', 'chunk-common', 'index'],
		},
		donate: {
			entry: 'src/pages/donate/main.js',
			template: 'public/donate.html',
			filename: 'donate.html',
			chunks: ['chunk-vendors', 'chunk-common', 'donate'],
		},
	},
};
