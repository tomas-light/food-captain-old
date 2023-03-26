import { useStyletron } from 'baseui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { H1, H2, Label1 } from 'baseui/typography';
import { IngredientController } from '~app/ingredient/Ingredient.controller';
import { appUrls, RouterController } from '~app/routing';
import { Dish, IngredientInRecipe } from '~models';
import { Button } from '~shared/molecules';
import { Field } from '~shared/organisms';
import { DishController } from './Dish.controller';

const AddDishPage = () => {
	const { t } = useTranslation();
	const [css] = useStyletron();

	const dispatch = useDispatch();
	const redirect = (url: string) => dispatch(RouterController.redirectTo({ url }));

	const ingredients = useSelector(state => state.ingredient.ingredients);
	const dimensions = useSelector(state => state.ingredient.dimensions);

	useEffect(() => {
		dispatch(IngredientController.loadIngredients());
		dispatch(IngredientController.loadDimensions());
	}, []);

	const [dish, setDish] = useState<Dish>({
		id: null,
		name: '',
		description: '',
		image: '',
		recipe: {
			id: '',
			name: '',
			image: '',
			description: '',
			images: [],
			ingredients: [],
			dish: null,
		},
	});

	const save = () => {
		dish.recipe.dish = dish;
		dispatch(DishController.addDish({
			dish,
			callback: () => redirect(appUrls.dish),
		}));
	};

	return (
		<>
			<Button onClick={() => redirect(appUrls.dish)}>Back</Button>

			<H1>{t('dish.add')}</H1>

			<div
				className={css({
					display: 'flex',
					flexDirection: 'column',
					rowGap: '16px',
				})}
			>
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
			</div>

			<H2>{t('dish.recipe')}</H2>

			<div
				className={css({
					display: 'flex',
					flexDirection: 'column',
					rowGap: '16px',
				})}
			>
				<Field
					label={t('recipe.name')}
					value={dish.recipe.name}
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
					value={dish.recipe.image}
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

				<Label1>{t('recipe.ingredients')}</Label1>
				<ul
					className={css({
						padding: '0 24px',
						rowGap: '24px',
						display: 'flex',
						flexDirection: 'column',
					})}
				>
					{dish.recipe.ingredients.map((ingredient, index) => (
						<li
							key={index}
							className={css({})}
						>
							<Field<'select', IngredientInRecipe>
								variant={'select'}
								label={t('ingredient.one')}
								options={ingredients as IngredientInRecipe[]}
								value={ingredient}
								onChange={(value) =>
									setDish((_dish) => {
										const _ingredients = [..._dish.recipe.ingredients];
										_ingredients.splice(index, 1, { ...ingredient, ...value });

										return {
											..._dish,
											recipe: {
												..._dish.recipe,
												ingredients: _ingredients,
											},
										};
									})
								}
							/>

							<Field
								variant={'select'}
								label={t('dimension.one')}
								options={dimensions}
								value={ingredient.dimension}
								onChange={(value) =>
									setDish((_dish) => {
										const _ingredients = [..._dish.recipe.ingredients];
										_ingredients.splice(index, 1, { ...ingredient, dimension: value });

										return {
											..._dish,
											recipe: {
												..._dish.recipe,
												ingredients: _ingredients,
											},
										};
									})
								}
							/>

							<Field
								variant={'number'}
								label={t('dimension.size')}
								value={ingredient.size}
								onChange={(value) =>
									setDish((_dish) => {
										const _ingredients = [..._dish.recipe.ingredients];
										_ingredients.splice(index, 1, { ...ingredient, size: value });

										return {
											..._dish,
											recipe: {
												..._dish.recipe,
												ingredients: _ingredients,
											},
										};
									})
								}
							/>
						</li>
					))}

					<Button
						onClick={() => {
							setDish(_dish => ({
								..._dish,
								recipe: {
									..._dish.recipe,
									ingredients: _dish.recipe.ingredients.concat(ingredients[0] as any),
								},
							}));
						}}
					>
						{t('ingredient.add')}
					</Button>
				</ul>

				<Field
					variant={'text-area'}
					label={t('recipe.description')}
					value={dish.recipe.description}
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
			</div>

			<Button onClick={save}>{t('save')}</Button>
		</>
	);
};

export { AddDishPage };
