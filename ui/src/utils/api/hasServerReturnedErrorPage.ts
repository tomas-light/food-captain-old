import { AxiosError } from 'axios';
import { CONTENT_TYPE, MARKUP_CONTENT_TYPE } from './constants';

export function hasServerReturnedErrorPage(error: AxiosError): boolean {
  const contentType = error.response.headers[CONTENT_TYPE];
  return Boolean(contentType)
    && contentType === MARKUP_CONTENT_TYPE
  ;
}
