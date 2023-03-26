import { Entity } from './Entity';

export interface IngredientEntity extends Entity {
  id: number;
  name?: string;
  image_id?: number;
}
