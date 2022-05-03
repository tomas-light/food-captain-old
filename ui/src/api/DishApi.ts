import { ImageApi } from '~api/ImageApi';
import { RecipeApi } from '~api/RecipeApi';
import { Dish } from '~models';
import { guid } from '~utils';
import { ApiResponse, ApiResponseStatus } from '~utils/api';
import { DishEntity, ImageEntity } from '../../../entities';
import { ApiBase } from './ApiBase';

function mapEntityToModel(entity: DishEntity, recipe?: Dish['recipe'], image?: Dish['image']): Dish {
	return {
		id: entity.id,
		name: entity.name,
		description: entity.description,
		// order: ,
		recipe: recipe,
		image: image,
	};
}

function mapModelToEntity(model: Dish, imageId?: DishEntity['image_id']): DishEntity {
	return {
		id: model.id,
		name: model.name,
		description: model.description,
		image_id: imageId,
	};
}

export class DishApi extends ApiBase {
	static async getAllAsync(): Promise<ApiResponse<Dish[]>> {
		const db = await this.openDb();
		const dishes = await db.getAll('dish');

		const images = await ImageApi.getImagesForEntitiesAsync(dishes);

		return ApiResponse.create({
			data: dishes.map((entity) =>
				mapEntityToModel(entity, undefined, images.data.find((image) => image.id === entity.image_id)?.content)
			),
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getManyAsync(ids: Dish['id'][]): Promise<ApiResponse<Dish[]>> {
		if (!ids.length) {
			return ApiResponse.create({
				data: [],
				statusCode: ApiResponseStatus.Ok,
			});
		}

		const db = await this.openDb();
		const allDishes = await db.getAll('dish');
		const dishes = allDishes.filter((image) => ids.includes(image.id));

		const images = await ImageApi.getImagesForEntitiesAsync(dishes);

		return ApiResponse.create({
			data: dishes.map((entity) =>
				mapEntityToModel(entity, undefined, images.data?.find((image) => image.id === entity.image_id)?.content)
			),
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getByIdAsync(dishId: Dish['id']): Promise<ApiResponse<Dish>> {
		if (!dishId) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		const db = await this.openDb();
		const dish = await db.get('dish', dishId);
		if (!dish) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		const image = await ImageApi.getByIdAsync(dish.image_id);
		const recipe = await RecipeApi.getByDishIdAsync(dishId);

		return ApiResponse.create({
			data: mapEntityToModel(dish, recipe.data, image.data?.content),
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async addAsync(dish: Omit<Dish, 'id'>): Promise<ApiResponse<Dish>> {
		const db = await this.openDb();

		let image: ImageEntity;

		if (dish.image) {
			const response = await ImageApi.addAsync({
				content: dish.image,
			});
			image = response.data;
		}

		const entity = mapModelToEntity(
			{
				...dish,
				id: guid(),
			},
			image?.id
		);

		const id = await db.insert('dish', entity.id, entity);
		const recipe = await RecipeApi.addAsync(dish.recipe, entity);

		dish = mapEntityToModel(
			{
				...entity,
				id,
			},
			recipe.data,
			image?.content
		);

		return ApiResponse.create({
			data: dish as Dish,
			statusCode: ApiResponseStatus.Created,
		});
	}

	static async updateAsync(dish: Dish): Promise<ApiResponse<Dish>> {
		const db = await this.openDb();

		const exitedDish = await db.get('dish', dish.id);
		if (!exitedDish) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		let image: ImageEntity;
		if (dish.image) {
			const imageResponse = await ImageApi.getByIdAsync(exitedDish.image_id);
			if (imageResponse && imageResponse.data?.content !== dish.image) {
				await ImageApi.deleteAsync(imageResponse.data!.id);
			}

			const addedImageResponse = await ImageApi.addAsync({ content: dish.image });
			image = addedImageResponse.data;
		}

		const entity = mapModelToEntity(dish, image?.id);
		await db.update('dish', entity.id, entity);

		if (!dish.recipe.id) {
			const recipe = await RecipeApi.getByDishIdAsync(dish.id);
			dish.recipe = {
				...recipe.data,
				...dish.recipe,
			};
		}
		await RecipeApi.updateAsync(dish.recipe);

		return ApiResponse.create({
			data: mapEntityToModel(entity, undefined, image?.content),
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async deleteAsync(dishId: Dish['id']): Promise<ApiResponse<void>> {
		const db = await this.openDb();

		const dish = await db.get('dish', dishId);
		if (!dish) {
			return ApiResponse.create<void>({
				statusCode: ApiResponseStatus.NotFound,
				error: 'dish not found',
			});
		}

		if (dish.image_id) {
			await ImageApi.deleteAsync(dish.image_id);
		}

		const result = await db.delete('dish', dishId);
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
