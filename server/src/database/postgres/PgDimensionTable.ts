import { QueryConfig } from 'pg';

import { DimensionEntity } from '../entities';
import { DimensionTable } from '../DimensionTable';
import { PgTableBase } from './base';

export class PgDimensionTable extends PgTableBase<DimensionEntity> implements DimensionTable {
  protected tableName = 'dimension';

  async allAsync(): Promise<DimensionEntity[]> {
    return super.allAsync();
  }

  async byIdAsync(id: number): Promise<DimensionEntity | null | undefined> {
    return super.byIdAsync(id);
  }

  async insertAsync(entity: Omit<DimensionEntity, 'id'>): Promise<number | null | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<DimensionEntity>(o => o.name)} 
        ) 
        VALUES($1) RETURNING ${nameof<DimensionEntity>(o => o.id)};
      `,
      values: [entity.name]
    };

    const queryResult = await this.query<DimensionEntity>(queryConfig);
    return queryResult.rows[0].id || undefined;
  }

  async updateAsync(entity: DimensionEntity): Promise<DimensionEntity | null | undefined> {
    const queryConfig = this.buildConfigForUpdate(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<DimensionEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }

  async deleteAsync(id: number): Promise<boolean> {
    return this.deleteByIdAsync(id);
  }
}
