import { QueryConfig } from 'pg';

import { IngredientInRecipeEntity } from '../entities';
import { IngredientInRecipeTable } from '../IngredientInRecipeTable';
import { PgTableBase } from './base';

export class PgIngredientInRecipeTable extends PgTableBase<IngredientInRecipeEntity> implements IngredientInRecipeTable {
  protected tableName = 'ingredient_in_recipe';

  async allAsync(): Promise<IngredientInRecipeEntity[]> {
    return super.allAsync();
  }

  async getAsync(recipe_id: number, ingredient_id: number): Promise<IngredientInRecipeEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.tableName} 
        WHERE ${nameof<IngredientInRecipeEntity>(o => o.recipe_id)} = $1 
        AND ${nameof<IngredientInRecipeEntity>(o => o.ingredient_id)} = $2;
      `,
      values: [recipe_id, ingredient_id]
    };

    const queryResult = await this.query<IngredientInRecipeEntity>(queryConfig);
    return queryResult.rows[0];
  }

  async insertAsync(entity: IngredientInRecipeEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<IngredientInRecipeEntity>(o => o.recipe_id)}, 
          ${nameof<IngredientInRecipeEntity>(o => o.ingredient_id)}, 
          ${nameof<IngredientInRecipeEntity>(o => o.dimension_id)}, 
          ${nameof<IngredientInRecipeEntity>(o => o.size)} 
        ) 
        VALUES($1, $2, $3, $4);
      `,
      values: [
        entity.recipe_id,
        entity.ingredient_id,
        entity.dimension_id || 'NULL',
        entity.size || 'NULL',
      ]
    };

    const queryResult = await this.query<IngredientInRecipeEntity>(queryConfig);
    return queryResult.rowCount > 0;
  }

  async updateAsync(entity: IngredientInRecipeEntity): Promise<IngredientInRecipeEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        UPDATE ${this.tableName} 
        SET ${nameof<IngredientInRecipeEntity>(o => o.dimension_id)} = $1, 
          ${nameof<IngredientInRecipeEntity>(o => o.size)} = $2 
        WHERE ${nameof<IngredientInRecipeEntity>(o => o.recipe_id)}  = $3 
        AND ${nameof<IngredientInRecipeEntity>(o => o.ingredient_id)}  = $4;
      `,
      values: [
        entity.dimension_id || 'NULL',
        entity.size || 'NULL',
        entity.recipe_id,
        entity.ingredient_id,
      ]
    };

    await this.query<IngredientInRecipeEntity>(queryConfig);
    return this.getAsync(entity.recipe_id, entity.ingredient_id);
  }

  async deleteAsync(entity: Pick<IngredientInRecipeEntity, 'recipe_id' | 'ingredient_id'>): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.tableName} 
        WHERE ${nameof<IngredientInRecipeEntity>(o => o.recipe_id)} = $1 
        AND ${nameof<IngredientInRecipeEntity>(o => o.ingredient_id)} = $2;
      `,
      values: [entity.recipe_id, entity.ingredient_id]
    };

    const queryResult = await this.query(queryConfig);
    return queryResult.rowCount > 0;
  }
}
