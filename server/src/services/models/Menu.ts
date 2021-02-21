import { Dish } from './Dish';
import { User } from './User';

interface DishInMenu extends Dish {
  order?: number;
}

export interface Menu {
  id: number;
  createDate: Date;
  lastUpdate: Date;
  author?: User;
  dishes?: DishInMenu[];
}
