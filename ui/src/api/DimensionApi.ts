import { Dimension } from '~models';
import { guid } from '~utils';
import { ApiResponse, ApiResponseStatus } from '~utils/api';
import { DimensionEntity } from '../../../entities';
import { ApiBase } from './ApiBase';

function mapEntityToModel(entity: DimensionEntity): Dimension {
	return {
		...entity,
	};
}

function mapModelToEntity(model: Dimension): DimensionEntity {
	return {
		...model,
	};
}

export class DimensionApi extends ApiBase {
	static async getAllAsync(): Promise<ApiResponse<Dimension[]>> {
		const db = await this.openDb();
		const dimensions = await db.getAll('dimension');

		return ApiResponse.create({
			data: dimensions.map(mapEntityToModel),
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getManyAsync(ids: Dimension['id'][]): Promise<ApiResponse<Dimension[]>> {
		if (!ids.length) {
			return ApiResponse.create({
				data: [],
				statusCode: ApiResponseStatus.Ok,
			});
		}

		const db = await this.openDb();
		const allDimensions = await db.getAll('dimension');
		const dimensions = allDimensions.filter((dimension) => ids.includes(dimension.id));

		return ApiResponse.create({
			data: dimensions.map(mapEntityToModel),
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async getByIdAsync(dimensionId: Dimension['id']): Promise<ApiResponse<Dimension>> {
		if (!dimensionId) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		const db = await this.openDb();
		const dimension = await db.get('dimension', dimensionId);
		if (!dimension) {
			return ApiResponse.create({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		return ApiResponse.create({
			data: mapEntityToModel(dimension),
			statusCode: ApiResponseStatus.Ok,
		});
	}

	static async addAsync(dimension: Omit<Dimension, 'id'>): Promise<ApiResponse<Dimension>> {
		const db = await this.openDb();
		const entity = mapModelToEntity({
			...dimension,
			id: guid(),
		});

		const id = await db.insert('dimension', entity.id, entity);
		dimension = mapEntityToModel({
			...entity,
			id,
		});

		return ApiResponse.create({
			data: dimension as Dimension,
			statusCode: ApiResponseStatus.Created,
		});
	}

	static async deleteAsync(dimensionId: Dimension['id']): Promise<ApiResponse<void>> {
		const db = await this.openDb();

		const dimension = await db.get('dimension', dimensionId);
		if (!dimension) {
			return ApiResponse.create<void>({
				statusCode: ApiResponseStatus.NotFound,
			});
		}

		const result = await db.delete('dimension', dimensionId);
		if (!result) {
			return ApiResponse.create<void>({
				statusCode: ApiResponseStatus.InternalServerError,
				error: 'dimension deleting failed',
			});
		}

		return ApiResponse.create<void>({
			statusCode: ApiResponseStatus.NoContent,
		});
	}
}
