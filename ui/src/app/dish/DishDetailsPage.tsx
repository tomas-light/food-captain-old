import { useStyletron } from 'baseui';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { appUrls, RouterController } from '~app/routing';
import { Button } from '~shared/molecules';
import { useDish } from './useDish';

const DishDetailsPage = () => {
	const { dishId } = useParams();

	const { t } = useTranslation();
	const [css] = useStyletron();
	const dispatch = useDispatch();
	const redirect = (url: string) => dispatch(RouterController.redirectTo({ url }));

	const dish = useDish(dishId);

	if (!dish) {
		return <p>Dish not found (id: {dishId})</p>;
	}

	return (
		<div>
			<Button onClick={() => redirect(appUrls.dish)}>{t('back')}</Button>

			<h1>{dish.name}</h1>

			<img
				className={css({
					maxHeight: '400px',
					maxWidth: '600px',
				})}
				src={dish.image}
			/>

			<p>{dish.description}</p>

			<p>{dish.recipe}</p>

			<Button
				onClick={() => {
					redirect(appUrls.getEditDishPath(dishId));
				}}
			>
				{t('dish.edit')}
			</Button>
		</div>
	);
};

export { DishDetailsPage };
