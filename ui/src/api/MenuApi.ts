import { ApiBase } from '@api/base';
import { Menu } from '@app/MenuPage/models';

export class MenuApi extends ApiBase {
  static getAllAsync() {
    return this.get<Menu[]>('/menu');
  }
}
