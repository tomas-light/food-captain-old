import { MenuActions } from '@app/menu/redux';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '@State';

import { MenuTable, MenuTableProps } from './MenuTable';

type StateProps = Omit<MenuTableProps, 'onSelectMenu'>;
type CallProps = Pick<MenuTableProps, 'onSelectMenu'>;

const mapStateToProps = (state: State): StateProps => ({
	menus: state.menu.menus,
	selectedMenus: state.menu.selectedMenus,
});

const mapDispatchToProps = (dispatch: Dispatch): CallProps => ({
	onSelectMenu: (selectedMenus) => dispatch(MenuActions.selectMenu({ selectedMenus })),
});

const MenuTableContainer = connect(mapStateToProps, mapDispatchToProps)(MenuTable);

export { MenuTableContainer };
