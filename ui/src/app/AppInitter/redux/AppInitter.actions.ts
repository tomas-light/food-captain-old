import { createAction } from 'app-redux-utils';
import { AppInitterStore } from './AppInitter.store';

export class AppInitterActions {
  static PREFIX = 'APP_';
  static UPDATE_STORE = `${AppInitterActions.PREFIX}UPDATE_STORE`;

  static INITIALIZE = `${AppInitterActions.PREFIX}INITIALIZE`;

  static updateStore = (partialStore: Partial<AppInitterStore>) =>
    createAction(AppInitterActions.UPDATE_STORE, partialStore);

  static initialize = () => createAction(AppInitterActions.INITIALIZE);
}
