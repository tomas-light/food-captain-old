import { watcher } from 'app-redux-utils';

import { State } from '@State';
import { UserActions } from './User.actions';
import { UserController } from './User.controller';

export const userWatcher = watcher<State, UserController>(
  UserController,
  [
    [
      UserActions.LOAD_USERS,
      'loadUsers',
    ],
  ]
);
