import { ApiBase } from '@api/base';
import { Menu } from '@models';
import { ApiResponse, ApiResponseStatus } from '@utils/api';

export class MenuApi extends ApiBase {
	static async getAllAsync(): Promise<ApiResponse<Menu[]>> {
		// return this.get<Menu[]>('/menu');

		const db = await this.openDb();
		const menus = await db.getAll('menus');
		return ApiResponse.create({
			data: menus,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getByIdAsync(menuId: number): Promise<ApiResponse<Menu>> {
		// return this.get<Menu>(`/menu/${menuId}`);

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
		// return this.post<Menu>('/menu', menu);

		const db = await this.openDb();
		const menus = await db.getAll('menus');
		let maxId = 0;
		if (menus.length) {
			maxId = menus.reduce((max, current) => Math.max(max, current.id), maxId);
		}

		const createdDate = new Date();
		const createdMenu: Menu = {
			...menu,
			id: maxId + 1,
			createDate: createdDate,
			lastUpdate: createdDate,
		};

		const menuId = await db.insert('menus', maxId + 1, createdMenu);
		if (menuId != createdMenu.id) {
			createdMenu.id = menuId;
		}

		return ApiResponse.create({
			data: createdMenu,
			statusCode: ApiResponseStatus.Created,
		});
	}

	static async updateAsync(menu: Menu): Promise<ApiResponse<Menu>> {
		// return this.put<Menu>(`/menu/${menu.id}`, menu);

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

	static async deleteAsync(menuId: number): Promise<ApiResponse<void>> {
		// return this.delete<void>(`/menu/${menuId}`);

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
