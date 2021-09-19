import { watcher } from 'app-redux-utils';

import { State } from '@State';
import { AppInitterActions } from './AppInitter.actions';
import { AppInitterController } from './AppInitter.controller';

export const appInitterWatcher = watcher<State, AppInitterController>(
  AppInitterController,
  [
    [AppInitterActions.INITIALIZE, 'initialize'],
  ]
);
