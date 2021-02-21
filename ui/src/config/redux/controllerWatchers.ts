import { Watcher } from 'app-redux-utils';

import { appInitterWatcher } from '@app/AppInitter/redux';
import { State } from '@State';

const controllerWatchers: Watcher<State, any>[] = [
  appInitterWatcher,
];

export { controllerWatchers };
