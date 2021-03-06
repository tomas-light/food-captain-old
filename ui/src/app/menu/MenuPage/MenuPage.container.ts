import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@State';
import { MenuActions } from '@app/menu/redux';
import {
    MenuPage,
    MenuPageProps,
    MenuPageCallProps,
 } from './MenuPage';

const mapStateToProps = (state: State): MenuPageProps => ({
  menus: state.menu.menus,
});

const mapDispatchToProps = (dispatch: Dispatch): MenuPageCallProps => ({
  loadMenu: () => dispatch(MenuActions.getMenus()),
});

const MenuPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuPage);

export { MenuPageContainer };
