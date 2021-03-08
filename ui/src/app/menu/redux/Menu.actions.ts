import { createAction } from 'app-redux-utils';

import {
  LoadMenuActionPayload,
  SelectMenuActionPayload,
  SaveActionPayload,
} from './Menu.actions.types';
import { MenuStore } from './Menu.store';

export class MenuActions {
  static PREFIX = 'MENU_';

  static UPDATE_STORE = `${MenuActions.PREFIX}UPDATE_STORE`;

  static GET_MENU_LIST = `${MenuActions.PREFIX}GET_MENU_LIST`;
  static SELECT_MENU = `${MenuActions.PREFIX}SELECT_MENU`;

  static ADD_MENU = `${MenuActions.PREFIX}ADD_MENU`;
  static EDIT_MENU = `${MenuActions.PREFIX}EDIT_MENU`;
  static DELETE_MENUS = `${MenuActions.PREFIX}DELETE_MENUS`;
  static LOAD_MENU = `${MenuActions.PREFIX}LOAD_MENU`;

  static SAVE = `${MenuActions.PREFIX}SAVE`;

  static updateStore = (partialStore: Partial<MenuStore>) =>
    createAction(MenuActions.UPDATE_STORE, partialStore);

  static getMenus = () => createAction(MenuActions.GET_MENU_LIST);
  static selectMenu = (payload: SelectMenuActionPayload) => createAction(MenuActions.SELECT_MENU, payload);

  static addMenu = () => createAction(MenuActions.ADD_MENU);
  static editMenu = () => createAction(MenuActions.EDIT_MENU);
  static deleteMenus = () => createAction(MenuActions.DELETE_MENUS);
  static loadMenu = (payload: LoadMenuActionPayload) => createAction(MenuActions.LOAD_MENU, payload);

  static save = (payload: SaveActionPayload) => createAction(MenuActions.SAVE, payload);
}
