import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@State';
import { NotifierActions } from './redux';
import {
  NotificationCallProps,
  NotifierProps,
  Notifier,
} from './Notifier';

const mapStateToProps = (state: State): NotifierProps => ({
  notifications: state.notifier.notifications,
});

const mapDispatchToProps = (dispatch: Dispatch): NotificationCallProps => ({
  removeSnackbar: (key: string | number) =>
    dispatch(NotifierActions.removeSnackbar(key)),
});

const NotifierContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifier);

export { NotifierContainer };
