import { Entity } from './Entity';

export interface RecipeIngredientEntity extends Entity {
  id: number;
  name?: string;
  image_id?: number;
}
