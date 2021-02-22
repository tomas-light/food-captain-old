import { Entity } from './Entity';

export interface RecipeEntity extends Entity {
  id: number;
  name?: string;
  description?: string;
  dish_id: number;
  image_id?: number;
}
