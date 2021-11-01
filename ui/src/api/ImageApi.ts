import { ApiBase } from '~api/base';
import { Image } from '~models';
import { guid } from '~utils';
import { ApiResponse, ApiResponseStatus } from '~utils/api';

export class ImageApi extends ApiBase {
	static async getAllAsync(): Promise<ApiResponse<Image[]>> {
		const db = await this.openDb();
		const images = await db.getAll('images');
		return ApiResponse.create({
			data: images,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getByIdAsync(imageId: Image['id']): Promise<ApiResponse<Image>> {
		const db = await this.openDb();
		const image = await db.get('images', imageId);
		if (!image) {
			return ApiResponse.create({
				data: null,
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		return ApiResponse.create({
			data: image,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async addAsync(image: Image): Promise<ApiResponse<Image>> {
		const db = await this.openDb();
		const createdImage: Image = {
			...image,
			id: guid(),
		};

		const menuId = await db.insert('images', createdImage.id, createdImage);
		if (menuId != createdImage.id) {
			createdImage.id = menuId;
		}

		return ApiResponse.create({
			data: createdImage,
			statusCode: ApiResponseStatus.Created,
		});
	}

	static async updateAsync(image: Image): Promise<ApiResponse<Image>> {
		const db = await this.openDb();
		const imageId = await db.update('images', image.id, image);

		if (imageId != image.id) {
			image.id = imageId;
		}

		return ApiResponse.create({
			data: image,
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async deleteAsync(imageId: Image['id']): Promise<ApiResponse<void>> {
		const db = await this.openDb();
		const result = await db.delete('images', imageId);
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
