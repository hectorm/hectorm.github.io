import Vue from 'vue';

import '@/scss/main.scss';

import '@/vendor/fontawesome';

import App from './App.vue';

new Vue({
	render: h => h(App)
}).$mount('#app');
