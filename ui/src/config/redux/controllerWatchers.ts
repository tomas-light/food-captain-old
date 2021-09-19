import { Watcher } from 'app-redux-utils';

import { appInitterWatcher } from '@app/AppInitter/redux';
import { State } from '@State';
import { menuWatcher } from '@app/menu/redux';
import { userWatcher } from '@app/user/redux';
import { dishWatcher } from '@app/dish/redux';
import { routerWatcher } from '@app/routing';

const controllerWatchers: Watcher<State, any>[] = [
  appInitterWatcher,
  menuWatcher,
  userWatcher,
  dishWatcher,
  routerWatcher,
];

export { controllerWatchers };
