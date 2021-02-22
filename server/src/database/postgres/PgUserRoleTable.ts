import { QueryConfig } from 'pg';

import { UserRoleEntity } from '../entities';
import { UserRoleTable } from '../UserRoleTable';
import { PgTableBase } from './base';

export class PgUserRoleTable extends PgTableBase<UserRoleEntity> implements UserRoleTable {
  protected tableName = 'user_role';

  async allAsync(): Promise<UserRoleEntity[]> {
    return super.allAsync();
  }

  // todo: possible redundant
  async getAsync(user_id: number, role_id: number): Promise<UserRoleEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.tableName} 
        WHERE ${nameof<UserRoleEntity>(o => o.user_id)} = $1 
        AND ${nameof<UserRoleEntity>(o => o.role_id)} = $2;
      `,
      values: [user_id, role_id]
    };

    const queryResult = await this.query<UserRoleEntity>(queryConfig);
    return queryResult.rows[0];
  }

  async insertAsync(entity: UserRoleEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<UserRoleEntity>(o => o.user_id)}, 
          ${nameof<UserRoleEntity>(o => o.role_id)} 
        ) 
        VALUES($1, $2);
      `,
      values: [
        entity.user_id,
        entity.role_id,
      ]
    };

    const queryResult = await this.query<UserRoleEntity>(queryConfig);
    return queryResult.rowCount > 0;
  }

  async deleteAsync(entity: UserRoleEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.tableName} 
        WHERE ${nameof<UserRoleEntity>(o => o.user_id)} = $1 
        AND ${nameof<UserRoleEntity>(o => o.role_id)} = $2;
      `,
      values: [entity.user_id, entity.role_id]
    };

    const queryResult = await this.query(queryConfig);
    return queryResult.rowCount > 0;
  }
}
