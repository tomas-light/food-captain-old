import { createSelector } from 'reselect';
import { State } from '@State';
import { mapMenuDishesToOptions } from './menu';

const memoized = (state: State) => ({
	openedMenuDishAuthor: () => createSelector((state: State) => state.menu.openedMenu, mapMenuDishesToOptions),
	openedMenuDishOptions: () => createSelector((state: State) => state.menu.openedMenu, mapMenuDishesToOptions),
});

export { memoized };
