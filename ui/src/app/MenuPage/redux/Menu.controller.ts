import { MenuApi } from '@api';
import { ControllerBase } from '@utils/controller';
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
}
