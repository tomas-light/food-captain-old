import { IngredientInRecipeEntity } from './entities';

export interface IngredientInRecipeTable {
  allAsync(): Promise<IngredientInRecipeEntity[]>;
  getAsync(recipe_id: number, ingredient_id: number): Promise<IngredientInRecipeEntity | null | undefined>;

  insertAsync(entity: IngredientInRecipeEntity): Promise<boolean>;
  updateAsync(entity: IngredientInRecipeEntity): Promise<IngredientInRecipeEntity | null | undefined>;
  deleteAsync(entity: Pick<IngredientInRecipeEntity, 'recipe_id' | 'ingredient_id'>): Promise<boolean>;
}
