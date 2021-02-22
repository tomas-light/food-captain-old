import { MakeOptional } from '@utils/types';
import { IngredientEntity } from './entities';

export interface IngredientTable {
  allAsync(): Promise<IngredientEntity[]>;
  byIdAsync(id: number): Promise<IngredientEntity | undefined>;

  insertAsync(entity: Omit<IngredientEntity, 'id'>): Promise<number | undefined>;
  updateAsync(entity: MakeOptional<IngredientEntity, 'name'>): Promise<IngredientEntity | undefined>;
  deleteAsync(id: number): Promise<boolean>;
}
