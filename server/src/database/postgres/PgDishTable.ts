import { MakeOptional } from '@utils/types';
import { QueryConfig } from 'pg';

import { DishEntity } from '../entities';
import { DishTable } from '../DishTable';
import { PgTableBase } from './base';

export class PgDishTable extends PgTableBase<DishEntity> implements DishTable {
  protected tableName = 'dish';

  async allAsync(): Promise<DishEntity[]> {
    return super.allAsync();
  }

  async byIdAsync(id: number): Promise<DishEntity | undefined> {
    return super.byIdAsync(id);
  }

  async insertAsync(entity: Omit<DishEntity, 'id'>): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<DishEntity>(o => o.name)}, 
          ${nameof<DishEntity>(o => o.description)}, 
          ${nameof<DishEntity>(o => o.image_id)} 
        ) 
        VALUES($1, $2, $3) RETURNING ${nameof<DishEntity>(o => o.id)};
      `,
      values: [
        entity.name,
        entity.description || 'NULL',
        entity.image_id || 'NULL',
      ]
    };

    const queryResult = await this.query<DishEntity>(queryConfig);
    return queryResult.rows[0].id || undefined;
  }

  async updateAsync(entity: MakeOptional<DishEntity, 'name'>): Promise<DishEntity | undefined> {
    const queryConfig = this.buildConfigForUpdate(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<DishEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }

  async deleteAsync(id: number): Promise<boolean> {
    return this.deleteByIdAsync(id);
  }
}
