import { createAction, DecoratedWatchedController, watch } from 'app-redux-utils';
import { UserApi } from '~api';
import { ControllerBase } from '~app/ControllerBase';
import { UserStore } from './User.store';

@watch
class UserController extends ControllerBase {
	private updateStore(partialStore: Partial<UserStore>) {
		this.dispatch(createAction(UserStore.update, partialStore));
	}

	@watch
	async loadUsers() {
		const response = await UserApi.getAllAsync();
		if (response.hasError()) {
			return;
		}

		this.updateStore({
			users: response.data,
		});
	}

	@watch
	async loadCurrentUser() {
		const response = await UserApi.getCurrentAsync();
		if (response.hasError()) {
			return;
		}

		this.updateStore({
			currentUser: response.data,
		});
	}
}

const userController: DecoratedWatchedController<['loadUsers', 'loadCurrentUser']> = UserController as any;

export { userController as UserController };
