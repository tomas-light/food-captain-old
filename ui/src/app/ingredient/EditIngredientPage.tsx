import { useStyletron } from 'baseui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { appUrls, RouterController } from '~app/routing';
import { Ingredient } from '~models';
import { Button } from '~shared/molecules';
import { Field } from '~shared/organisms';
import { IngredientController } from './Ingredient.controller';

const EditIngredientPage = () => {
	const { ingredientId } = useParams();

	const { t } = useTranslation();
	const [css] = useStyletron();
	const dispatch = useDispatch();
	const redirect = (url: string) => dispatch(RouterController.redirectTo({ url }));

	const ingredients = useSelector((state) => state.ingredient.ingredients);

	const storedIngredient = useSelector((state) =>
		state.ingredient.ingredients.find((_ingredient) => _ingredient.id === ingredientId)
	);

	useEffect(() => {
		if (!ingredients.length) {
			dispatch(IngredientController.loadIngredients());
		}
	}, []);

	useEffect(() => {
		setIngredient(storedIngredient);
	}, [storedIngredient]);

	const [ingredient, setIngredient] = useState<Ingredient>(storedIngredient);

	const save = () => {
		dispatch(IngredientController.updateIngredient({
			ingredient,
			callback: () => redirect(appUrls.ingredient) }));
	};

	const remove = () => {
		dispatch(IngredientController.removeIngredient({
			ingredientId: ingredient.id,
			callback: () => redirect(appUrls.ingredient)
		}));
	};

	if (!ingredient) {
		return <p>Ingredient not found (id: {ingredientId})</p>;
	}

	return (
		<div className={css({
			display: 'flex',
			flexDirection: 'column',
			flexWrap: 'wrap',
			rowGap: '16px',
		})}>
			<Button onClick={() => redirect(appUrls.ingredient)}>{t('back')}</Button>

			<h1>{t('ingredient.edit')}</h1>

			<Field
				label={t('ingredient.name')}
				value={ingredient.name}
				onChange={(value) => setIngredient((_ingredient) => ({ ..._ingredient, name: value }))}
			/>
			<Field
				label={t('ingredient.image')}
				value={ingredient.image}
				onChange={(value) => setIngredient((_ingredient) => ({ ..._ingredient, image: value }))}
			/>

			<Button onClick={save}>{t('save')}</Button>
			<Button onClick={remove}>{t('delete')}</Button>
		</div>
	);
};

export { EditIngredientPage };
