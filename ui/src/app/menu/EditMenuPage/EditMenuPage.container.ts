import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '@State';
import { Component, Without } from '@utils';
import { DishActions } from '@app/dish/redux';
import { UserActions } from '@app/user/redux';
import { MenuActions } from '../redux';
import { EditMenuPage, EditMenuPageProps } from './EditMenuPage';

type StateProps = Pick<EditMenuPageProps, 'openedMenu' | 'initialValues' | 'authorOptions' | 'dishOptions'>;
type CallProps = Pick<EditMenuPageProps, 'loadMenu' | 'loadDishes' | 'loadAuthors' | 'onSave'>;
type OwnProps = Without<EditMenuPageProps, StateProps & CallProps>;

const mapStateToProps = (state: State): StateProps => ({
	initialValues: state.menu.menuFormValues,
	openedMenu: state.menu.openedMenu,
	dishOptions: state.dish.dishOptions,
	authorOptions: state.user.userOptions,
});

const mapDispatchToProps = (dispatch: Dispatch): CallProps => ({
	loadMenu: (menuId) => dispatch(MenuActions.loadMenu({ menuId })),
	loadAuthors: () => dispatch(UserActions.loadUsers()),
	loadDishes: () => dispatch(DishActions.loadDishes()),
	onSave: (formValues) => dispatch(MenuActions.save({ formValues })),
});

const EditMenuPageContainer: Component<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(EditMenuPage);

export { EditMenuPageContainer };
