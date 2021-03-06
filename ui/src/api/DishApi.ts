import { ApiBase } from '@api/base';
import { Dish } from '@models';

export class DishApi extends ApiBase {
  static getAllAsync() {
    return this.get<Dish[]>('/dish');
  }
}
