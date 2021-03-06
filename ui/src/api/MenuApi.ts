import { ApiBase } from '@api/base';
import { Menu } from '@models';

export class MenuApi extends ApiBase {
  static getAllAsync() {
    return this.get<Menu[]>('/menu');
  }

  static getByIdAsync(menuId: number) {
    return this.get<Menu>(`/menu/${menuId}`);
  }
}
