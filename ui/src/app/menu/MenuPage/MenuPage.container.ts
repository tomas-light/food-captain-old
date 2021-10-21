import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { MenuActions } from '@app/menu/redux';
import { MenuPage, Props } from './MenuPage';

const mapDispatchToProps = (dispatch: Dispatch): Props => ({
	loadMenu: () => dispatch(MenuActions.getMenus()),
});

const MenuPageContainer = connect(null, mapDispatchToProps)(MenuPage);

export { MenuPageContainer };
