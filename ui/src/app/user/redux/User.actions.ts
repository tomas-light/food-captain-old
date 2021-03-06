import { createAction } from 'app-redux-utils';

import { UserStore } from './User.store';

export class UserActions {
  static PREFIX = 'USER_';

  static UPDATE_STORE = `${UserActions.PREFIX}UPDATE_STORE`;
  static LOAD_USERS = `${UserActions.PREFIX}LOAD_USERS`;

  static updateStore = (partialStore: Partial<UserStore>) =>
    createAction(UserActions.UPDATE_STORE, partialStore);

  static loadUsers = () => createAction(UserActions.LOAD_USERS);
}
