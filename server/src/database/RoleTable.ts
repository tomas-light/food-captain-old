import { RoleEntity } from './entities';

export interface RoleTable {
  allAsync(): Promise<RoleEntity[]>;
  byIdAsync(id: number): Promise<RoleEntity | null | undefined>;

  insertAsync(entity: Omit<RoleEntity, 'id'>): Promise<number | null | undefined>;
  updateAsync(entity: RoleEntity): Promise<RoleEntity | null | undefined>;
  deleteAsync(id: number): Promise<boolean>;
}
