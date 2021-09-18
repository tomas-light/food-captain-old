import { FieldBaseProps } from '@shared/organisms/fields/FieldBase';
import clsx from 'clsx';
import React, { FunctionComponent } from 'react';
import { components } from 'react-select';
import { OptionProps } from 'react-select/src/components/Option';

import {
  Checkbox,
  MenuItem,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@shared/theme';

import { FieldOption } from '@select/types';

const useStyles = makeStyles(theme => ({
  tooltip: {
    fontSize: '0.8rem',
  },
  option: {
    height: '100%',
  },
  selected: {
    backgroundColor: theme.colors.default.disabled.main,
  },
}));

export interface DefaultMultiOptionProps {
  selectProps: FieldBaseProps;
}

type Props = DefaultMultiOptionProps & OptionProps<FieldOption, boolean>;

const DefaultMultiOption: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const option: FieldOption = props.data;
  const selectedOptions = props.selectProps.value as FieldOption[];

  let className = classes.option;
  const optionIndex = selectedOptions.indexOf(option);
  if (optionIndex > -1) {
    className = clsx(className, classes.selected);
  }

  return (
    <components.Option {...props}>
      <Tooltip
        title={props.children}
        enterDelay={1000}
        classes={{ tooltip: classes.tooltip }}
      >
        <MenuItem className={className}>
          <Checkbox
            color={'primary'}
            checked={props.isSelected}
            disableRipple
          />

          <Typography variant={'body1'} noWrap={true}>
            {props.children}
          </Typography>
        </MenuItem>
      </Tooltip>
    </components.Option>
  );
};

export { DefaultMultiOption };
