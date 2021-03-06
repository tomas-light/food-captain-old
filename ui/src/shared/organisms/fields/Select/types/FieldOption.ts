import { Option } from './Option';
import { OptionValueType } from './OptionValueType';

export interface FieldOption<TOptionValue = OptionValueType, TInnerValue = OptionValueType>
  extends Option<TOptionValue> {

  emptySingleValue(): TOptionValue;

  emptyMultiValue(): TOptionValue[];

  emptyOption(): FieldOption<TOptionValue, TInnerValue>;

  isEmptyOption(): boolean;

  isNullOrEmptySingle(): boolean;

  isNullOrEmptySingleValue(value: any): boolean;

  isNullOrEmptyMulti(): boolean;

  isNullOrEmptyMultiValue(value: any): boolean;

  isEquals(value: TInnerValue): boolean;

  getValue(): TInnerValue;

  setValue(value: TInnerValue): void;

  getSearchTags(): string[];
}
