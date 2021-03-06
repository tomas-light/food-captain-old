import { MakeOptional } from '@utils/types';
import { QueryConfig } from 'pg';
import { ModelType, QueryTypes } from 'sequelize';

import { DishEntity, DishInMenuEntity, ImageEntity, MenuEntity, MenuInScheduleEntity, UserEntity, } from '../entities';
import { MenuTable, MenuWithDateEntity, MenuWithDishesEntity, } from '../MenuTable';
import { PgTableBase } from './base';

export class PgMenuTable extends PgTableBase<MenuEntity> implements MenuTable {
  protected tableName = 'menu';

  async allAsync(): Promise<MenuEntity[]> {
    return MenuEntity.findAll({
      include: [
        {
          model: DishEntity as ModelType,
          as: 'dishes',
          through: {
            as: 'menu',
            attributes: ['order_number'],
          },
        },
        {
          model: UserEntity as ModelType,
          as: 'author',
        },
      ]
    });
  }

  async byIdAsync(id: number): Promise<MenuEntity | null> {
    return MenuEntity.findByPk(id);
  }

  async byScheduleIdAsync(schedule_id: number): Promise<MenuWithDateEntity[]> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT _menu.* 
        FROM ${this.tableName} _menu
        LEFT JOIN menu_in_schedule _ms on _menu.${nameof<MenuEntity>(o => o.id)} = _ms.${nameof<MenuInScheduleEntity>(o => o.menu_id)}
        WHERE _menu.${nameof<MenuInScheduleEntity>(o => o.schedule_id)} = $1;
      `,
      values: [schedule_id]
    };

    return this.sequelize.query<MenuWithDateEntity>(
      queryConfig.text,
      {
        type: QueryTypes.SELECT,
        bind: queryConfig.values
      }
    );

    // const queryResult = await this.query<MenuWithDateEntity>(queryConfig);
    // return queryResult.rows;
  }

  async getWithDishesByIdAsync(id: number): Promise<MenuWithDishesEntity[]> {
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
        WHERE _menu.${nameof<MenuEntity>(o => o.id)} = $1;
      `,
      values: [id]
    };

    return this.sequelize.query<MenuWithDishesEntity>(
      queryConfig.text,
      {
        type: QueryTypes.SELECT,
        bind: queryConfig.values
      }
    );

    // const queryResult = await this.query<MenuWithDishesEntity>(queryConfig);
    // return queryResult.rows;
  }

  async insertAsync(entity: Omit<MenuEntity, 'id'>): Promise<number | null | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<MenuEntity>(o => o.name)}, 
          ${nameof<MenuEntity>(o => o.create_date)}, 
          ${nameof<MenuEntity>(o => o.last_update)}, 
          ${nameof<MenuEntity>(o => o.author_id)} 
        ) 
        VALUES($1, $2, $3, $4) RETURNING ${nameof<MenuEntity>(o => o.id)};
      `,
      values: [
        entity.name,
// @ts-ignore
        entity.create_date.toISOString(),
// @ts-ignore
        entity.last_update.toISOString(),
        entity.author_id,
      ]
    };

// @ts-ignore
    return this.sequelize.query(
      queryConfig.text,
      {
        type: QueryTypes.INSERT,
        bind: queryConfig.values
      }
    );

    // const queryResult = await this.query<MenuEntity>(queryConfig);
    // return queryResult.rows[0].id || undefined;
  }

  async updateAsync(entity: MakeOptional<MenuEntity, 'name' | 'create_date' | 'last_update' | 'author_id'>): Promise<MenuEntity | null> {
    const queryConfig = this.buildConfigForUpdate(entity);
    if (!queryConfig) {
      return null;
    }

// @ts-ignore
    await this.sequelize.query<MenuEntity>(
      queryConfig.text,
      {
        type: QueryTypes.UPDATE,
        bind: queryConfig.values
      }
    );

    // await this.query<MenuEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }

  async deleteAsync(id: number): Promise<boolean> {
    return this.deleteByIdAsync(id);
  }
}
