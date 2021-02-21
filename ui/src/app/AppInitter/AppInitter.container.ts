import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@State';
import { AppInitterActions } from './redux';
import {
  AppInitter,
  AppInitterCallProps,
  AppInitterProps,
} from './AppInitter';

const mapStateToProps = (state: State): AppInitterProps => ({
  initialized: state.appInitter.initialized,
});

const mapDispatchToProps = (dispatch: Dispatch): AppInitterCallProps => ({
  initialize: () => dispatch(AppInitterActions.initialize()),
});

const AppInitterContainer: ComponentType = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppInitter);

export { AppInitterContainer };
