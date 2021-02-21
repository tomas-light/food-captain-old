import { watcher } from 'app-redux-utils';

import { AppInitterActions } from '@app/AppInitter/redux/AppInitter.actions';
import { AppInitterController } from '@app/AppInitter/redux/AppInitter.controller';
import { State } from '@State';

export const appInitterWatcher = watcher<State, AppInitterController>(
  AppInitterController,
  [
    [
      AppInitterActions.INITIALIZE,
      'initialize',
    ],
  ]
);
