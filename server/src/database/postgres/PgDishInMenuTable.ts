import { QueryConfig } from 'pg';

import { DishInMenuEntity } from '../entities';
import { DishInMenuTable } from '../DishInMenuTable';
import { PgTableBase } from './base';

export class PgDishInMenuTable extends PgTableBase<DishInMenuEntity> implements DishInMenuTable {
  protected tableName = 'dish_in_menu';

  async allAsync(): Promise<DishInMenuEntity[]> {
    return super.allAsync();
  }

  async getAsync(menu_id: number, dish_id: number): Promise<DishInMenuEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.tableName} 
        WHERE ${nameof<DishInMenuEntity>(o => o.menu_id)} = $1 
        AND ${nameof<DishInMenuEntity>(o => o.dish_id)} = $2;
      `,
      values: [menu_id, dish_id]
    };

    const queryResult = await this.query<DishInMenuEntity>(queryConfig);
    return queryResult.rows[0];
  }

  async insertAsync(entity: DishInMenuEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<DishInMenuEntity>(o => o.menu_id)}, 
          ${nameof<DishInMenuEntity>(o => o.dish_id)}, 
          ${nameof<DishInMenuEntity>(o => o.order_number)} 
        ) 
        VALUES($1, $2, $3);
      `,
      values: [
        entity.menu_id,
        entity.dish_id,
        entity.order_number || 'NULL',
      ]
    };

    const queryResult = await this.query<DishInMenuEntity>(queryConfig);
    return queryResult.rowCount > 0;
  }

  async updateAsync(entity: DishInMenuEntity): Promise<DishInMenuEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        UPDATE ${this.tableName} 
        SET ${nameof<DishInMenuEntity>(o => o.order_number)} = $1 
        WHERE ${nameof<DishInMenuEntity>(o => o.menu_id)} = $2 
        AND ${nameof<DishInMenuEntity>(o => o.dish_id)} = $3;
      `,
      values: [entity.order_number, entity.menu_id, entity.dish_id]
    };

    await this.query<DishInMenuEntity>(queryConfig);
    return this.getAsync(entity.menu_id, entity.dish_id);
  }

  async deleteAsync(entity: Pick<DishInMenuEntity, 'menu_id' | 'dish_id'>): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.tableName} 
        WHERE ${nameof<DishInMenuEntity>(o => o.menu_id)} = $1 
        AND ${nameof<DishInMenuEntity>(o => o.dish_id)} = $2;
      `,
      values: [entity.menu_id, entity.dish_id]
    };

    const queryResult = await this.query(queryConfig);
    return queryResult.rowCount > 0;
  }
}
