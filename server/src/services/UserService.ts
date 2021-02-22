import { MakeOptional } from '@utils/types';
import { Database } from '../database';
import { User } from './models';

export class UserService {
  static __constructorParams: InstanceType<any>[] = [Database];

  constructor(private readonly db: Database) {
  }

  getAllAsync(): Promise<User[]> {
    return this.db.user.allAsync();
  }

  async addAsync(user: MakeOptional<User, 'id'>): Promise<User> {
    user.id = await this.db.user.insertAsync({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return user as User;
  }

  getUserByIdAsync(userId: number): Promise<User | undefined> {
    return this.db.user.byIdAsync(userId);
  }

  updateAsync(user: MakeOptional<User, 'name' | 'email' | 'password'>): Promise<User | undefined> {
    return this.db.user.updateAsync(user);
  }

  deleteAsync(user: User): Promise<number> {
    return this.db.user.deleteAsync(user.id);
  }
}
