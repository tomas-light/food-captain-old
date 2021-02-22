import { Dish } from './Dish';

export interface DishSet {
  id: number;
  name: string;
  image?: string;
  dishes?: Dish[];
}
