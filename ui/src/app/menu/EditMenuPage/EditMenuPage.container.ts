import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '@State';
import { DishActions } from '@app/dish/redux';
import { UserActions } from '@app/user/redux';
import { MenuActions } from '../redux';
import {
    EditMenuPage,
    EditMenuPageProps,
    EditMenuPageCallProps,
 } from './EditMenuPage';

const mapStateToProps = (state: State): EditMenuPageProps => ({
  dishOptions: state.dish.dishOptions,
  authorOptions: state.user.userOptions,
  initialValues: state.menu.menuFormValues,
});

const mapDispatchToProps = (dispatch: Dispatch): EditMenuPageCallProps => ({
  loadMenu: menuId => dispatch(MenuActions.loadMenu({ menuId })),
  loadAuthors: () => dispatch(UserActions.loadUsers()),
  loadDishes: () => dispatch(DishActions.loadDishes()),
  onSave: (formValues) => dispatch(MenuActions.save({ formValues })),
});

const EditMenuPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMenuPage);

export { EditMenuPageContainer };
