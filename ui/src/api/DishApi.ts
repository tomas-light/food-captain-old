import { ApiBase } from '@api/base';
import { Dish } from '@models';
import { ApiResponse, ApiResponseStatus } from '@utils/api';

export class DishApi extends ApiBase {
	static async getAllAsync(): Promise<ApiResponse<Dish[]>> {
		// return this.get<Dish[]>('/dish');

		const db = await this.openDb();
		const dishes = await db.getAll('dishes');
		return ApiResponse.create({
			data: dishes,
			statusCode: ApiResponseStatus.Ok,
		});
	}
}
