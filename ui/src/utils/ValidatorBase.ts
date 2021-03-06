import { TFunction } from 'react-i18next';

export class ValidatorBase {
  constructor(protected readonly translate: TFunction<string>) {
  }

  protected static isNullOrUndefined(value: any) {
    return value === null || value === undefined;
  }

  protected static isEmptyString(value: string) {
    return typeof value === 'string' && value.length === 0;
  }

  protected static isEmptyArray(value: number[]) {
    return Array.isArray(value) && value.length === 0;
  }

  protected static isNullOrEmptyString(value: string) {
    return ValidatorBase.isNullOrUndefined(value)
      || ValidatorBase.isEmptyString(value);
  }

  protected static isNullOrEmptyArray(value: number[]) {
    return ValidatorBase.isNullOrUndefined(value)
      || ValidatorBase.isEmptyArray(value);
  }

  protected static isPositiveOrZeroNumber(value: number) {
    return typeof value === 'number' && value >= 0;
  }

  protected static isNumberArray(value: number) {
    return Array.isArray(value) && value.every(v => typeof v === 'number');
  }
}
