import { UserApi } from '@api';
import { SelectFieldOption } from '@select';
import { ControllerBase } from '@utils/controller';

import { UserActions } from './User.actions';
import { UserStore } from './User.store';

export class UserController extends ControllerBase {
  private updateStore(partialStore: Partial<UserStore>) {
    this.dispatch(UserActions.updateStore(partialStore));
  }

  async loadUsers() {
    this.updateStore({
      usersAreLoading: true,
    });

    const response = await UserApi.getAllAsync();
    if (response.hasError()) {
      this.updateStore({
        users: [],
        userOptions: [],
        usersAreLoading: false,
      });

      return;
    }

    this.updateStore({
      users: response.data,
      userOptions: response.data.map(user => new SelectFieldOption<number>({
        id: user.id,
        title: user.name,
      })),
      usersAreLoading: false,
    });
  }
}
