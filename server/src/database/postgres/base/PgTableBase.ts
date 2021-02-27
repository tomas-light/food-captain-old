import { Logger } from '@utils/loggers';
import { Pool, QueryConfig } from 'pg';
import { Sequelize } from 'sequelize';
import { Query } from './Query';

export class PgTableBase<TEntity> extends Query {
  protected tableName?: string;

  constructor(
    logger: Logger,
    pool: Pool,
    protected readonly sequelize: Sequelize
  ) {
    super(logger, pool);
  }

  protected async allAsync(): Promise<TEntity[]> {
    const queryResult = await this.query<TEntity>(`SELECT * from ${this.tableName}`);
    return queryResult.rows || [];
  }

  protected async byIdAsync(id: number): Promise<TEntity | undefined | null> {
    const queryConfig: QueryConfig = {
      text: `SELECT * FROM ${this.tableName} WHERE id = $1;`,
      values: [id]
    };

    const queryResult = await this.query<TEntity>(queryConfig);
    return queryResult.rows[0];
  }

  protected buildConfigForUpdate(entity: Partial<TEntity> & { id: number; }) {
    const propertyNames = Object.keys(entity);
    if (propertyNames.length <= 1) {
      return undefined;
    }

    const values: any[] = [entity.id];
    const params: string[] = [];
    let valueNumber = values.length + 1;

    propertyNames.forEach(propertyName => {
      let value = entity[propertyName];
      if (value instanceof Date) {
        value = value.toISOString();
      }
      values.push(value);
      params.push(`${propertyName} = $${valueNumber++}`);
    });

    const queryConfig: QueryConfig = {
      text: `UPDATE ${this.tableName} SET ${params.join(', ')} WHERE id = $1;`,
      values
    };
    return queryConfig;
  }

  protected async deleteByIdAsync(id: number) {
    const queryConfig: QueryConfig = {
      text: `DELETE FROM ${this.tableName} WHERE id = $1;`,
      values: [id]
    };

    const queryResult = await this.query(queryConfig);
    return queryResult.rowCount > 0;
  }
}
