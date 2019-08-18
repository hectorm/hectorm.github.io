import Vue from 'vue';

Vue.component('font-awesome-icon', async () => {
	const [{ FontAwesomeIcon }, { config, library }] = await Promise.all([
		/* eslint-disable prettier/prettier */
		import(/* webpackMode: "eager" */ '@fortawesome/vue-fontawesome'),
		import(/* webpackMode: "eager" */ '@fortawesome/fontawesome-svg-core'),
		import(/* webpackMode: "eager" */ '@fortawesome/fontawesome-svg-core/styles.css')
		/* eslint-enable */
	]);

	config.autoAddCss = false;

	const icons = await Promise.all([
		/* eslint-disable prettier/prettier */
		import(/* webpackMode: "eager" */ '@fortawesome/free-brands-svg-icons/faDocker'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-brands-svg-icons/faGithub'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-brands-svg-icons/faGitlab'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faEnvelope'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faHeart'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faKey'),
		/* eslint-enable */
	]);

	icons.map(icon => {
		library.add(icon.definition);
	});

	return FontAwesomeIcon;
});
