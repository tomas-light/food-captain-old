import { ImageApi } from '~api/ImageApi';
import { Ingredient, Recipe } from '~models';
import { guid } from '~utils';
import { ApiResponse, ApiResponseStatus } from '~utils/api';
import { ImageEntity, IngredientEntity } from '../../../entities';
import { ApiBase } from './ApiBase';

function mapEntityToModel(entity: IngredientEntity, image?: Ingredient['image']): Ingredient {
	return {
		id: entity.id,
		name: entity.name,
		image: image,
	};
}

function mapModelToEntity(model: Ingredient, imageId?: IngredientEntity['image_id']): IngredientEntity {
	return {
		id: model.id,
		name: model.name,
		image_id: imageId,
	};
}

export class IngredientApi extends ApiBase {
	static async getAllAsync(): Promise<ApiResponse<Ingredient[]>> {
		const db = await this.openDb();
		const ingredients = await db.getAll('ingredient');

		const images = await ImageApi.getImagesForEntitiesAsync(ingredients);

		return ApiResponse.create({
			data: ingredients.map((entity) =>
				mapEntityToModel(entity, images.data?.find((image) => image.id === entity.image_id)?.content)
			),
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getManyAsync(ids: Ingredient['id'][]): Promise<ApiResponse<Ingredient[]>> {
		if (!ids.length) {
			return ApiResponse.create({
				data: [],
				statusCode: ApiResponseStatus.Ok,
			});
		}

		const db = await this.openDb();
		const allIngredients = await db.getAll('ingredient');
		const ingredients = allIngredients.filter((image) => ids.includes(image.id));

		const images = await ImageApi.getImagesForEntitiesAsync(ingredients);

		return ApiResponse.create({
			data: ingredients.map((entity) =>
				mapEntityToModel(entity, images.data?.find((image) => image.id === entity.image_id)?.content)
			),
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getByIdAsync(ingredientId: Ingredient['id']): Promise<ApiResponse<Ingredient>> {
		if (!ingredientId) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		const db = await this.openDb();
		const ingredient = await db.get('ingredient', ingredientId);
		if (!ingredient) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		const image = await ImageApi.getByIdAsync(ingredient.image_id);

		return ApiResponse.create({
			data: mapEntityToModel(ingredient, image.data?.content),
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getByRecipeIdAsync(recipeId: Recipe['id']): Promise<ApiResponse<Ingredient[]>> {
		if (!recipeId) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		const db = await this.openDb();
		const allIngredientsInRecipe = await db.getAll('ingredientInRecipe');
		const recipeIngredientIds = allIngredientsInRecipe.filter(ir => ir.recipe_id === recipeId).map(ir => ir.ingredient_id);

		const ingredients = await this.getManyAsync(recipeIngredientIds);
		return ingredients;
	}

	static async addAsync(ingredient: Omit<Ingredient, 'id'>): Promise<ApiResponse<Ingredient>> {
		const db = await this.openDb();

		let image: ImageEntity;

		if (ingredient.image) {
			const response = await ImageApi.addAsync({
				content: ingredient.image,
			});
			image = response.data;
		}

		const entity = mapModelToEntity(
			{
				...ingredient,
				id: guid(),
			},
			image?.id
		);

		const id = await db.insert('ingredient', entity.id, entity);
		ingredient = mapEntityToModel(
			{
				...entity,
				id,
			},
			image?.content
		);

		return ApiResponse.create({
			data: ingredient as Ingredient,
			statusCode: ApiResponseStatus.Created,
		});
	}

	static async updateAsync(ingredient: Ingredient): Promise<ApiResponse<Ingredient>> {
		const db = await this.openDb();

		const exitedIngredient = await db.get('ingredient', ingredient.id);
		if (!exitedIngredient) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		let image: ImageEntity;
		if (ingredient.image) {
			const imageResponse = await ImageApi.getByIdAsync(exitedIngredient.image_id);
			if (imageResponse && imageResponse.data?.content !== ingredient.image) {
				await ImageApi.deleteAsync(imageResponse.data!.id);
			}

			const addedImageResponse = await ImageApi.addAsync({ content: ingredient.image });
			image = addedImageResponse.data;
		}

		const entity = mapModelToEntity(ingredient, image?.id);
		await db.update('ingredient', entity.id, entity);

		return ApiResponse.create({
			data: mapEntityToModel(entity, image?.content),
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async deleteAsync(ingredientId: Ingredient['id']): Promise<ApiResponse<void>> {
		const db = await this.openDb();

		const ingredient = await db.get('ingredient', ingredientId);
		if (!ingredient) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		const result = await db.delete('ingredient', ingredientId);
		if (!result) {
			return ApiResponse.create<void>({
				statusCode: ApiResponseStatus.InternalServerError,
				error: 'ingredient deleting failed',
			});
		}

		return ApiResponse.create<void>({
			statusCode: ApiResponseStatus.NoContent,
		});
	}
}
