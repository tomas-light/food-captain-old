import { watcher } from 'app-redux-utils';

import { State } from '@State';
import { DishActions } from './Dish.actions';
import { DishController } from './Dish.controller';

export const dishWatcher = watcher<State, DishController>(DishController, [[DishActions.LOAD_DISHES, 'loadDishes']]);
