import { MenuActions } from '@app/menu/redux';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '@State';

import {
    MenuTable,
    MenuTableProps,
    MenuTableCallProps,
 } from './MenuTable';

const mapStateToProps = (state: State): MenuTableProps => ({
  menus: state.menu.menus,
  selectedMenus: state.menu.selectedMenus,
});

const mapDispatchToProps = (dispatch: Dispatch): MenuTableCallProps => ({
  onSelectMenu: selectedMenus => dispatch(MenuActions.selectMenu({ selectedMenus }))
});

const MenuTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuTable);

export { MenuTableContainer };
