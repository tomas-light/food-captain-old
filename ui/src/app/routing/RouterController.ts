import { State } from '@State';
import { ControllerBase } from '@utils/controller';
import { Action, createAction, watcher } from 'app-redux-utils';

class RouterActions {
  static REDIRECT = 'ROUTER_REDIRECT';
  static redirect = (appUrl: string) => createAction(RouterActions.REDIRECT, { appUrl });
}

class RouterController extends ControllerBase {
  redirectTo(action: Action<{ appUrl: string }>) {
    super.redirect(action.payload.appUrl);
  }
}

const routerWatcher = watcher<State, RouterController>(
  RouterController,
  [
    [RouterActions.REDIRECT, 'redirectTo'],
  ],
);

export { RouterActions, routerWatcher };
