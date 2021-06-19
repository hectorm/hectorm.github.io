import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

// prettier-ignore
import {
	faEnvelope,
	faHeart,
	faKey,
} from '@fortawesome/free-solid-svg-icons';

// prettier-ignore
import {
	faDocker,
	faGithub,
	faGitlab,
} from '@fortawesome/free-brands-svg-icons';

// prettier-ignore
library.add(
	faDocker,
	faEnvelope,
	faGithub,
	faGitlab,
	faHeart,
	faKey,
);

export { FontAwesomeIcon };
