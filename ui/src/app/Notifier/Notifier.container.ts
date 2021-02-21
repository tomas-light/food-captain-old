import { connect } from 'react-redux';

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

const mapDispatchToProps: NotificationCallProps = {
  removeSnackbar: NotifierActions.removeSnackbar,
};

const NotifierContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifier);

export { NotifierContainer };
