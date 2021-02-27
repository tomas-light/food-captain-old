import { MakeOptional } from '@utils/types';
import { QueryConfig } from 'pg';

import { DishEntity, DishInMenuEntity } from '../entities';
import { DishTable, MenuDishesEntity } from '../DishTable';
import { PgTableBase } from './base';

export class PgDishTable extends PgTableBase<DishEntity> implements DishTable {
  protected tableName = 'dish';

  async allAsync(): Promise<DishEntity[]> {
    return super.allAsync();
  }

  async byIdAsync(id: number): Promise<DishEntity | null | undefined> {
    return super.byIdAsync(id);
  }

  async byMenuIdAsync(menuId: number): Promise<MenuDishesEntity[]> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _dm.${nameof<DishInMenuEntity>(o => o.menu_id)},
          _dish.*, 
          _dm.${nameof<DishInMenuEntity>(o => o.order_number)} 
        FROM ${this.tableName} _dish
        JOIN dish_in_menu _dm on _dish.${nameof<DishEntity>(o => o.id)} = _dm.${nameof<DishInMenuEntity>(o => o.dish_id)}
        WHERE ${nameof<DishInMenuEntity>(o => o.menu_id)} == $1;
      `,
      values: [menuId]
    };

    const queryResult = await this.query<MenuDishesEntity>(queryConfig);
    return queryResult.rows;
  }

  async byMenuIdsAsync(menuIds: number[]): Promise<MenuDishesEntity[]> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _dm.${nameof<DishInMenuEntity>(o => o.menu_id)},
          _dish.*, 
          _dm.${nameof<DishInMenuEntity>(o => o.order_number)} 
        FROM ${this.tableName} _dish
        JOIN dish_in_menu _dm on _dish.${nameof<DishEntity>(o => o.id)} = _dm.${nameof<DishInMenuEntity>(o => o.dish_id)}
        WHERE ${nameof<DishInMenuEntity>(o => o.menu_id)} in ($1);
      `,
      values: menuIds
    };

    const queryResult = await this.query<MenuDishesEntity>(queryConfig);
    return queryResult.rows;
  }

  async insertAsync(entity: Omit<DishEntity, 'id'>): Promise<number | null | undefined> {
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
        entity.description,
        entity.image_id,
      ]
    };

    const queryResult = await this.query<DishEntity>(queryConfig);
    return queryResult.rows[0].id || undefined;
  }

  async updateAsync(entity: MakeOptional<DishEntity, 'name'>): Promise<DishEntity | null | undefined> {
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
