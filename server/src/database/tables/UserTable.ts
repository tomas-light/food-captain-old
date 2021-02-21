import { QueryConfig } from 'pg';

import { UserEntity } from '../entities';
import { TableBase } from './TableBase';

export class UserTable extends TableBase<UserEntity> {
  private readonly tableName = 'users';

  async allAsync(): Promise<UserEntity[]> {
    const queryResult = await this.query<UserEntity>(`SELECT * from ${this.tableName}`);
    return queryResult.rows || [];
  }

  async byIdAsync(id: number): Promise<UserEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `SELECT * FROM ${this.tableName} WHERE id = $1;`,
      values: [id]
    };

    const queryResult = await this.query<UserEntity>(queryConfig);
    return queryResult.rows[0];
  }

  async insertAsync(user: Omit<UserEntity, 'id'>): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<UserEntity>(o => o.name)}, 
          ${nameof<UserEntity>(o => o.email)}, 
          ${nameof<UserEntity>(o => o.password)}
        ) 
        VALUES($1, $2, $3) RETURNING id;
      `,
      values: [user.name, user.email, user.password]
    };

    const queryResult = await this.query<UserEntity>(queryConfig);
    return queryResult.rows[0].id || undefined;
  }

  async updateAsync(user: Pick<UserEntity, 'id'> & Partial<UserEntity>): Promise<UserEntity | undefined> {
    const propertyNames = Object.keys(user);
    if (propertyNames.length <= 1) {
      return undefined;
    }

    const values: any[] = [user.id];
    const params: string[] = [];
    let valueNumber = values.length + 1;

    propertyNames.forEach(propertyName => {
      values.push(user[propertyName]);
      params.push(`${propertyName} = $${valueNumber++}`);
    });

    const queryConfig: QueryConfig = {
      text: `UPDATE ${this.tableName} SET ${params.join(', ')} WHERE id = $1;`,
      values
    };

    await this.query<UserEntity>(queryConfig);
    return this.byIdAsync(user.id);
  }

  async deleteAsync(id: number): Promise<number> {
    const queryConfig: QueryConfig = {
      text: `DELETE FROM ${this.tableName} WHERE id = $1;`,
      values: [id]
    };

    const queryResult = await this.query(queryConfig);
    return queryResult.rowCount;
  }
}
