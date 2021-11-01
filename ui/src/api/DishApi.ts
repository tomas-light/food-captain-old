import { ApiBase } from '~api/base';
import { Dish } from '~models';
import { guid } from '~utils';
import { ApiResponse, ApiResponseStatus } from '~utils/api';

export class DishApi extends ApiBase {
	static async getAllAsync(): Promise<ApiResponse<Dish[]>> {
		const db = await this.openDb();
		const dishes = await db.getAll('dishes');
		return ApiResponse.create({
			data: dishes,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getAsync(dishId: string): Promise<ApiResponse<Dish>> {
		const db = await this.openDb();
		const dish = await db.get('dishes', dishId);
		return ApiResponse.create({
			data: dish,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async addAsync(dish: Omit<Dish, 'id'>): Promise<ApiResponse<Dish>> {
		const db = await this.openDb();
		const createdDish: Dish = {
			...dish,
			id: guid(),
		};

		const dishId = await db.insert('dishes', createdDish.id, createdDish);
		if (dishId != createdDish.id) {
			createdDish.id = dishId;
		}

		return ApiResponse.create({
			data: createdDish,
			statusCode: ApiResponseStatus.Created,
		});
	}

	static async updateAsync(dish: Dish): Promise<ApiResponse<Dish>> {
		const db = await this.openDb();
		const dishId = await db.update('dishes', dish.id, dish);

		if (dishId != dish.id) {
			dish.id = dishId;
		}

		return ApiResponse.create({
			data: dish,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async deleteAsync(dishId: Dish['id']): Promise<ApiResponse<void>> {
		const db = await this.openDb();
		const result = await db.delete('dishes', dishId);
		if (!result) {
			return ApiResponse.create<void>({
				statusCode: ApiResponseStatus.InternalServerError,
				error: 'dish deleting failed',
			});
		}

		return ApiResponse.create<void>({
			statusCode: ApiResponseStatus.NoContent,
		});
	}
}
