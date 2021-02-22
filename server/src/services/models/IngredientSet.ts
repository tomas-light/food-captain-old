import { Ingredient } from './Ingredient';

export interface IngredientSet {
  id: number;
  name: string;
  image?: string;
  ingredients?: Ingredient[];
}
