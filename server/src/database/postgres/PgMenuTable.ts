import { QueryConfig } from 'pg';
import { MakeOptional } from '@utils/types';

import {
  DishEntity,
  DishInMenuEntity,
  ImageEntity,
  MenuEntity,
} from '../entities';
import {
  MenuTable,
  MenuWithDishesEntity,
} from '../MenuTable';
import { PgTableBase } from './base';

export class PgMenuTable extends PgTableBase<MenuEntity> implements MenuTable {
  protected tableName = 'menu';

  async allAsync(): Promise<MenuEntity[]> {
    return super.allAsync();
  }

  async byIdAsync(id: number): Promise<MenuEntity | undefined> {
    return super.byIdAsync(id);
  }

  async getWithDishesByIdAsync(id: number): Promise<MenuWithDishesEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _menu.*, 
          _dm.${nameof<DishInMenuEntity>(o => o.dish_id)}, 
          _dish.${nameof<DishEntity>(o => o.name)} as ${nameof<MenuWithDishesEntity>(o => o.dish_name)}, 
          _dish.${nameof<DishEntity>(o => o.description)}, 
          _dish.${nameof<DishEntity>(o => o.image_id)}, 
          _dm.${nameof<DishInMenuEntity>(o => o.order_number)}, 
          _image.${nameof<ImageEntity>(o => o.content)} as ${nameof<MenuWithDishesEntity>(o => o.image)} 
        FROM ${this.tableName} _menu 
        LEFT JOIN dish_in_menu _dm on _menu.${nameof<MenuEntity>(o => o.id)} = _dm.${nameof<DishInMenuEntity>(o => o.menu_id)} 
        JOIN dish _dish on _dm.${nameof<DishInMenuEntity>(o => o.dish_id)} = _dish.${nameof<DishEntity>(o => o.id)} 
        LEFT JOIN image _image on _dish.${nameof<DishEntity>(o => o.image_id)} = _image.${nameof<ImageEntity>(o => o.id)} 
        WHERE id = $1;
      `,
      values: [id]
    };

    const queryResult = await this.query<MenuWithDishesEntity>(queryConfig);
    return queryResult.rows[0];
  }

  async insertAsync(entity: Omit<MenuEntity, 'id'>): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<MenuEntity>(o => o.name)}, 
          ${nameof<MenuEntity>(o => o.author_id)} 
        ) 
        VALUES($1, $2) RETURNING ${nameof<MenuEntity>(o => o.id)};
      `,
      values: [
        entity.name,
        entity.author_id || 'NULL'
      ]
    };

    const queryResult = await this.query<MenuEntity>(queryConfig);
    return queryResult.rows[0].id || undefined;
  }

  async updateAsync(entity: MakeOptional<MenuEntity, 'create_date' | 'last_update' | 'author_id'>): Promise<MenuEntity | undefined> {
    const queryConfig = this.buildConfigForUpdate(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<MenuEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }

  async deleteAsync(id: number): Promise<boolean> {
    return this.deleteByIdAsync(id);
  }
}
