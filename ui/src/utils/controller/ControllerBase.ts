import { Action, ControllerBase as UtilsControllerBase } from 'app-redux-utils';
import { OptionsObject } from 'notistack';
import { Store } from 'redux';
import { push } from 'connected-react-router';

import { Notification, NotifierActions } from '@Notifier';
import { State } from '@State';

export abstract class ControllerBase extends UtilsControllerBase<State> {
  constructor(reduxStore: Store<State, Action>) {
    super(reduxStore);
    if (new.target === ControllerBase) {
      throw new Error('Cannot construct ControllerBase instance directly');
    }
  }

  protected notify(message: string, options?: OptionsObject) {
    const notification = new Notification(message, options);
    this.dispatch(NotifierActions.enqueueSnackbar(notification));
  }

  protected redirect(appUrl: string) {
    const routeAction = push(appUrl) as any;
    this.dispatch(routeAction);
  }
}
