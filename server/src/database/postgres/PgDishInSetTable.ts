import { QueryConfig } from 'pg';

import { DishInSetEntity } from '../entities';
import { DishInSetTable } from '../DishInSetTable';
import { PgTableBase } from './base';

export class PgDishInSetTable extends PgTableBase<DishInSetEntity> implements DishInSetTable {
  protected tableName = 'dish_in_set';

  async allAsync(): Promise<DishInSetEntity[]> {
    return super.allAsync();
  }

  // todo: possible redundant
  async getAsync(dish_set_id: number, dish_id: number): Promise<DishInSetEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.tableName} 
        WHERE ${nameof<DishInSetEntity>(o => o.dish_set_id)} = $1 
        AND ${nameof<DishInSetEntity>(o => o.dish_id)} = $2;
      `,
      values: [dish_set_id, dish_id]
    };

    const queryResult = await this.query<DishInSetEntity>(queryConfig);
    return queryResult.rows[0];
  }

  async insertAsync(entity: DishInSetEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<DishInSetEntity>(o => o.dish_set_id)}, 
          ${nameof<DishInSetEntity>(o => o.dish_id)} 
        ) 
        VALUES($1, $2);
      `,
      values: [
        entity.dish_set_id,
        entity.dish_id,
      ]
    };

    const queryResult = await this.query<DishInSetEntity>(queryConfig);
    return queryResult.rowCount > 0;
  }

  async deleteAsync(entity: DishInSetEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.tableName} 
        WHERE ${nameof<DishInSetEntity>(o => o.dish_set_id)} = $1 
        AND ${nameof<DishInSetEntity>(o => o.dish_id)} = $2;
      `,
      values: [entity.dish_set_id, entity.dish_id]
    };

    const queryResult = await this.query(queryConfig);
    return queryResult.rowCount > 0;
  }
}
