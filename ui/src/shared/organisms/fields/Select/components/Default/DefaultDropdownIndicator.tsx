import React from 'react';
import { components } from 'react-select';
import { IndicatorProps } from 'react-select/src/components/indicators';
import { makeStyles } from '@material-ui/core';

import { ChevronDownIcon, ChevronUpIcon } from '@shared/atoms/icons';
import { FieldOption } from '../../types';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
  default: {
    color: '#000000',
  },
  disabled: {
    color: 'transparent',
  },
}), { name: 'DefaultDropdownIndicator' });

type Props = IndicatorProps<FieldOption, boolean>;

const DefaultDropdownIndicator = (props: Props) => {
  const {
    selectProps: {
      menuIsOpen,
      isDisabled,
      readOnly,
    },
    isFocused,
  } = props;

  const classes = useStyles();

  if (readOnly) {
    return null;
  }

  let className = classes.default;
  if (isDisabled) {
    className = classes.disabled;
  }

  return (
    <components.DropdownIndicator className={classes.root} {...props}>
      {menuIsOpen
        ? <ChevronUpIcon className={className}/>
        : <ChevronDownIcon className={className}/>
      }
    </components.DropdownIndicator>
  );
};

export { DefaultDropdownIndicator };
