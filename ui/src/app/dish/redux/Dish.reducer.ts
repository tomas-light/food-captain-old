import { Reducer } from 'app-redux-utils';
import { DishActions } from './Dish.actions';
import { DishStore } from './Dish.store';

export const DishReducer = Reducer(new DishStore(), DishActions.UPDATE_STORE);
