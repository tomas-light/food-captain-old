import { Dish } from './Dish';
import { Ingredient } from './Ingredient';

export interface Recipe {
  id: number;
  name?: string;
  dish: Dish;
  image: string;
  images?: string[];
  ingredients?: Ingredient[];
}
