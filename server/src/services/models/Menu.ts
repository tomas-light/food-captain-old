import { Dish } from './Dish';
import { User } from './User';

interface DishInMenu extends Dish {
  order?: number;
}

export interface Menu {
  id: number;
  name?: string;
  createDate: Date;
  lastUpdate: Date;
  author?: User;
  dishes?: DishInMenu[];
}
