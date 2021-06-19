import { createApp } from 'vue';

import './scss/main.scss';

import App from './App.vue';

import { FontAwesomeIcon } from './vendor/fontawesome';

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
