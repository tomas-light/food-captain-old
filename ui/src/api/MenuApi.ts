import { Dish, Menu, User } from '~models';
import { guid } from '~utils';
import { ApiResponse, ApiResponseStatus } from '~utils/api';
import { MenuEntity } from '../../../entities';
import { ApiBase } from './ApiBase';

function mapEntityToModel(entity: MenuEntity, author?: User, dishes?: Dish[]): Menu {
	return {
		id: entity.id,
		name: entity.name,
		createDate: new Date(entity.create_date),
		lastUpdate: new Date(entity.last_update),
		author: author,
		// dishes: entity.dishes,
	};
}

function mapModelToEntity(model: Menu): MenuEntity {
	return {
		id: model.id,
		name: model.name,
		createDate: new Date(model.create_date),
		lastUpdate: new Date(model.last_update),
		author: author,
		// dishes: model.dishes,
	};
}

export class MenuApi extends ApiBase {
	static async getAllAsync(): Promise<ApiResponse<Menu[]>> {
		const db = await this.openDb();
		const entities = await db.getAll('menu');
		const menus = entities.map(entity => mapEntityToModel(entity));

		return ApiResponse.create({
			data: menus,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getByIdAsync(menuId: Menu['id']): Promise<ApiResponse<Menu>> {
		const db = await this.openDb();
		const entity = await db.get('menu', menuId);
		if (!entity) {
			return ApiResponse.create({
				data: null,
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		const menu = mapEntityToModel(entity);
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

		const menuId = await db.insert('menu', createdMenu.id, createdMenu);
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
		const menuId = await db.update('menu', menu.id, menu);

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
		const result = await db.delete('menu', menuId);
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
