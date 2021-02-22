import { QueryConfig } from 'pg';
import { MakeOptional } from '@utils/types';

import { UserEntity, UserRoleEntity } from '../entities';
import { UserTable, UserWithRoleEntity } from '../UserTable';
import { PgTableBase } from './base';

export class PgUserTable extends PgTableBase<UserEntity> implements UserTable {
  protected tableName = 'users';

  async allAsync(): Promise<UserEntity[]> {
    return super.allAsync();
  }

  async byIdAsync(id: number): Promise<UserEntity | undefined> {
    return super.byIdAsync(id);
  }

  async allWithRoleAsync(): Promise<UserWithRoleEntity[]> {
    const queryResult = await this.query<UserWithRoleEntity>(`
      SELECT _user.*, _ur.${nameof<UserRoleEntity>(o => o.role_id)} 
      FROM ${this.tableName} _user 
      LEFT JOIN user_role _ur on _user.${nameof<UserEntity>(o => o.id)} = _ur.${nameof<UserRoleEntity>(o => o.user_id)};
    `);
    return queryResult.rows || [];
  }

  async byIdWithRoleAsync(id: number): Promise<UserWithRoleEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT _user.*, _ur.${nameof<UserRoleEntity>(o => o.role_id)} 
        FROM ${this.tableName} _user 
        LEFT JOIN user_role _ur on _user.${nameof<UserEntity>(o => o.id)} = _ur.${nameof<UserRoleEntity>(o => o.user_id)} 
        WHERE _user.${nameof<UserEntity>(o => o.id)} = $1;
      `,
      values: [id]
    };

    const queryResult = await this.query<UserWithRoleEntity>(queryConfig);
    return queryResult.rows[0];
  }


  async insertAsync(entity: Omit<UserEntity, 'id'>): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<UserEntity>(o => o.name)}, 
          ${nameof<UserEntity>(o => o.email)}, 
          ${nameof<UserEntity>(o => o.password)}
        ) 
        VALUES($1, $2, $3) RETURNING ${nameof<UserEntity>(o => o.id)};
      `,
      values: [entity.name, entity.email, entity.password]
    };

    const queryResult = await this.query<UserEntity>(queryConfig);
    return queryResult.rows[0].id || undefined;
  }

  async updateAsync(entity: MakeOptional<UserEntity, 'name' | 'email' | 'password'>): Promise<UserEntity | undefined> {
    const queryConfig = this.buildConfigForUpdate(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<UserEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }

  async deleteAsync(id: number): Promise<boolean> {
    return this.deleteByIdAsync(id);
  }
}
