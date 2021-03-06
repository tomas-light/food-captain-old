import { CSSProperties } from 'react';

import { FieldBaseProps } from '@shared/organisms/fields/FieldBase';
import { SelectWrapperProps } from '@select';
import { FieldOption } from '@select/types';

export interface SingleSelectProps extends SelectWrapperProps<FieldOption>, FieldBaseProps {
  controlStyles?: CSSProperties;
}
