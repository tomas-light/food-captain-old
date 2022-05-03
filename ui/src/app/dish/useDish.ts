import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DishController } from './Dish.controller';

function useDish(dishId: string) {
	const dispatch = useDispatch();

	const dishes = useSelector((state) => state.dish.dishes);
	const dish = dishes.find((_dish) => _dish.id === dishId);

	useEffect(() => {
		if (!dish || !dish.recipe) {
			dispatch(DishController.loadDish(dishId));
		}
	}, [dishId]);

	return dish;
}

export { useDish };
