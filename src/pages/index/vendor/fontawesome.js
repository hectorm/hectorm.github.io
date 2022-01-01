import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faEnvelope, faHeart, faKey } from "@fortawesome/free-solid-svg-icons";

import {
  faDocker,
  faGithub,
  faGitlab,
} from "@fortawesome/free-brands-svg-icons";

library.add(faDocker, faEnvelope, faGithub, faGitlab, faHeart, faKey);

export { FontAwesomeIcon };
