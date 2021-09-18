import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormControl, Typography } from '@material-ui/core';
import { makeStyles } from '@shared/theme';

import { RadioButtonFieldProps, RadioButtonField } from '@shared/organisms/fields';
import { FieldComponentCallProps } from '../FieldComponentCallProps';
import { useHandleChangeOfFormRadio } from './useHandleChangeOfFormRadio';

const useStyles = makeStyles(theme => ({
  label: {
    color: theme.colors.text.medium,
  },
}));

interface RadioButtonFieldComponentProps extends RadioButtonFieldProps, FieldComponentCallProps {
  label?: string;
  id?: string;
}

type Props = RadioButtonFieldComponentProps & FieldRenderProps<any, HTMLInputElement>;

const RadioButtonFieldComponent = (props: Props) => {
  const {
    input: { onChange, value, ...restInput },
    sideOnChange,
    meta,
    label,
    ...rest
  } = props;

  const classes = useStyles({});

  const handleOnChange = useHandleChangeOfFormRadio({
    onFieldChange: onChange,
    onValueChange: sideOnChange,
    readOnly: rest.readOnly,
    disabled: rest.disabled,
  });

  return (
    <FormControl fullWidth disabled={rest.disabled}>
      <Typography variant={'body1'} className={classes.label}>
        {label}
      </Typography>

      <RadioButtonField
        {...rest}
        value={value}
        onChange={handleOnChange}
      />
    </FormControl>
  );
};

export { RadioButtonFieldComponent };
export type { RadioButtonFieldComponentProps };
