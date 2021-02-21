import { AppInitterActions } from './AppInitter.actions';
import { AppInitterStore } from './AppInitter.store';
import { ControllerBase } from '@utils/controller';

export class AppInitterController extends ControllerBase {
  private updateStore(partialStore: Partial<AppInitterStore>) {
    return this.dispatch(AppInitterActions.updateStore(partialStore));
  }

  initialize() {
    this.updateStore({
      initialized: true,
    });
  }
}
