import { ImageEntity } from './entities';

export interface ImageTable {
  allAsync(): Promise<ImageEntity[]>;
  byIdAsync(id: number): Promise<ImageEntity | null | undefined>;

  insertAsync(entity: Omit<ImageEntity, 'id'>): Promise<number | null | undefined>;
  updateAsync(entity: ImageEntity): Promise<ImageEntity | null | undefined>;
  deleteAsync(id: number): Promise<boolean>;
}
