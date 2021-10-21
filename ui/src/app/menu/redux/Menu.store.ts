import { EditMenuFormValues } from '@app/menu/EditMenuPage/models';
import { Menu } from '@models';

export class MenuStore {
	menus: Menu[];
	selectedMenus: Menu[];

	menuIsCreating: boolean;
	menuIsUpdating: boolean;
	menuAreDeleting: boolean;

	openedMenu: Menu;
	menuFormValues: EditMenuFormValues;

	constructor() {
		this.menus = [];
		this.selectedMenus = [];

		this.menuIsCreating = false;
		this.menuIsUpdating = false;
		this.menuAreDeleting = false;

		this.openedMenu = null;
		this.menuFormValues = null;
	}
}
