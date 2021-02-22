import { MakeOptional } from '@utils/types';
import { DishEntity } from './entities';

export interface DishTable {
  allAsync(): Promise<DishEntity[]>;
  byIdAsync(id: number): Promise<DishEntity | undefined>;

  insertAsync(entity: Omit<DishEntity, 'id'>): Promise<number | undefined>;
  updateAsync(entity: MakeOptional<DishEntity, 'name'>): Promise<DishEntity | undefined>;
  deleteAsync(id: number): Promise<boolean>;
}
