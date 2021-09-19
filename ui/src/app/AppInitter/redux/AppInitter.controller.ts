import { UserActions } from '@app/user/redux';
import { ControllerBase } from '@utils/controller';
import { AppInitterActions } from './AppInitter.actions';
import { AppInitterStore } from './AppInitter.store';

export class AppInitterController extends ControllerBase {
  private updateStore(partialStore: Partial<AppInitterStore>) {
    return this.dispatch(AppInitterActions.updateStore(partialStore));
  }

  initialize() {
    const action = UserActions.loadCurrentUser();
    action.callbackAction = () => {
      return this.updateStore({
        initialized: true,
      });
    };

    this.dispatch(action);
  }
}
