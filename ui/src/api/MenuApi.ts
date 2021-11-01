import { ApiBase } from '~api/base';
import { Menu } from '~models';
import { guid } from '~utils';
import { ApiResponse, ApiResponseStatus } from '~utils/api';

export class MenuApi extends ApiBase {
	static async getAllAsync(): Promise<ApiResponse<Menu[]>> {
		const db = await this.openDb();
		const menus = await db.getAll('menus');
		return ApiResponse.create({
			data: menus,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getByIdAsync(menuId: Menu['id']): Promise<ApiResponse<Menu>> {
		const db = await this.openDb();
		const menu = await db.get('menus', menuId);
		if (!menu) {
			return ApiResponse.create({
				data: null,
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		return ApiResponse.create({
			data: menu,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async addAsync(menu: Omit<Menu, 'id' | 'createDate' | 'lastUpdate'>): Promise<ApiResponse<Menu>> {
		const db = await this.openDb();
		const createdDate = new Date();
		const createdMenu: Menu = {
			...menu,
			id: guid(),
			createDate: createdDate,
			lastUpdate: createdDate,
		};

		const menuId = await db.insert('menus', createdMenu.id, createdMenu);
		if (menuId != createdMenu.id) {
			createdMenu.id = menuId;
		}

		return ApiResponse.create({
			data: createdMenu,
			statusCode: ApiResponseStatus.Created,
		});
	}

	static async updateAsync(menu: Menu): Promise<ApiResponse<Menu>> {
		const db = await this.openDb();
		const menuId = await db.update('menus', menu.id, menu);

		if (menuId != menu.id) {
			menu.id = menuId;
		}

		return ApiResponse.create({
			data: menu,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async deleteAsync(menuId: Menu['id']): Promise<ApiResponse<void>> {
		const db = await this.openDb();
		const result = await db.delete('menus', menuId);
		if (!result) {
			return ApiResponse.create<void>({
				statusCode: ApiResponseStatus.InternalServerError,
				error: 'menu deleting failed',
			});
		}

		return ApiResponse.create<void>({
			statusCode: ApiResponseStatus.NoContent,
		});
	}
}
