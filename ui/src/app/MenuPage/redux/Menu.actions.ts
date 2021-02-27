import { createAction } from 'app-redux-utils';

import { MenuStore } from './Menu.store';

export class MenuActions {
  static PREFIX = 'MENU_';

  static UPDATE_STORE = `${MenuActions.PREFIX}UPDATE_STORE`;

  static GET_MENU_LIST = `${MenuActions.PREFIX}GET_MENU_LIST`;

  static updateStore = (partialStore: Partial<MenuStore>) =>
    createAction(MenuActions.UPDATE_STORE, partialStore);

  static getMenus = () => createAction(MenuActions.GET_MENU_LIST);
}
