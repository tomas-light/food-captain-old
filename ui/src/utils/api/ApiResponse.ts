import { ApiResponseStatus } from './ApiResponseStatus';

export class ApiResponse<TData = any> {
	statusCode: ApiResponseStatus;
	data: TData;
	error: string;

	constructor(response?: Partial<ApiResponse>) {
		this.statusCode = ApiResponseStatus.Unknown;
		this.data = null as any;
		this.error = '';

		if (response) {
			Object.keys(response).forEach((propertyName) => {
				this[propertyName] = response[propertyName];
			});
		}
	}

	static create<Data>(response?: Partial<ApiResponse<Data>>): ApiResponse<Data> {
		return new ApiResponse<Data>(response);
	}

	hasError(): boolean {
		return this.statusCode >= ApiResponseStatus.BadRequest || this.statusCode === ApiResponseStatus.Unknown;
	}

	hasServerError() {
		return this.statusCode >= ApiResponseStatus.InternalServerError;
	}

	hasClientError() {
		return (
			this.statusCode >= ApiResponseStatus.BadRequest &&
			!this.hasTimeoutError() &&
			this.statusCode < ApiResponseStatus.InternalServerError
		);
	}

	hasTimeoutError() {
		return this.statusCode === ApiResponseStatus.RequestTimeout;
	}
}
