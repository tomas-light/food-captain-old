import { useState } from 'react';
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
	const dispatch = useDispatch();
	const redirect = (url: string) => dispatch(RouterController.redirectTo({ url }));

	const storedDish = useSelector((state) =>
		state.ingredient.ingredients.find((_ingredient) => _ingredient.id === ingredientId)
	);

	const [ingredient, setIngredient] = useState<Ingredient>(storedDish);

	const save = () => {
		dispatch(IngredientController.updateIngredient(ingredient));
		redirect(appUrls.ingredient);
	};

	if (!ingredient) {
		return <p>Ingredient not found (id: {ingredientId})</p>;
	}

	return (
		<div>
			<Button onClick={() => redirect(appUrls.dish)}>{t('back')}</Button>

			<h1>{t('ingredient.edit')}</h1>

			<Field
				label={t('ingredient.name')}
				value={ingredient.name}
				onChange={(value) => setIngredient((_dish) => ({ ..._dish, name: value }))}
			/>
			<Field
				label={t('ingredient.image')}
				value={ingredient.image}
				onChange={(value) => setIngredient((_dish) => ({ ..._dish, image: value }))}
			/>

			<Button onClick={save}>{t('save')}</Button>
		</div>
	);
};

export { EditIngredientPage };
