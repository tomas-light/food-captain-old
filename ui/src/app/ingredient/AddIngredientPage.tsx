import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { appUrls, RouterController } from '~app/routing';
import { Ingredient } from '~models';
import { Button } from '~shared/molecules';
import { Field } from '~shared/organisms';
import { IngredientController } from './Ingredient.controller';

const AddIngredientPage = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const redirect = (url: string) => dispatch(RouterController.redirectTo({ url }));

	const [ingredient, setIngredient] = useState<Ingredient>({
		id: null,
		name: '',
		image: '',
	});

	const save = () => {
		dispatch(IngredientController.addIngredient(ingredient));
		redirect(appUrls.ingredient);
	};

	return (
		<div>
			<Button onClick={() => redirect(appUrls.dish)}>{t('back')}</Button>

			<h1>{t('ingredient.add')}</h1>

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

export { AddIngredientPage };
