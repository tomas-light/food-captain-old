import { useStyletron } from 'baseui';
import { Card, StyledAction } from 'baseui/card';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { appUrls, RouterController } from '~app/routing';
import { Button } from '~shared/molecules';
import { IngredientController } from './Ingredient.controller';

const IngredientPage = () => {
	const { t } = useTranslation();
	const [css] = useStyletron();
	const dispatch = useDispatch();
	const redirect = (url: string) => dispatch(RouterController.redirectTo({ url }));

	const ingredients = useSelector((state) => state.ingredient.ingredients);

	useEffect(() => {
		dispatch(IngredientController.loadIngredients());
	}, []);

	return (
		<div>
			<h1>{t('ingredient.many')}</h1>

			<Button onClick={() => redirect(appUrls.addIngredient)}>{t('ingredient.add')}</Button>

			<div
				className={css({
					display: 'flex',
					flexWrap: 'wrap',
					columnGap: '32px',
					rowGap: '32px',
				})}
			>
				{ingredients.map((ingredient) => (
					<div key={ingredient.id}>
						<Card
							overrides={{ Root: { style: { width: '328px' } } }}
							headerImage={ingredient.image}
							title={ingredient.name}
						>
							<StyledAction>
								<Button onClick={() => redirect(appUrls.getEditIngredientPath(ingredient.id))}>
									{t('ingredient.edit')}
								</Button>
							</StyledAction>
						</Card>
					</div>
				))}
			</div>
		</div>
	);
};

export { IngredientPage };
