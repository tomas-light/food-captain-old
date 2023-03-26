import { useStyletron } from 'baseui';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { H1, H2 } from 'baseui/typography';
import { appUrls, RouterController } from '~app/routing';
import { Button } from '~shared/molecules';
import { RecipeDetails } from './RecipeDetails';
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

			<H1>{dish.name}</H1>

			<img
				className={css({
					maxHeight: '400px',
					maxWidth: '600px',
				})}
				src={dish.image}
			/>

			<p>{dish.description}</p>

			<H2>{t('dish.recipe')}</H2>
			<RecipeDetails recipe={dish.recipe} />

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
