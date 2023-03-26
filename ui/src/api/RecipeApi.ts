import { makeId } from '~api/db/IndexedDb';
import { DimensionApi } from '~api/DimensionApi';
import { DishApi } from '~api/DishApi';
import { ImageApi } from '~api/ImageApi';
import { IngredientApi } from '~api/IngredientApi';
import { Dimension, Dish, Ingredient, Recipe } from '~models';
import { guid } from '~utils';
import { ApiResponse, ApiResponseStatus } from '~utils/api';
import { ImageEntity, RecipeEntity, IngredientInRecipeEntity } from '../../../entities';
import { ApiBase } from './ApiBase';

function mapEntityToModel(
	entity: RecipeEntity,
	dish?: Recipe['dish'],
	image?: Recipe['image'],
	images?: Recipe['images'],
	ingredients?: Recipe['ingredients']
): Recipe {
	return {
		id: entity.id,
		name: entity.name,
		description: entity.description,
		dish: dish,
		image: image,
		images: images ?? [],
		ingredients: ingredients ?? [],
	};
}

function mapModelToEntity(
	model: Recipe,
	dishId?: RecipeEntity['dish_id'],
	imageId?: RecipeEntity['image_id']
): RecipeEntity {
	return {
		id: model.id,
		name: model.name,
		description: model.description,
		dish_id: dishId,
		image_id: imageId,
	};
}

export class RecipeApi extends ApiBase {
	static async getAllAsync(): Promise<ApiResponse<Recipe[]>> {
		const db = await this.openDb();
		const recipes = await db.getAll('recipe');

		const entities = recipes.map((recipe) => recipe.dish_id);
		const dishes = await DishApi.getManyAsync(entities);
		const images = await ImageApi.getImagesForEntitiesAsync(recipes);

		// const ingredientInRecipes = await db.getAll('ingredientInRecipe');
		//
		// const map = new Map<Recipe['id'], Recipe['ingredients']>();
		// const promises: Promise<any>[] = [];
		// recipes.forEach((entity) =>
		// 	promises.push(
		// 		this.getRecipeIngredients(entity.id, ingredientInRecipes)
		// 			.then(ingredients => {
		// 				map.set(entity.id, ingredients);
		// 			})
		// 	)
		// );
		//
		// await Promise.all(promises);

		const model = recipes.map((entity) =>
			mapEntityToModel(
				entity,
				dishes.data?.find((dish) => dish.id === entity.dish_id),
				images.data?.find((image) => image.id === entity.image_id)?.content,
				// undefined,
				// map.get(entity.id)
			)
		);

		return ApiResponse.create({
			data: model,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getByDishIdAsync(dishId: Dish['id']): Promise<ApiResponse<Recipe>> {
		if (!dishId) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		const recipes = await this.getAllAsync();
		const recipe = recipes.data?.find(_recipe => _recipe.dish?.id === dishId);
		if (!recipe) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		return await this.getByIdAsync(recipe.id);
	}

	static async getByIdAsync(recipeId: Recipe['id']): Promise<ApiResponse<Recipe>> {
		if (!recipeId) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		const db = await this.openDb();
		const recipe = await db.get('recipe', recipeId);
		if (!recipe) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		const image = await ImageApi.getByIdAsync(recipe.image_id);
		const allRecipeImages = await db.getAll('recipeImage');
		const recipeImages = allRecipeImages.filter((ri) => ri.recipe_id === recipeId).map((ri) => ri.image_id);
		const images = await ImageApi.getManyAsync(recipeImages);

		const ingredientInRecipes = await db.getAll('ingredientInRecipe');

		const model = mapEntityToModel(
			recipe,
			undefined,
			image.data?.content,
			images.data?.map((image) => image.content),
			await this.getRecipeIngredients(recipeId, ingredientInRecipes)
		);

		return ApiResponse.create({
			data: model,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	private static async getRecipeIngredients(
		recipeId: Recipe['id'],
		ingredientInRecipes: IngredientInRecipeEntity[]
	): Promise<Recipe['ingredients']> {
		const recipeIngredients = ingredientInRecipes.filter((iir) => iir.recipe_id === recipeId);
		const ingredientIds = recipeIngredients.map((iir) => iir.ingredient_id);

		const ingredients = await IngredientApi.getManyAsync(ingredientIds);
		const dimensions = await DimensionApi.getAllAsync();

		return ingredients.data.map((ingredient) => {
			const inRecipe = recipeIngredients.find((_ingredient) => _ingredient.ingredient_id === ingredient.id);
			const dimension = dimensions.data.find((_dimension) => _dimension.id === inRecipe.dimension_id);
			return {
				id: ingredient.id,
				name: ingredient.name,
				image: ingredient.image,
				size: inRecipe.size,
				dimension: dimension,
			};
		});
	}

	static async addAsync(recipe: Omit<Recipe, 'id'>, dish?: Dish): Promise<ApiResponse<Recipe>> {
		const db = await this.openDb();

		let image: ImageEntity;

		if (recipe.image) {
			const response = await ImageApi.addAsync({
				content: recipe.image,
			});
			image = response.data;
		}

		const entity = mapModelToEntity(
			{
				...recipe,
				id: guid(),
			},
			dish?.id,
			image?.id
		);

		const id = await db.insert('recipe', entity.id, entity);

		recipe.ingredients.forEach((ingredient) => {
			db.insert('ingredientInRecipe', makeId.ingredientInRecipe(ingredient.id, entity.id), {
				recipe_id: id,
				ingredient_id: ingredient.id,
				dimension_id: ingredient.dimension.id,
				size: ingredient.size,
			});
		});

		recipe = mapEntityToModel(
			{
				...entity,
				id,
			},
			dish,
			image?.content
		);

		return ApiResponse.create({
			data: recipe as Recipe,
			statusCode: ApiResponseStatus.Created,
		});
	}

	static async updateAsync(recipe: Recipe): Promise<ApiResponse<Recipe>> {
		const db = await this.openDb();

		const exitedRecipe = await db.get('recipe', recipe.id);
		if (!exitedRecipe) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		let image: ImageEntity;
		if (recipe.image) {
			const imageResponse = await ImageApi.getByIdAsync(exitedRecipe.image_id);
			if (imageResponse && imageResponse.data?.content !== recipe.image) {
				await ImageApi.deleteAsync(imageResponse.data!.id);
			}

			const addedImageResponse = await ImageApi.addAsync({ content: recipe.image });
			image = addedImageResponse.data;
		}

		const entity = mapModelToEntity(recipe, recipe.dish?.id, image?.id);
		await db.update('recipe', entity.id, entity);

		return ApiResponse.create({
			data: mapEntityToModel(entity, recipe.dish, image?.content),
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async deleteAsync(recipeId: Recipe['id']): Promise<ApiResponse<void>> {
		const db = await this.openDb();

		const recipe = await db.get('recipe', recipeId);
		if (!recipe) {
			return ApiResponse.create<void>({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		const result = await db.delete('recipe', recipeId);
		if (!result) {
			return ApiResponse.create<void>({
				statusCode: ApiResponseStatus.InternalServerError,
				error: 'recipe deleting failed',
			});
		}

		return ApiResponse.create<void>({
			statusCode: ApiResponseStatus.NoContent,
		});
	}
}
