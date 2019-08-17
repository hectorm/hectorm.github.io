import Vue from 'vue';

import '@/vendor/fontawesome';

import './scss/main.scss';

import App from './App.vue';

new Vue({
	render: h => h(App)
}).$mount('#app');
