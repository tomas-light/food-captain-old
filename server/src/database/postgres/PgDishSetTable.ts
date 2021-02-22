import { QueryConfig } from 'pg';
import { MakeOptional } from '@utils/types';

import { DishEntity, DishInSetEntity, DishSetEntity, ImageEntity } from '../entities';
import {
  DishSetTable,
  DishSetWithDishesEntity,
} from '../DishSetTable';
import { PgTableBase } from './base';

export class PgDishSetTable extends PgTableBase<DishSetEntity> implements DishSetTable {
  protected tableName = 'dish_set';

  async allAsync(): Promise<DishSetEntity[]> {
    return super.allAsync();
  }

  async byIdAsync(id: number): Promise<DishSetEntity | undefined> {
    return super.byIdAsync(id);
  }

  async getWithDishesByIdAsync(id: number): Promise<DishSetWithDishesEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _dish_set.*, 
          _ds.${nameof<DishSetWithDishesEntity>(o => o.dish_id)}, 
          _dish.${nameof<DishSetWithDishesEntity>(o => o.name)} as dish_name, 
          _dish.${nameof<DishSetWithDishesEntity>(o => o.description)}, 
          _dish.${nameof<DishSetWithDishesEntity>(o => o.image_id)}, 
          _image.content as ${nameof<DishSetWithDishesEntity>(o => o.image)} 
        FROM ${this.tableName} _dish_set 
        LEFT JOIN dish_in_set _ds on _dish_set.${nameof<DishSetEntity>(o => o.id)} = _ds.${nameof<DishInSetEntity>(o => o.dish_set_id)} 
        JOIN dish _dish on _ds.${nameof<DishInSetEntity>(o => o.dish_id)} = _dish.${nameof<DishEntity>(o => o.id)} 
        LEFT JOIN image _image on _dish.${nameof<DishEntity>(o => o.image_id)} = _image.${nameof<ImageEntity>(o => o.id)} 
        WHERE _dish_set.${nameof<DishSetEntity>(o => o.id)} = $1;
      `,
      values: [id]
    };

    const queryResult = await this.query<DishSetWithDishesEntity>(queryConfig);
    return queryResult.rows[0];
  }

  async insertAsync(entity: Omit<DishSetEntity, 'id'>): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<DishSetEntity>(o => o.name)}, 
          ${nameof<DishSetEntity>(o => o.image_id)}, 
        ) 
        VALUES($1, $2) RETURNING id;
      `,
      values: [entity.name, entity.image_id || 'NULL' ]
    };

    const queryResult = await this.query<DishSetEntity>(queryConfig);
    return queryResult.rows[0].id || undefined;
  }

  async updateAsync(entity: MakeOptional<DishSetEntity, 'name' | 'image_id'>): Promise<DishSetEntity | undefined> {
    const queryConfig = this.buildConfigForUpdate(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<DishSetEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }

  async deleteAsync(id: number): Promise<boolean> {
    return this.deleteByIdAsync(id);
  }
}
