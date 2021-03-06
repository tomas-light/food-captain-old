import React from 'react';

import { SelectWrapperProps } from '@select';
import {
  SimpleSingleSelect,
  SingleSelectWithIcon,
  SimpleMultiSelect,
} from './SelectVariants';

interface SelectProps extends SelectWrapperProps {
  variant?:
    | 'single-simple'
    | 'single-with-icon'
    | 'multi-simple'
    ;
}

type Props = SelectProps;

const Select = (props: Props) => {
  const { variant, ...rest } = props;

  switch (variant) {
    case 'single-with-icon':
      return (
        <SingleSelectWithIcon {...rest} />
      );

    case 'multi-simple':
      return (
        <SimpleMultiSelect {...rest} />
      );

    case 'single-simple':
    default:
      return (
        <SimpleSingleSelect {...rest} />
      );
  }
};

export { Select };
export type { SelectProps };
