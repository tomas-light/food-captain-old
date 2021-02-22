import { ImageEntity } from './entities';

export interface ImageTable {
  allAsync(): Promise<ImageEntity[]>;
  byIdAsync(id: number): Promise<ImageEntity | undefined>;

  insertAsync(entity: Omit<ImageEntity, 'id'>): Promise<number | undefined>;
  updateAsync(entity: ImageEntity): Promise<ImageEntity | undefined>;
  deleteAsync(id: number): Promise<boolean>;
}
