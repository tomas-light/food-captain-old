import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '~State';
import { Component, Without } from '~utils';
import { AppInitter, AppInitterProps } from './AppInitter';
import { AppInitterController } from './redux/AppInitter.controller';

type StateProps = Pick<AppInitterProps, 'initialized'>;
type CallProps = Pick<AppInitterProps, 'initialize'>;
type OwnProps = Without<AppInitterProps, StateProps & CallProps>;

const mapStateToProps = (state: State): StateProps => ({
	initialized: state.appInitter.initialized,
});

const mapDispatchToProps = (dispatch: Dispatch): CallProps => ({
	initialize: () => dispatch(AppInitterController.initialize()),
});

const AppInitterContainer: Component<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(AppInitter);

export { AppInitterContainer };
