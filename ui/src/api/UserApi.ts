import { ApiBase } from '~api/base';
import { User } from '~models';
import { ApiResponse, ApiResponseStatus } from '~utils/api';

export class UserApi extends ApiBase {
	static async getAllAsync(): Promise<ApiResponse<User[]>> {
		const db = await this.openDb();
		const users = await db.getAll('users');
		return ApiResponse.create({
			data: users,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getCurrentAsync(): Promise<ApiResponse<User>> {
		const db = await this.openDb();
		const currentUser = await db.get('users', 'current_user');
		return ApiResponse.create({
			data: currentUser,
			statusCode: ApiResponseStatus.Ok,
		});
	}
}
