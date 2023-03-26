import { useStyletron } from 'baseui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { appUrls, RouterController } from '~app/routing';
import { Dish } from '~models';
import { Button } from '~shared/molecules';
import { Field } from '~shared/organisms';
import { DishController } from './Dish.controller';
import { useDish } from './useDish';

const EditDishPage = () => {
	const { dishId } = useParams();

	const { t } = useTranslation();
	const [css] = useStyletron();
	const dispatch = useDispatch();
	const redirect = (url: string) => dispatch(RouterController.redirectTo({ url }));

	const storedDish = useDish(dishId);
	const [dish, setDish] = useState<Dish>(storedDish);

	useEffect(() => {
		if (dish !== storedDish) {
			setDish(storedDish);
		}
	}, [storedDish]);

	const save = () => {
		dispatch(DishController.updateDish({
			dish,
			callback: () => redirect(appUrls.dish)
		}));
	};

	const remove = () => {
		dispatch(DishController.removeDish({
			dishId: dish.id,
			callback: () => redirect(appUrls.dish)
		}));
	};

	if (!dish) {
		return <p>Dish not found (id: {dishId})</p>;
	}

	return (
		<div className={css({
			display: 'flex',
			flexDirection: 'column',
			flexWrap: 'wrap',
			rowGap: '16px',
		})}>
			<Button onClick={() => redirect(appUrls.dish)}>Back</Button>

			<h1>{t('dish.edit')}</h1>

			<Field
				label={t('dish.name')}
				value={dish.name}
				onChange={(value) => setDish((_dish) => ({ ..._dish, name: value }))}
			/>
			<Field
				label={t('dish.image')}
				value={dish.image}
				onChange={(value) => setDish((_dish) => ({ ..._dish, image: value }))}
			/>
			<Field
				label={t('dish.description')}
				value={dish.description}
				onChange={(value) => setDish((_dish) => ({ ..._dish, description: value }))}
			/>

			<h2>{t('dish.recipe')}</h2>

			<Field
				label={t('recipe.name')}
				value={dish.recipe?.name}
				onChange={(value) =>
					setDish((_dish) => ({
						..._dish,
						recipe: {
							..._dish.recipe,
							name: value,
						},
					}))
				}
			/>

			<Field
				label={t('recipe.image')}
				value={dish.recipe?.image}
				onChange={(value) =>
					setDish((_dish) => ({
						..._dish,
						recipe: {
							..._dish.recipe,
							image: value,
						},
					}))
				}
			/>

			<Field
				variant={'text-area'}
				label={t('recipe.description')}
				value={dish.recipe?.description}
				onChange={(value) =>
					setDish((_dish) => ({
						..._dish,
						recipe: {
							..._dish.recipe,
							description: value,
						},
					}))
				}
			/>

			<Button onClick={save}>{t('save')}</Button>
			<Button onClick={remove}>{t('delete')}</Button>
		</div>
	);
};

export { EditDishPage };
