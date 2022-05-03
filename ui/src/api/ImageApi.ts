import { Image } from '~models';
import { guid } from '~utils';
import { ApiResponse, ApiResponseStatus } from '~utils/api';
import { ImageEntity, WithImage } from '../../../entities';
import { ApiBase } from './ApiBase';

function mapEntityToModel(entity: ImageEntity): Image {
	return {
		...entity,
	};
}

function mapModelToEntity(model: Image): ImageEntity {
	return {
		...model,
	};
}

export class ImageApi extends ApiBase {
	static async getAllAsync(): Promise<ApiResponse<Image[]>> {
		const db = await this.openDb();
		const images = await db.getAll('image');

		return ApiResponse.create({
			data: images.map(mapEntityToModel),
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getImagesForEntitiesAsync(withImages: WithImage[]) {
		const imageIds = withImages.map((e) => e.image_id).filter((id) => id);
		return ImageApi.getManyAsync(imageIds);
	}

	static async getManyAsync(ids: Image['id'][]): Promise<ApiResponse<Image[]>> {
		if (!ids.length) {
			return ApiResponse.create({
				data: [],
				statusCode: ApiResponseStatus.Ok,
			});
		}

		const db = await this.openDb();
		const allImages = await db.getAll('image');
		const images = allImages.filter((image) => ids.includes(image.id));

		return ApiResponse.create({
			data: images.map(mapEntityToModel),
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getByIdAsync(imageId: Image['id']): Promise<ApiResponse<Image>> {
		if (!imageId) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		const db = await this.openDb();
		const image = await db.get('image', imageId);
		if (!image) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		return ApiResponse.create({
			data: mapEntityToModel(image),
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async addAsync(image: Omit<Image, 'id'>): Promise<ApiResponse<Image>> {
		const db = await this.openDb();
		const entity = mapModelToEntity({
			...image,
			id: guid(),
		});

		const id = await db.insert('image', entity.id, entity);
		image = mapEntityToModel({
			...entity,
			id,
		});

		return ApiResponse.create({
			data: image as Image,
			statusCode: ApiResponseStatus.Created,
		});
	}

	static async deleteAsync(imageId: Image['id']): Promise<ApiResponse<void>> {
		const db = await this.openDb();

		const image = await db.get('image', imageId);
		if (!image) {
			return ApiResponse.create<void>({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		const result = await db.delete('image', imageId);
		if (!result) {
			return ApiResponse.create<void>({
				statusCode: ApiResponseStatus.InternalServerError,
				error: 'image deleting failed',
			});
		}

		return ApiResponse.create<void>({
			statusCode: ApiResponseStatus.NoContent,
		});
	}
}
