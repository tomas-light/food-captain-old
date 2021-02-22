import { Dish } from './Dish';
import { Ingredient } from './Ingredient';

export interface Recipe {
  id: number;
  name?: string;
  description?: string;
  dish: Dish;
  image: string;
  images?: string[];
  ingredients?: Ingredient[];
}
