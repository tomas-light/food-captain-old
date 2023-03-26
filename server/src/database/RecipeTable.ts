import { MakeOptional } from '@utils/types';
import { IngredientInRecipeEntity, RecipeEntity } from './entities';

interface RecipeWithImageEntity extends RecipeEntity {
  image?: string;
}

interface RecipeWithIngredientsEntity extends RecipeWithImageEntity, Omit<IngredientInRecipeEntity, 'recipe_id'> {
  ingredient_id: number;
  ingredient_name: string;
  ingredient_image_id?: number
  ingredient_image?: string
}

interface RecipeTable {
  allAsync(): Promise<RecipeWithImageEntity[]>;
  byIdAsync(id: number): Promise<RecipeWithImageEntity | null | undefined>;

  getWithIngredientsByIdAsync(id: number): Promise<RecipeWithIngredientsEntity | null | undefined>;

  insertAsync(entity: Omit<RecipeEntity, 'id'>): Promise<number | null | undefined>;
  updateAsync(entity: MakeOptional<RecipeEntity, 'name' | 'dish_id' | 'image_id'>): Promise<RecipeWithImageEntity | null | undefined>;
  deleteAsync(id: number): Promise<boolean>;
}

export {
  RecipeTable,
  RecipeWithImageEntity,
  RecipeWithIngredientsEntity,
}
