import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@State';
import { AppInitterActions } from './redux/AppInitter.actions';
import {
  AppInitter,
  AppInitterCallProps,
  AppInitterProps,
} from './AppInitter';

const mapStateToProps = (state: State): AppInitterProps => {
  return {
    initialized: state.appInitter.initialized,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): AppInitterCallProps => {
  return {
    initialize: () => dispatch(AppInitterActions.initialize()),
  };
};

const AppInitterContainer: ComponentType = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppInitter);

export { AppInitterContainer };
