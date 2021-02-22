import { QueryConfig } from 'pg';

import { RecipeImageEntity } from '../entities';
import { RecipeImageTable } from '../RecipeImageTable';
import { PgTableBase } from './base';

export class PgRecipeImageTable extends PgTableBase<RecipeImageEntity> implements RecipeImageTable {
  protected tableName = 'recipe_image';

  async allAsync(): Promise<RecipeImageEntity[]> {
    return super.allAsync();
  }

  // todo: possible redundant
  async getAsync(recipe_id: number, image_id: number): Promise<RecipeImageEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.tableName} 
        WHERE ${nameof<RecipeImageEntity>(o => o.recipe_id)} = $1 
        AND ${nameof<RecipeImageEntity>(o => o.image_id)} = $2;
      `,
      values: [recipe_id, image_id]
    };

    const queryResult = await this.query<RecipeImageEntity>(queryConfig);
    return queryResult.rows[0];
  }

  async insertAsync(entity: RecipeImageEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<RecipeImageEntity>(o => o.recipe_id)}, 
          ${nameof<RecipeImageEntity>(o => o.image_id)} 
        ) 
        VALUES($1, $2);
      `,
      values: [
        entity.recipe_id,
        entity.image_id,
      ]
    };

    const queryResult = await this.query<RecipeImageEntity>(queryConfig);
    return queryResult.rowCount > 0;
  }

  async deleteAsync(entity: RecipeImageEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.tableName} 
        WHERE ${nameof<RecipeImageEntity>(o => o.recipe_id)} = $1 
        AND ${nameof<RecipeImageEntity>(o => o.image_id)} = $2;
      `,
      values: [entity.recipe_id, entity.image_id]
    };

    const queryResult = await this.query(queryConfig);
    return queryResult.rowCount > 0;
  }
}
