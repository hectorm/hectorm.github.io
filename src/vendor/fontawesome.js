import Vue from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faDocker } from '@fortawesome/free-brands-svg-icons/faDocker';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faGitlab } from '@fortawesome/free-brands-svg-icons/faGitlab';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';

library.add(faDocker, faGithub, faGitlab, faEnvelope, faKey);

Vue.component('font-awesome-icon', FontAwesomeIcon);
