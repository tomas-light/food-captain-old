import { Action } from 'app-redux-utils';

import { MenuApi } from '@api';
import { EditMenuFormValues } from '@app/menu/EditMenuPage/models';
import { appUrls } from '@app/routing';
import { Menu } from '@models';
import { ControllerBase } from '@utils/controller';

import {
  LoadMenuActionPayload,
  SelectMenuActionPayload,
} from './Menu.actions.types';
import { MenuActions } from './Menu.actions';
import { MenuStore } from './Menu.store';

export class MenuController extends ControllerBase {
  private updateStore(partialStore: Partial<MenuStore>) {
    this.dispatch(MenuActions.updateStore(partialStore));
  }

  async getMenus() {
    const response = await MenuApi.getAllAsync();
    if (response.hasError()) {
      this.updateStore({
        menus: [],
      });

      return;
    }

    this.updateStore({
      menus: response.data,
    });
  }

  selectMenu(action: Action<SelectMenuActionPayload>) {
    this.updateStore({
      selectedMenus: action.payload.selectedMenus,
    });
  }

  async loadMenu(action: Action<LoadMenuActionPayload>) {
    const response = await MenuApi.getByIdAsync(action.payload.menuId);
    if (response.hasError()) {
      this.updateStore({
        menus: [],
      });

      return;
    }

    this.updateStore({
      openedMenu: response.data,
      menuFormValues: this.mapMenuToFormValues(response.data),
    });
  }

  private mapMenuToFormValues(menu: Menu): EditMenuFormValues {
    return {
      name: menu.name,
      createDate: menu.createDate,
      lastUpdate: menu.lastUpdate,
      author: menu.author?.id || null,
      dishes: menu.dishes?.map(dish => dish.id) || [],
    };
  }

  openMenuForCreation() {
  }

  openMenuForEditing() {
    const store = this.getState().menu;
    if (!store.selectedMenus.length) {
      return;
    }

    const menu = store.selectedMenus[0];

    this.updateStore({
      openedMenu: menu,
      menuFormValues: this.mapMenuToFormValues(menu),
    });

    this.redirect(appUrls.getMenuDetailsPath(menu.id));
  }

  openMenuForDeleting() {
  }
}
