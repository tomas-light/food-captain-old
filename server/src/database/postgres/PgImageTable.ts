import { QueryConfig } from 'pg';

import { ImageEntity } from '../entities';
import { ImageTable } from '../ImageTable';
import { PgTableBase } from './base';

export class PgImageTable extends PgTableBase<ImageEntity> implements ImageTable {
  protected tableName = 'image';

  async allAsync(): Promise<ImageEntity[]> {
    return super.allAsync();
  }

  async byIdAsync(id: number): Promise<ImageEntity | undefined> {
    return super.byIdAsync(id);
  }

  async insertAsync(entity: Omit<ImageEntity, 'id'>): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<ImageEntity>(o => o.content)} 
        ) 
        VALUES($1) RETURNING ${nameof<ImageEntity>(o => o.id)};
      `,
      values: [entity.content]
    };

    const queryResult = await this.query<ImageEntity>(queryConfig);
    return queryResult.rows[0].id || undefined;
  }

  async updateAsync(entity: ImageEntity): Promise<ImageEntity | undefined> {
    const queryConfig = this.buildConfigForUpdate(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<ImageEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }

  async deleteAsync(id: number): Promise<boolean> {
    return this.deleteByIdAsync(id);
  }
}
