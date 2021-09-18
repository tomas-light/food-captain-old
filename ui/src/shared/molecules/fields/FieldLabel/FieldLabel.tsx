import React from 'react';
import {
  InputLabel,
  StyledComponentProps,
} from '@material-ui/core';
import { InputLabelClassKey } from '@material-ui/core/InputLabel/InputLabel';
import { withStyles } from '@shared/theme';

interface FieldLabelProps {
  label?: string;
  htmlFor?: string;
  id?: string;
  disabled?: boolean;
}

type Props = FieldLabelProps & StyledComponentProps<InputLabelClassKey>;

const FieldLabel = (props: Props) => {
  const { label, ...rest } = props;

  if (!label) {
    return null;
  }

  return (
    <InputLabel
      variant="standard"
      shrink
      {...rest}
    >
      {label}
    </InputLabel>
  );
};

const componentWithStyles = withStyles<InputLabelClassKey>((theme) => ({
  shrink: {
    position: 'relative',
    transform: 'none',
  },
  root: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '19px',
    fontVariant: 'small-caps',
    color: '#061727',
  },
  sizeSmall: {},
  animated: {},
  asterisk: {},
  disabled: {},
  error: {},
  filled: {},
  focused: {},
  formControl: {},
  outlined: {},
  required: {},
}), { name: 'FieldLabel' })(FieldLabel);

export { componentWithStyles as FieldLabel };
export type {
  FieldLabelProps,
  InputLabelClassKey as FieldLabelClassKey,
};
