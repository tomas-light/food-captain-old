import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { MenuController } from '~app/menu/Menu.controller';
import { MenuPage, Props } from './MenuPage';

const mapDispatchToProps = (dispatch: Dispatch): Props => ({
	loadMenu: () => dispatch(MenuController.getMenus()),
});

const MenuPageContainer = connect(null, mapDispatchToProps)(MenuPage);

export { MenuPageContainer };
