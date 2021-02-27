import { MakeOptional } from '@utils/types';
import { IngredientEntity } from './entities';

export interface IngredientTable {
  allAsync(): Promise<IngredientEntity[]>;
  byIdAsync(id: number): Promise<IngredientEntity | null | undefined>;

  insertAsync(entity: Omit<IngredientEntity, 'id'>): Promise<number | null | undefined>;
  updateAsync(entity: MakeOptional<IngredientEntity, 'name'>): Promise<IngredientEntity | null | undefined>;
  deleteAsync(id: number): Promise<boolean>;
}
