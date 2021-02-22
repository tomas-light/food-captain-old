import { QueryConfig } from 'pg';

import { IngredientInSetEntity } from '../entities';
import { IngredientInSetTable } from '../IngredientInSetTable';
import { PgTableBase } from './base';

export class PgIngredientInSetTable extends PgTableBase<IngredientInSetEntity> implements IngredientInSetTable {
  protected tableName = 'ingredient_in_set';

  async allAsync(): Promise<IngredientInSetEntity[]> {
    return super.allAsync();
  }

  // todo: possible redundant
  async getAsync(ingredient_set_id: number, ingredient_id: number): Promise<IngredientInSetEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.tableName} 
        WHERE ${nameof<IngredientInSetEntity>(o => o.ingredient_set_id)} = $1 
        AND ${nameof<IngredientInSetEntity>(o => o.ingredient_id)} = $2;
      `,
      values: [ingredient_set_id, ingredient_id]
    };

    const queryResult = await this.query<IngredientInSetEntity>(queryConfig);
    return queryResult.rows[0];
  }

  async insertAsync(entity: IngredientInSetEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<IngredientInSetEntity>(o => o.ingredient_set_id)}, 
          ${nameof<IngredientInSetEntity>(o => o.ingredient_id)} 
        ) 
        VALUES($1, $2);
      `,
      values: [
        entity.ingredient_set_id,
        entity.ingredient_id,
      ]
    };

    const queryResult = await this.query<IngredientInSetEntity>(queryConfig);
    return queryResult.rowCount > 0;
  }

  async deleteAsync(entity: IngredientInSetEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.tableName} 
        WHERE ${nameof<IngredientInSetEntity>(o => o.ingredient_id)} = $1 
        AND ${nameof<IngredientInSetEntity>(o => o.ingredient_set_id)} = $2;
      `,
      values: [entity.ingredient_set_id, entity.ingredient_id]
    };

    const queryResult = await this.query(queryConfig);
    return queryResult.rowCount > 0;
  }
}
