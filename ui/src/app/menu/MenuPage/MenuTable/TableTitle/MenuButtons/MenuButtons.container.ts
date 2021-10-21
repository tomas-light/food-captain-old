import { MenuActions } from '@app/menu/redux';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '@State';

import { MenuButtons, MenuButtonsProps, MenuButtonsCallProps } from './MenuButtons';

const mapStateToProps = (state: State): MenuButtonsProps => ({
	amount: state.menu.selectedMenus.length,
	areDeleting: state.menu.menuAreDeleting,
});

const mapDispatchToProps = (dispatch: Dispatch): MenuButtonsCallProps => ({
	onAdd: () => dispatch(MenuActions.addMenu()),
	onEdit: () => dispatch(MenuActions.editMenu()),
	onRemove: () => dispatch(MenuActions.deleteMenus()),
});

const MenuButtonsContainer = connect(mapStateToProps, mapDispatchToProps)(MenuButtons);

export { MenuButtonsContainer };
