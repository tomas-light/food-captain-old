import { User } from '@models';
import { SelectFieldOption } from '@select';

export class UserStore {
  users: User[];
  userOptions: SelectFieldOption<number>[];
  usersAreLoading: boolean;

  constructor() {
    this.users = [];
    this.userOptions = [];
    this.usersAreLoading = false;
  }
}
