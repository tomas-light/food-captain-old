import { Dish } from '@models';
import { SelectFieldOption } from '@select';

export class DishStore {
  dishes: Dish[];
  dishOptions: SelectFieldOption<number>[];
  dishesAreLoading: boolean;

  constructor() {
    this.dishes = [];
    this.dishOptions = [];
    this.dishesAreLoading = false;
  }
}
