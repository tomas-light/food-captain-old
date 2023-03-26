import { Reducer } from 'app-redux-utils';
// import { EditMenuFormValues } from './Menu.actions.types';
import { Menu } from '~models';

export class MenuStore {
	menus: Menu[];
	selectedMenus: Menu[];

	menuIsCreating: boolean;
	menuIsUpdating: boolean;
	menuAreDeleting: boolean;

	openedMenu: Menu;
	// menuFormValues: EditMenuFormValues;

	constructor() {
		this.menus = [];
		this.selectedMenus = [];

		this.menuIsCreating = false;
		this.menuIsUpdating = false;
		this.menuAreDeleting = false;

		this.openedMenu = null;
		// this.menuFormValues = null;
	}

	static update = 'MENU_update_store';
	static reducer = Reducer(new MenuStore(), MenuStore.update);
}
