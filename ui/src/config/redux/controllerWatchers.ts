import { Watcher } from 'app-redux-utils';

import { appInitterWatcher } from '@app/AppInitter/redux';
import { menuWatcher } from '@app/MenuPage/redux';
import { State } from '@State';

const controllerWatchers: Watcher<State, any>[] = [
  appInitterWatcher,
  menuWatcher,
];

export { controllerWatchers };
