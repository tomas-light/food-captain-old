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

  static OPEN_MENU_FOR_CREATION = `${MenuActions.PREFIX}OPEN_MENU_FOR_CREATION`;
  static OPEN_MENU_FOR_EDITING = `${MenuActions.PREFIX}OPEN_MENU_FOR_EDITING`;
  static OPEN_MENU_FOR_DELETING = `${MenuActions.PREFIX}OPEN_MENU_FOR_DELETING`;
  static LOAD_MENU = `${MenuActions.PREFIX}LOAD_MENU`;

  static SAVE = `${MenuActions.PREFIX}SAVE`;

  static updateStore = (partialStore: Partial<MenuStore>) =>
    createAction(MenuActions.UPDATE_STORE, partialStore);

  static getMenus = () => createAction(MenuActions.GET_MENU_LIST);
  static selectMenu = (payload: SelectMenuActionPayload) => createAction(MenuActions.SELECT_MENU, payload);

  static openMenuForCreation = () => createAction(MenuActions.OPEN_MENU_FOR_CREATION);
  static openMenuForEditing = () => createAction(MenuActions.OPEN_MENU_FOR_EDITING);
  static openMenuForDeleting = () => createAction(MenuActions.OPEN_MENU_FOR_DELETING);
  static loadMenu = (payload: LoadMenuActionPayload) => createAction(MenuActions.LOAD_MENU, payload);

  static save = (payload: SaveActionPayload) => createAction(MenuActions.SAVE, payload);
}
