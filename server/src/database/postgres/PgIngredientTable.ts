import { MakeOptional } from '@utils/types';
import { QueryConfig } from 'pg';

import { IngredientEntity } from '../entities';
import { IngredientTable } from '../IngredientTable';
import { PgTableBase } from './base';

export class PgIngredientTable extends PgTableBase<IngredientEntity> implements IngredientTable {
  protected tableName = 'ingredient';

  async allAsync(): Promise<IngredientEntity[]> {
    return super.allAsync();
  }

  async byIdAsync(id: number): Promise<IngredientEntity | null | undefined> {
    return super.byIdAsync(id);
  }

  async insertAsync(entity: Omit<IngredientEntity, 'id'>): Promise<number | null | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<IngredientEntity>(o => o.name)}, 
          ${nameof<IngredientEntity>(o => o.image_id)} 
        ) 
        VALUES($1, $2) RETURNING ${nameof<IngredientEntity>(o => o.id)};
      `,
      values: [
        entity.name,
        entity.image_id,
      ]
    };

    const queryResult = await this.query<IngredientEntity>(queryConfig);
    return queryResult.rows[0].id || undefined;
  }

  async updateAsync(entity: MakeOptional<IngredientEntity, 'name'>): Promise<IngredientEntity | null | undefined> {
    const queryConfig = this.buildConfigForUpdate(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<IngredientEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }

  async deleteAsync(id: number): Promise<boolean> {
    return this.deleteByIdAsync(id);
  }
}
