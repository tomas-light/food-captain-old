import { metadata } from '@utils/metadata';
import { MakeOptional } from '@utils/types';
import { Database } from '../database';
import { User } from './models';

@metadata
export class UserService {
  constructor(private readonly db: Database) {
  }

  getAllAsync(): Promise<User[]> {
    return this.db.user.allWithRoleAsync();
  }

  getUserByIdAsync(userId: number): Promise<User | null | undefined> {
    return this.db.user.byIdWithRoleAsync(userId);
  }

  async addAsync(user: MakeOptional<User, 'id'>): Promise<User> {
// @ts-ignore
    user.id = await this.db.user.insertAsync({
      name: user.name,
      email: user.email,
      password: user.password, // todo: add password encryption (in #6 Add authorization)
    });

    if (typeof user.id !== 'undefined' && typeof user.roleId !== 'undefined') {
// @ts-ignore
      await this.db.userRole.insertAsync({
        user_id: user.id,
        role_id: user.roleId,
      });
    }

    return user as User;
  }

  async updateAsync(user: MakeOptional<User, 'name' | 'email' | 'password'>): Promise<User | undefined> {
// @ts-ignore
    const userEntity = await this.db.user.updateAsync(user);
    if (!userEntity) {
      return undefined;
    }

    const updatedUser: User = {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
    };

    if (typeof user.roleId !== 'undefined') {
      const roleWasUpdated = await this.updateUserRoleAsync(user.id, user.roleId);
      if (roleWasUpdated) {
        updatedUser.roleId = user.roleId;
      }
    }

    return updatedUser;
  }

  async updateUserRoleAsync(userId: number, roleId: number): Promise<boolean> {
    const existingRoles = await this.db.userRole.getByUserIdAsync(userId);
    if (existingRoles.length) {
// @ts-ignore
      const roleWasDeleted = await this.db.userRole.deleteAsync({
        role_id: existingRoles[0].role_id,
        user_id: userId,
      });

      if (!roleWasDeleted) {
        return false;
      }
    }

// @ts-ignore
    return await this.db.userRole.insertAsync({
      role_id: roleId,
      user_id: userId,
    });
  }

  async deleteAsync(user: User): Promise<boolean> {
    const { roleId } = user;
    if (typeof roleId !== 'undefined') {
// @ts-ignore
      const roleIsDeleted = await this.db.userRole.deleteAsync({
        role_id: roleId,
        user_id: user.id,
      });

      if (!roleIsDeleted) {
        return false;
      }
    }

    return await this.db.user.deleteAsync(user.id);
  }
}
