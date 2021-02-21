import { AxiosError } from 'axios';
import { CONTENT_TYPE, MARKUP_CONTENT_TYPE } from './constants';
import { hasServerReturnedErrorPage } from './hasServerReturnedErrorPage';

test('null', () => {
  const result = hasServerReturnedErrorPage({
    response: {
      headers: {},
    },
  } as AxiosError);
  expect(result).toBe(false);
});

test('false', () => {
  const result = hasServerReturnedErrorPage({
    response: {
      headers: {
        [CONTENT_TYPE]: 'some type',
      },
    },
  } as AxiosError);
  expect(result).toBe(false);
});

test('true', () => {
  const result = hasServerReturnedErrorPage({
    response: {
      headers: {
        [CONTENT_TYPE]: MARKUP_CONTENT_TYPE,
      },
    },
  } as AxiosError);
  expect(result).toBe(true);
});
