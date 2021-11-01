import { ApiBase } from '~api/base';
import { Ingredient } from '~models';
import { guid } from '~utils';
import { ApiResponse, ApiResponseStatus } from '~utils/api';

export class IngredientApi extends ApiBase {
	static async getAllAsync(): Promise<ApiResponse<Ingredient[]>> {
		const db = await this.openDb();
		const ingredients = await db.getAll('ingredients');
		return ApiResponse.create({
			data: ingredients,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getByIdAsync(ingredientId: Ingredient['id']): Promise<ApiResponse<Ingredient>> {
		const db = await this.openDb();
		const ingredient = await db.get('ingredients', ingredientId);
		if (!ingredient) {
			return ApiResponse.create({
				data: null,
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		return ApiResponse.create({
			data: ingredient,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async addAsync(ingredient: Ingredient): Promise<ApiResponse<Ingredient>> {
		const db = await this.openDb();
		const createdIngredient: Ingredient = {
			...ingredient,
			id: guid(),
		};

		const menuId = await db.insert('ingredients', createdIngredient.id, createdIngredient);
		if (menuId != createdIngredient.id) {
			createdIngredient.id = menuId;
		}

		return ApiResponse.create({
			data: createdIngredient,
			statusCode: ApiResponseStatus.Created,
		});
	}

	static async updateAsync(ingredient: Ingredient): Promise<ApiResponse<Ingredient>> {
		const db = await this.openDb();
		const ingredientId = await db.update('ingredients', ingredient.id, ingredient);

		if (ingredientId != ingredient.id) {
			ingredient.id = ingredientId;
		}

		return ApiResponse.create({
			data: ingredient,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async deleteAsync(ingredientId: Ingredient['id']): Promise<ApiResponse<void>> {
		const db = await this.openDb();
		const result = await db.delete('ingredients', ingredientId);
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
