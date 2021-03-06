import { FieldBaseProps } from '@shared/organisms/fields/FieldBase';
import React, { FunctionComponent } from 'react';
import { ValueContainerProps } from 'react-select/src/components/containers';

import { Typography } from '@shared/atoms/Typography/Typography';

import { FieldOption } from '@select/types';

interface DefaultMultiValueLabelProps {
  data: FieldOption;
  selectProps: FieldBaseProps;
}

type Props = DefaultMultiValueLabelProps & ValueContainerProps<FieldOption, boolean>;

const DefaultMultiValueLabel: FunctionComponent<Props> = (props: Props) => {
  const { selectProps, data } = props;
  let { children } = props;

  const selectedOptions = selectProps.value as FieldOption[];

  const optionIndex = selectedOptions.indexOf(data);
  if (0 <= optionIndex && optionIndex < selectedOptions.length - 1) {
    children += ',';
  }

  return (
    <Typography
      size={'300'}
      color={selectProps.isDisabled
        ? 'disabled'
        : selectProps.isFocused
          ? 'primary'
          : 'medium'
      }
    >
      {children}
    </Typography>
  );
};

export { DefaultMultiValueLabel };
