import { watcher } from 'app-redux-utils';

import { State } from '@State';
import { MenuActions } from './Menu.actions';
import { MenuController } from './Menu.controller';

export const menuWatcher = watcher<State, MenuController>(MenuController, [
	[MenuActions.GET_MENU_LIST, 'getMenus'],
	[MenuActions.SELECT_MENU, 'selectMenu'],
	[MenuActions.LOAD_MENU, 'loadMenu'],
	[MenuActions.ADD_MENU, 'addMenu'],
	[MenuActions.EDIT_MENU, 'editMenu'],
	[MenuActions.DELETE_MENUS, 'deleteMenus'],
	[MenuActions.SAVE, 'save'],
]);
