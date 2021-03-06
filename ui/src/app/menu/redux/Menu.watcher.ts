import { watcher } from 'app-redux-utils';

import { State } from '@State';
import { MenuActions } from './Menu.actions';
import { MenuController } from './Menu.controller';

export const menuWatcher = watcher<State, MenuController>(
  MenuController,
  [
    [
      MenuActions.GET_MENU_LIST,
      'getMenus',
    ],
    [
      MenuActions.SELECT_MENU,
      'selectMenu',
    ],
    [
      MenuActions.LOAD_MENU,
      'loadMenu',
    ],
    [
      MenuActions.OPEN_MENU_FOR_CREATION,
      'openMenuForCreation',
    ],
    [
      MenuActions.OPEN_MENU_FOR_EDITING,
      'openMenuForEditing',
    ],
    [
      MenuActions.OPEN_MENU_FOR_DELETING,
      'openMenuForDeleting',
    ],
  ]
);
