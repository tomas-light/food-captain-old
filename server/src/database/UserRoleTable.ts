import { UserRoleEntity } from './entities';

export interface UserRoleTable {
  allAsync(): Promise<UserRoleEntity[]>;
  // todo: possible redundant
  getAsync(user_id: number, role_id: number): Promise<UserRoleEntity | undefined>;

  insertAsync(entity: UserRoleEntity): Promise<boolean>;
  deleteAsync(entity: UserRoleEntity): Promise<boolean>;
}
