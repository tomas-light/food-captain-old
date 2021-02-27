import { DimensionEntity } from './entities';

export interface DimensionTable {
  allAsync(): Promise<DimensionEntity[]>;
  byIdAsync(id: number): Promise<DimensionEntity | null | undefined>;

  insertAsync(entity: Omit<DimensionEntity, 'id'>): Promise<number | null | undefined>;
  updateAsync(entity: DimensionEntity): Promise<DimensionEntity | null | undefined>;
  deleteAsync(id: number): Promise<boolean>;
}
