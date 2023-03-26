import { User } from '~models';
import { ApiResponse, ApiResponseStatus } from '~utils/api';
import { ApiBase } from './ApiBase';

export class UserApi extends ApiBase {
	static async getAllAsync(): Promise<ApiResponse<User[]>> {
		const db = await this.openDb();
		const users = await db.getAll('user');
		return ApiResponse.create({
			data: users,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getCurrentAsync(): Promise<ApiResponse<User>> {
		const db = await this.openDb();
		const currentUser = await db.get('user', 'current_user');
		return ApiResponse.create({
			data: currentUser,
			statusCode: ApiResponseStatus.Ok,
		});
	}
}
