module.exports = {
	root: true,
	env: { es2021: true, browser: true, node: true },
	extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
	rules: {
		'no-console': ['warn', { allow: ['warn', 'error'] }],
	},
};
