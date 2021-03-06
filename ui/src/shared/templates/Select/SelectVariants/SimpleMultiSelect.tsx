import React from 'react';
import { StylesConfig } from 'react-select';

import { DefaultSelectContainer, SelectWrapper } from '@select';
import {
  DefaultClearIndicator,
  DefaultDropdownIndicator,
  DefaultPlaceholder,
  DefaultSingleOption,
  DefaultSingleValue,
  DefaultValueContainer,
  DefaultControl,
  DefaultMenuList,
  DefaultMultiValue,
  DefaultMultiValueLabel,
  DefaultMultiValueRemove,
} from '@select/components';

import { SingleSelectProps } from './SingleSelectProps';

type Props = SingleSelectProps;

const SimpleMultiSelect = (props: Props) => {
  const { components, controlStyles, styles, ...rest } = props;

  const overriddenSelectComponentStyles: StylesConfig<any, boolean> = {
    control: () => ({ ...controlStyles }),
    singleValue: () => ({}),
    ...styles,
  };

  return (
    <SelectWrapper
      {...rest}
      styles={overriddenSelectComponentStyles}
      components={{
        ClearIndicator: DefaultClearIndicator,
        DropdownIndicator: DefaultDropdownIndicator,
        LoadingIndicator: null,
        IndicatorSeparator: null,
        Control: DefaultControl,
        MenuList: DefaultMenuList,
        Option: DefaultSingleOption,
        Placeholder: DefaultPlaceholder,
        SelectContainer: DefaultSelectContainer,
        SingleValue: DefaultSingleValue,
        ValueContainer: DefaultValueContainer,
        MultiValue: DefaultMultiValue,
        MultiValueLabel: DefaultMultiValueLabel,
        MultiValueRemove: DefaultMultiValueRemove,
        ...components,
      }}
    />
  );
};

export { SimpleMultiSelect };
