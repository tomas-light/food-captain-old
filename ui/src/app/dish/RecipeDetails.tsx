import { useStyletron } from 'baseui';
import { useTranslation } from 'react-i18next';
import { Recipe } from '~models';

type Props = {
	recipe: Recipe;
};

const RecipeDetails = (props: Props) => {
	const { recipe } = props;

	const { t } = useTranslation();
	const [css] = useStyletron();

	if (!recipe) {
		return null;
	}

	return (
		<div>
			<label>{t('recipe.name')}</label>
			<p>{recipe.name}</p>

			<img
				className={css({
					maxHeight: '400px',
					maxWidth: '600px',
				})}
				src={recipe.image}
			/>

			<label>{t('recipe.ingredients')}</label>
			{recipe.ingredients.map((ingredient) => (
				<div key={ingredient.id}>
					<p>{ingredient.name}</p>
					<p>{ingredient.size} ${ingredient.dimension.name}</p>
					<img
						className={css({
							maxHeight: '200px',
							maxWidth: '300px',
						})}
						src={ingredient.image}
					/>
				</div>
			))}

			<label>{t('recipe.description')}</label>
			<p>{recipe.description}</p>

			<div
				className={css({
					display: 'flex',
					flexWrap: 'wrap',
					gap: '16px',
				})}
			>
				{recipe.images.map((image) => (
					<img
						className={css({
							maxHeight: '400px',
							maxWidth: '600px',
						})}
						src={image}
					/>
				))}
			</div>
		</div>
	);
};

export { RecipeDetails };
export type { Props as RecipeProps };
