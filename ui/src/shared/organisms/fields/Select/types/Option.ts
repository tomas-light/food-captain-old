import { OptionValueType } from './OptionValueType';

export interface Option<TOptionValue = OptionValueType> {
  id: TOptionValue;
  title: string;
}
