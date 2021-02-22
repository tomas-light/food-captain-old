import { QueryConfig } from 'pg';
import { MakeOptional } from '@utils/types';

import { ImageEntity, IngredientEntity, IngredientInSetEntity, IngredientSetEntity } from '../entities';
import {
  IngredientSetTable,
  IngredientSetWithImageEntity,
  IngredientSetWithIngredientsEntity,
} from '../IngredientSetTable';
import { PgTableBase } from './base';

export class PgIngredientSetTable extends PgTableBase<IngredientSetEntity> implements IngredientSetTable {
  protected tableName = 'ingredient_set';

  async allAsync(): Promise<IngredientSetWithImageEntity[]> {
    return super.allAsync();
  }

  async byIdAsync(id: number): Promise<IngredientSetWithImageEntity | undefined> {
    return super.byIdAsync(id);
  }

  async getWithIngredientsByIdAsync(id: number): Promise<IngredientSetWithIngredientsEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _set.*, 
          _image1.${nameof<ImageEntity>(o => o.content)} as ${nameof<IngredientSetWithIngredientsEntity>(o => o.image)},
          _is.${nameof<IngredientInSetEntity>(o => o.ingredient_id)}, 
          _ingredient.${nameof<IngredientEntity>(o => o.name)} as ${nameof<IngredientSetWithIngredientsEntity>(o => o.ingredient_name)}, 
          _ingredient.${nameof<IngredientEntity>(o => o.image_id)} as ${nameof<IngredientSetWithIngredientsEntity>(o => o.ingredient_image_id)}, 
          _image2.${nameof<ImageEntity>(o => o.content)} as ${nameof<IngredientSetWithIngredientsEntity>(o => o.ingredient_image)} 
        FROM ${this.tableName} _set 
        LEFT JOIN image _image1 on _set.${nameof<IngredientSetEntity>(o => o.image_id)} = _image1.${nameof<ImageEntity>(o => o.id)} 
        LEFT JOIN ingredient_in_set _is on _set.${nameof<IngredientSetEntity>(o => o.id)} = _is.${nameof<IngredientInSetEntity>(o => o.ingredient_set_id)} 
        JOIN ingredient _ingredient on _is.${nameof<IngredientInSetEntity>(o => o.ingredient_id)} = _ingredient.${nameof<IngredientEntity>(o => o.id)} 
        LEFT JOIN image _image2 on _ingredient.${nameof<IngredientEntity>(o => o.image_id)} = _image2.${nameof<ImageEntity>(o => o.id)} 
        WHERE _set.${nameof<IngredientSetEntity>(o => o.id)} = $1;
      `,
      values: [id]
    };

    const queryResult = await this.query<IngredientSetWithIngredientsEntity>(queryConfig);
    return queryResult.rows[0];
  }

  async insertAsync(entity: Omit<IngredientSetEntity, 'id'>): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${nameof<IngredientSetEntity>(o => o.name)}, 
          ${nameof<IngredientSetEntity>(o => o.image_id)}, 
        ) 
        VALUES($1, $2) RETURNING ${nameof<IngredientSetEntity>(o => o.id)};
      `,
      values: [entity.name, entity.image_id || 'NULL' ]
    };

    const queryResult = await this.query<IngredientSetEntity>(queryConfig);
    return queryResult.rows[0].id || undefined;
  }

  async updateAsync(entity: MakeOptional<IngredientSetEntity, 'name' | 'image_id'>): Promise<IngredientSetWithImageEntity | undefined> {
    const queryConfig = this.buildConfigForUpdate(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<IngredientSetEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }

  async deleteAsync(id: number): Promise<boolean> {
    return this.deleteByIdAsync(id);
  }
}
