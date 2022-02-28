// You can specify which plugins you need in main file

import './main';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons/faXmarkCircle';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
library.add(faXmarkCircle, faClock, faChevronDown);
