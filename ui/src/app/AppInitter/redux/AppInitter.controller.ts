import { createAction, DecoratedWatchedController, watch } from 'app-redux-utils';
import { UserController } from '~app/user/User.controller';
import { ControllerBase } from '~app/ControllerBase';
import { AppInitterStore } from './AppInitter.store';

@watch
class AppInitterController extends ControllerBase {
	private updateStore(partialStore: Partial<AppInitterStore>) {
		return this.dispatch(createAction(AppInitterStore.update, partialStore));
	}

	@watch
	initialize() {
		const action = UserController.loadCurrentUser();

		// action.actions = [DishController.loadDishes()];

		action.callbackAction = () => {
			return this.updateStore({
				initialized: true,
			});
		};

		this.dispatch(action);
	}
}

const appInitterController: DecoratedWatchedController<['initialize']> = AppInitterController as any;
export { appInitterController as AppInitterController };
