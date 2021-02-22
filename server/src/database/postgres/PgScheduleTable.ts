import { QueryConfig } from 'pg';
import { MakeOptional } from '@utils/types';

import { MenuEntity, MenuInScheduleEntity, ScheduleEntity } from '../entities';
import {
  ScheduleTable,
  ScheduleWithMenuEntity,
} from '../ScheduleTable';
import { PgTableBase } from './base';

export class PgScheduleTable extends PgTableBase<ScheduleEntity> implements ScheduleTable {
  protected tableName = 'schedule';

  async allAsync(): Promise<ScheduleEntity[]> {
    return super.allAsync();
  }

  async byIdAsync(id: number): Promise<ScheduleEntity | undefined> {
    return super.byIdAsync(id);
  }

  async getWithMenuByIdAsync(id: number): Promise<ScheduleWithMenuEntity> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _schedule.*, 
          _ms.${nameof<MenuInScheduleEntity>(o => o.date)}, 
          _ms.${nameof<MenuInScheduleEntity>(o => o.menu_id)}, 
          _menu.${nameof<MenuEntity>(o => o.name)} as ${nameof<ScheduleWithMenuEntity>(o => o.menu_name)}, 
          _menu.${nameof<MenuEntity>(o => o.create_date)}, 
          _menu.${nameof<MenuEntity>(o => o.last_update)}, 
          _menu.${nameof<MenuEntity>(o => o.author_id)} 
        FROM ${this.tableName} _schedule 
        LEFT JOIN menu_in_schedule _ms on _schedule.${nameof<ScheduleEntity>(o => o.id)} = _ms.${nameof<MenuInScheduleEntity>(o => o.schedule_id)} 
        JOIN menu _menu on _ms.${nameof<MenuInScheduleEntity>(o => o.menu_id)} = _menu.${nameof<MenuEntity>(o => o.id)} 
        WHERE _schedule.${nameof<ScheduleEntity>(o => o.id)} = $1;
      `,
      values: [id]
    };

    const queryResult = await this.query<ScheduleWithMenuEntity>(queryConfig);
    return queryResult.rows[0];
  }

  async insertAsync(entity: Omit<ScheduleEntity, 'id'>): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<ScheduleEntity>(o => o.author_id)}, 
          ${nameof<ScheduleEntity>(o => o.name)}, 
        ) 
        VALUES($1, $2) RETURNING ${nameof<ScheduleEntity>(o => o.id)};
      `,
      values: [entity.author_id, entity.name]
    };

    const queryResult = await this.query<ScheduleEntity>(queryConfig);
    return queryResult.rows[0].id || undefined;
  }

  async updateAsync(entity: MakeOptional<ScheduleEntity, 'author_id' | 'name'>): Promise<ScheduleEntity | undefined> {
    const queryConfig = this.buildConfigForUpdate(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<ScheduleEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }

  async deleteAsync(id: number): Promise<boolean> {
    return this.deleteByIdAsync(id);
  }
}
