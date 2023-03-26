import { useStyletron } from 'baseui';
import { Card, StyledAction, StyledBody } from 'baseui/card';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { DishController } from '~app/dish/Dish.controller';
import { appUrls, RouterController } from '~app/routing';
import { Button } from '~shared/molecules';

const DishPage = () => {
	const { t } = useTranslation();
	const [css] = useStyletron();
	const dispatch = useDispatch();
	const redirect = (url: string) => dispatch(RouterController.redirectTo({ url }));

	const dishes = useSelector((state) => {
		return state.dish.dishes;
	});

	useEffect(() => {
		dispatch(DishController.loadDishes());
	}, []);

	return (
		<div>
			<h1>{t('dish.many')}</h1>

			<Button onClick={() => redirect(appUrls.addDish)}>{t('dish.add')}</Button>

			<div
				className={css({
					display: 'flex',
					justifyContent: 'center',
				})}
			>
				{dishes.map((dish) => (
					<Card
						key={dish.id}
						overrides={{ Root: { style: { width: '328px' } } }}
						headerImage={dish.image}
						title={dish.name}
					>
						<StyledBody>{dish.description}</StyledBody>
						<StyledAction>
							<Button
								onClick={() => redirect(appUrls.getDishDetailsPath(dish.id))}
								//overrides={{BaseButton: {style: {width: '100%'}}}}
							>
								{t('dish.open')}
							</Button>
						</StyledAction>
					</Card>
				))}
			</div>
		</div>
	);
};

export { DishPage };
