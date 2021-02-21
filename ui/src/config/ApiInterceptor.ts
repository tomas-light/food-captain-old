import { Action } from 'app-redux-utils';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { Dispatch } from 'redux';

import { ApiErrorDto } from '@api/models/error';
import { Notification, NotifierActions } from '@Notifier';
import {
  ApiResponse,
  ApiResponseStatus,
  createApiErrorNotification,
  isAxiosError,
  hasServerReturnedErrorPage,
  AJAX_HEADER_KEY,
  AJAX_HEADER_VALUE,
  ACCEPT_HEADER_KEY,
  ACCEPT_HEADER_VALUE,
  AUTHORIZATION,
  SOMETHING_WRONG_MESSAGE,
} from '@utils/api';

export class ApiInterceptor {
  constructor(private readonly dispatch: Dispatch<Action>) {
    axios.interceptors.request.use(
      ApiInterceptor.requestFulfilled,
      ApiInterceptor.requestRejected,
    );

    axios.interceptors.response.use(
      ApiInterceptor.responseFulfilled as any,
      this.responseRejected.bind(this),
    );
  }

  static init(dispatch: Dispatch<Action>) {
    return new ApiInterceptor(dispatch);
  }

  private static requestFulfilled(config: AxiosRequestConfig): AxiosRequestConfig {
    if (!config.headers) {
      config.headers = {};
    }

    config.headers[AJAX_HEADER_KEY] = AJAX_HEADER_VALUE;
    config.headers[ACCEPT_HEADER_KEY] = ACCEPT_HEADER_VALUE;

    const accessToken = localStorage.getItem(process.env.ACCESS_TOKEN);
    if (accessToken) {
      config.headers[AUTHORIZATION] = `Bearer ${accessToken}`;
    }

    return config;
  }

  private static requestRejected(error: AxiosError): Promise<ApiResponse> {
    const response = new ApiResponse({ error: error.message });

    if (error.response) {
      response.statusCode = error.response.status;
      response.data = error.response.data;
    }

    return Promise.reject(response);
  }

  private static responseFulfilled(axiosResponse: AxiosResponse): ApiResponse {
    return new ApiResponse({
      statusCode: axiosResponse.status,
      data: axiosResponse.data,
    });
  }

  private responseRejected(error: AxiosError<ApiErrorDto> | Error): ApiResponse {
    if (!isAxiosError(error)) {
      this.showErrorNotification(error);

      return new ApiResponse({
        error: error.message,
        statusCode: ApiResponseStatus.RequestTimeout, // most likely event
      });
    }

    if (!error.response) {
      return new ApiResponse({
        error: error.code,
        statusCode: ApiResponseStatus.Unknown,
      });
    }

    const response = new ApiResponse({
      statusCode: error.response.status,
      error: error.response.data.message || error.response.data.error,
    });

    if (hasServerReturnedErrorPage(error)) {
      response.error = SOMETHING_WRONG_MESSAGE;
      response.statusCode = ApiResponseStatus.InternalServerError;
    }

    this.showApiErrorNotification(response);

    return response;
  }

  private showErrorNotification(error: Error) {
    const message = error
      ? error.message
      : SOMETHING_WRONG_MESSAGE;

    const notification = new Notification(message, { variant: 'warning' });
    this.dispatch(NotifierActions.enqueueSnackbar(notification));
  }

  private showApiErrorNotification(response: ApiResponse) {
    const notification = createApiErrorNotification(response);
    this.dispatch(NotifierActions.enqueueSnackbar(notification));
  }
}
