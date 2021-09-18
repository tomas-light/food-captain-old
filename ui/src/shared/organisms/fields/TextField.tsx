import clsx from 'clsx';
import React from 'react';
import {
  FilledInput,
  FilledInputClassKey,
  FilledInputProps,
  InputBaseComponentProps,
} from '@material-ui/core';
import { makeStyles } from '@shared/theme';

import { guid } from '@utils';
import {
  FieldBase,
  FieldBaseProps,
  getHelperTextId,
} from './FieldBase';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: theme.borderRadius,
    borderTopLeftRadius: theme.borderRadius,
    borderTopRightRadius: theme.borderRadius,
    width: '100%',
  },
  readonly: {
    '&:hover': {
      backgroundColor: '#F3F3F5',
      borderColor: '#F3F3F5',
      color: '#757575',
    },
    '&$readonlyFocused': {
      backgroundColor: '#F3F3F5',
      borderColor: '#F3F3F5',
      color: '#757575',
    },
  },
  readonlyFocused: {},
  inputReadonly: {
    cursor: 'auto',
  },
}), { name: 'TextField' });

interface TextFieldProps extends FieldBaseProps<FilledInputClassKey> {
  id?: string;
  name?: string;
  value?: any;
  onChange?: (value: any) => void;
  InputProps?: Partial<FilledInputProps>;
  inputProps?: Partial<InputBaseComponentProps>;
}

type Props = TextFieldProps;

const TextField = (props: Props) => {
  const {
    id = guid(),
    value,
    onChange,

    required = false,
    readonly = false,

    inputProps,
    InputProps = {},

    classes = {},
    ...rest
  } = props;

  const helperTextId = getHelperTextId(id);
  const _classes = useStyles();

  return (
    <FieldBase
      required={required}
      readonly={readonly}
      htmlFor={id}
      {...rest}
    >
      <FilledInput
        value={value}
        aria-describedby={helperTextId}
        id={id}
        required={required}
        inputProps={inputProps}
        error={rest.error}
        {...InputProps}
        onChange={onChange}
        disableUnderline
        classes={{
          ...classes.input,
          root: clsx(
            _classes.root, {
              [_classes.readonly]: readonly,
            },
            classes.input ? classes.input.root : ''
          ),
          focused: clsx(
            {
              [_classes.readonlyFocused]: readonly,
            },
            classes.input ? classes.input.focused : ''
          ),
          input: clsx(
            {
              [_classes.inputReadonly]: readonly,
            },
            classes.input ? classes.input.input : ''
          ),
        }}
        readOnly={readonly}
      />
    </FieldBase>
  );
};

export { TextField };
export type { TextFieldProps };
