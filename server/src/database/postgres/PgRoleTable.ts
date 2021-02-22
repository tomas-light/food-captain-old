import { QueryConfig } from 'pg';

import { RoleEntity } from '../entities';
import { RoleTable } from '../RoleTable';
import { PgTableBase } from './base';

export class PgRoleTable extends PgTableBase<RoleEntity> implements RoleTable {
  protected tableName = 'role';

  async allAsync(): Promise<RoleEntity[]> {
    return super.allAsync();
  }

  async byIdAsync(id: number): Promise<RoleEntity | undefined> {
    return super.byIdAsync(id);
  }

  async insertAsync(entity: Omit<RoleEntity, 'id'>): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<RoleEntity>(o => o.name)} 
        ) 
        VALUES($1) RETURNING ${nameof<RoleEntity>(o => o.id)};
      `,
      values: [entity.name]
    };

    const queryResult = await this.query<RoleEntity>(queryConfig);
    return queryResult.rows[0].id || undefined;
  }

  async updateAsync(entity: RoleEntity): Promise<RoleEntity | undefined> {
    const queryConfig = this.buildConfigForUpdate(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<RoleEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }

  async deleteAsync(id: number): Promise<boolean> {
    return this.deleteByIdAsync(id);
  }
}
