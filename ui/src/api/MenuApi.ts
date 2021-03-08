import { ApiBase } from '@api/base';
import { Menu } from '@models';

export class MenuApi extends ApiBase {
  static getAllAsync() {
    return this.get<Menu[]>('/menu');
  }

  static getByIdAsync(menuId: number) {
    return this.get<Menu>(`/menu/${menuId}`);
  }

  static addAsync(menu: Omit<Menu, 'id' | 'createDate' | 'lastUpdate'>) {
    return this.post<Menu>('/menu', menu);
  }

  static updateAsync(menu: Menu) {
    return this.put<Menu>(`/menu/${menu.id}`, menu);
  }

  static deleteAsync(menuId: number) {
    return this.delete<void>(`/menu/${menuId}`);
  }
}
