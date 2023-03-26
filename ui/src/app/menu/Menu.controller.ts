import { Action, createAction, WatchedController, watch } from 'app-redux-utils';
import i18n from 'i18next';

import { MenuApi } from '~api';
// import { EditMenuFormValues } from '~app/menu/EditMenuPage/models';
import { appUrls } from '~app/routing';
import { Menu, MenuInstance } from '~models';
import { ControllerBase } from '~app/ControllerBase';
import { MenuStore } from './Menu.store';

interface SelectMenuActionPayload {
	selectedMenus: Menu[];
}

interface LoadMenuActionPayload {
	menuId: Menu['id'];
}

interface SaveActionPayload {
	formValues: EditMenuFormValues;
}

type EditMenuFormValues = any; // TBD

@watch
class MenuController extends ControllerBase {
	private updateStore(partialStore: Partial<MenuStore>) {
		this.dispatch(createAction(MenuStore.update, partialStore));
	}

	@watch
	async getMenus() {
		const response = await MenuApi.getAllAsync();
		if (response.hasError()) {
			this.updateStore({
				menus: [],
			});

			return;
		}

		this.updateStore({
			menus: response.data.map((menu) => new MenuInstance(menu)),
		});
	}

	@watch
	selectMenu(action: Action<SelectMenuActionPayload>) {
		this.updateStore({
			selectedMenus: action.payload.selectedMenus,
		});
	}

	@watch
	async loadMenu(action: Action<LoadMenuActionPayload>) {
		const isCreateMenu = action.payload.menuId === null || action.payload.menuId.toString() === 'null';

		if (isCreateMenu) {
			const date = new Date();
			const { currentUser } = this.getState().user;

			const newMenu = new MenuInstance({
				id: null,
				createDate: date,
				lastUpdate: date,
				author: currentUser,
			});

			this.updateStore({
				openedMenu: newMenu,
				// menuFormValues: this.mapMenuToFormValues(newMenu),
			});

			return;
		}

		const response = await MenuApi.getByIdAsync(action.payload.menuId);
		if (response.hasError()) {
			this.updateStore({
				menus: [],
			});

			return;
		}

		this.updateStore({
			openedMenu: new MenuInstance(response.data),
			// menuFormValues: this.mapMenuToFormValues(response.data),
		});
	}

	@watch
	addMenu() {
		const now = new Date(Date.now());

		const newMenu: Menu = {
			id: null,
			createDate: now,
			lastUpdate: now,
			name: '',
			dishes: [],
			author: null,
		};

		this.openMenuEditingPage(newMenu);
	}

	@watch
	editMenu() {
		const store = this.getState().menu;
		if (store.selectedMenus.length !== 1) {
			return;
		}

		this.openMenuEditingPage(store.selectedMenus[0]);
	}

	@watch
	async deleteMenus() {
		const store = this.getState().menu;
		if (!store.selectedMenus.length) {
			return;
		}

		this.updateStore({
			menuAreDeleting: true,
		});

		try {
			await store.selectedMenus.forEachAsync(async (menu) => {
				const response = await MenuApi.deleteAsync(menu.id);
				if (response.hasError()) {
					if (response.hasClientError()) {
						this.notify({ message: response.error, variant: 'warning' });
					}

					return;
				}
			});
		} catch (error) {
			const _error = error;
			debugger;
		}

		this.updateStore({
			menuAreDeleting: false,
			selectedMenus: [],
		});
		this.notify(i18n.t('menu deleted', { count: store.selectedMenus.length }));

		this.dispatch(menuController.getMenus());
	}

	@watch
	async save(action: Action<SaveActionPayload>) {
		const { formValues } = action.payload;

		const store = this.getState().menu;
		if (store.openedMenu.id === null) {
			await this.createMenu(formValues);
		} else {
			await this.updateMenu(store.openedMenu, formValues);
		}
	}

	private mapMenuToFormValues(menu: Menu): EditMenuFormValues {
		return {
			name: menu.name,
			author: menu.author?.id || null,
			dishes: menu.dishes?.map((dish) => dish.id) || [],
		};
	}

	private openMenuEditingPage(menu: Menu) {
		this.updateStore({
			openedMenu: menu,
			// menuFormValues: this.mapMenuToFormValues(menu),
		});

		this.redirect(appUrls.getMenuDetailsPath(menu.id));
	}

	private async createMenu(formValues: EditMenuFormValues) {
		const state = this.getState();

		this.updateStore({
			menuIsCreating: true,
		});

		const author = state.user.users.find((user) => user.id === formValues.author);
		const dishes = state.dish.dishes.filter((dish) => formValues.dishes.includes(dish.id));

		const response = await MenuApi.addAsync({
			name: formValues.name,
			author,
			dishes,
		});
		if (response.hasError()) {
			if (response.hasClientError()) {
				this.notify({ message: response.error, variant: 'warning' });
			}
			this.updateStore({
				menuIsCreating: false,
			});
			return;
		}

		const store = this.getState().menu;
		const menus = [...store.menus, new MenuInstance(response.data)];

		this.updateStore({
			menuIsCreating: false,
			menus,
		});
		this.notify({ message: i18n.t('menu.added'), variant: 'success' });
	}

	private async updateMenu(menu: Menu, formValues: EditMenuFormValues) {
		const state = this.getState();

		this.updateStore({
			menuIsUpdating: true,
		});

		const author = state.user.users.find((user) => user.id === formValues.author);
		const dishes = state.dish.dishes.filter((dish) => formValues.dishes.includes(dish.id));

		const response = await MenuApi.updateAsync({
			...menu,
			name: formValues.name,
			author,
			dishes,
		});
		if (response.hasError()) {
			if (response.hasClientError()) {
				this.notify({ message: response.error, variant: 'warning' });
			}
			this.updateStore({
				menuIsUpdating: false,
			});
			return;
		}

		const store = this.getState().menu;
		const menus = [...store.menus.filter((_menu) => _menu.id === menu.id), new MenuInstance(response.data)];

		this.updateStore({
			menuIsUpdating: false,
			menus,
		});
		this.notify({ message: i18n.t('menu.updated'), variant: 'success' });
	}
}

const menuController: WatchedController<MenuController> = MenuController as any;
export { menuController as MenuController };
