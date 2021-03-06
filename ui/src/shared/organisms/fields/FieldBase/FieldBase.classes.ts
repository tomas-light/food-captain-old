import { EndAdornmentClassKey } from '@shared/atoms';
import {
  FieldErrorClassKey,
  FieldLabelClassKey,
  FieldLoadingIndicatorClassKey,
} from '@shared/molecules/fields';
import { ClassNameMap } from '@utils/types';

export type RootClassKey = 'root' | 'control';

export type FieldBaseClasses<ClassKey extends string = string> = {
  root?: ClassNameMap<RootClassKey>,
  label?: ClassNameMap<FieldLabelClassKey>,
  endAdornment?: ClassNameMap<EndAdornmentClassKey>,
  error?: ClassNameMap<FieldErrorClassKey>,
  indicator?: ClassNameMap<FieldLoadingIndicatorClassKey>,
  input?: ClassNameMap<ClassKey>;
};
