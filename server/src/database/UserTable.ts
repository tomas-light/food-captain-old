import { MakeOptional } from '@utils/types';
import { UserEntity } from './entities';

export interface UserWithRoleEntity extends UserEntity {
  role_id?: number;
}

export interface UserTable {
  allAsync(): Promise<UserEntity[]>;
  byIdsAsync(ids: number[]): Promise<UserEntity[]>;
  byIdAsync(id: number): Promise<UserEntity | null | undefined>;

  allWithRoleAsync(): Promise<UserWithRoleEntity[]>;
  byIdWithRoleAsync(id: number): Promise<UserWithRoleEntity | null | undefined>;

  insertAsync(entity: Omit<UserEntity, 'id'>): Promise<number | null | undefined>;
  updateAsync(entity: MakeOptional<UserEntity, 'name' | 'email' | 'password'>): Promise<UserWithRoleEntity | null | undefined>;
  deleteAsync(id: number): Promise<boolean>;
}
