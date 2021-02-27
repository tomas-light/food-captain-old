import { MakeOptional } from '@utils/types';
import { IngredientEntity, IngredientSetEntity } from './entities';

interface IngredientSetWithImageEntity extends IngredientSetEntity {
  image?: string;
}

// @ts-ignore
interface IngredientSetWithIngredientsEntity extends IngredientSetWithImageEntity, Omit<IngredientEntity, 'id' | 'name'> {
  ingredient_id: number;
  ingredient_name: string;
  ingredient_image_id?: number
  ingredient_image?: string
}

interface IngredientSetTable {
  allAsync(): Promise<IngredientSetWithImageEntity[]>;
  byIdAsync(id: number): Promise<IngredientSetWithImageEntity | null | undefined>;

  getWithIngredientsByIdAsync(id: number): Promise<IngredientSetWithIngredientsEntity | null | undefined>;

  insertAsync(entity: Omit<IngredientSetEntity, 'id'>): Promise<number | null | undefined>;
  updateAsync(entity: MakeOptional<IngredientSetEntity, 'name' | 'image_id'>): Promise<IngredientSetWithImageEntity | null | undefined>;
  deleteAsync(id: number): Promise<boolean>;
}

export {
  IngredientSetTable,
  IngredientSetWithImageEntity,
  IngredientSetWithIngredientsEntity,
}
