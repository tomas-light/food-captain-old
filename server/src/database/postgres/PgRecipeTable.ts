import { QueryConfig } from 'pg';
import { MakeOptional } from '@utils/types';

import { ImageEntity, IngredientEntity, IngredientInRecipeEntity, RecipeEntity } from '../entities';
import {
  RecipeTable,
  RecipeWithImageEntity,
  RecipeWithIngredientsEntity,
} from '../RecipeTable';
import { PgTableBase } from './base';

export class PgRecipeTable extends PgTableBase<RecipeEntity> implements RecipeTable {
  protected tableName = 'recipe';

  async allAsync(): Promise<RecipeWithImageEntity[]> {
    return super.allAsync();
  }

  async byIdAsync(id: number): Promise<RecipeWithImageEntity | null | undefined> {
    return super.byIdAsync(id);
  }

  async getWithIngredientsByIdAsync(id: number): Promise<RecipeWithIngredientsEntity | null | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _recipe.*, 
          _image1.${nameof<ImageEntity>(o => o.content)} as image,
          _ip.${nameof<IngredientInRecipeEntity>(o => o.ingredient_id)}, 
          _ip.${nameof<IngredientInRecipeEntity>(o => o.dimension_id)}, 
          _ip.${nameof<IngredientInRecipeEntity>(o => o.size)}, 
          _ingredient.${nameof<IngredientEntity>(o => o.name)} as ingredient_name, 
          _ingredient.${nameof<IngredientEntity>(o => o.image_id)} as ingredient_image_id, 
          _image2.${nameof<ImageEntity>(o => o.content)} as ingredient_image 
        FROM ${this.tableName} _recipe 
        LEFT JOIN image _image1 on _recipe.${nameof<RecipeEntity>(o => o.image_id)} = _image1.${nameof<ImageEntity>(o => o.id)} 
        LEFT JOIN ingredient_in_recipe _ip on _recipe.${nameof<RecipeEntity>(o => o.id)} = _ip.${nameof<IngredientInRecipeEntity>(o => o.recipe_id)} 
        JOIN ingredient _ingredient on _ip.${nameof<IngredientInRecipeEntity>(o => o.ingredient_id)} = _ingredient.${nameof<IngredientEntity>(o => o.id)} 
        LEFT JOIN image _image2 on _ingredient.${nameof<IngredientEntity>(o => o.image_id)} = _image2.${nameof<ImageEntity>(o => o.id)} 
        WHERE _recipe.${nameof<RecipeEntity>(o => o.id)} = $1;
      `,
      values: [id]
    };

    const queryResult = await this.query<RecipeWithIngredientsEntity>(queryConfig);
    return queryResult.rows[0];
  }

  async insertAsync(entity: Omit<RecipeEntity, 'id'>): Promise<number | null | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<RecipeEntity>(o => o.name)}, 
          ${nameof<RecipeEntity>(o => o.description)}, 
          ${nameof<RecipeEntity>(o => o.dish_id)}, 
          ${nameof<RecipeEntity>(o => o.image_id)} 
        ) 
        VALUES($1, $2, $3, $4) RETURNING ${nameof<RecipeEntity>(o => o.id)};
      `,
      values: [
        entity.name,
        entity.description,
        entity.dish_id,
        entity.image_id
      ]
    };

    const queryResult = await this.query<RecipeEntity>(queryConfig);
    return queryResult.rows[0].id || undefined;
  }

  async updateAsync(entity: MakeOptional<RecipeEntity, 'name' | 'dish_id' | 'image_id'>): Promise<RecipeWithImageEntity | null | undefined> {
    const queryConfig = this.buildConfigForUpdate(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<RecipeEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }

  async deleteAsync(id: number): Promise<boolean> {
    return this.deleteByIdAsync(id);
  }
}
