import clsx from 'clsx';
import React from 'react';
import {
  createStyles,
  StyledComponentProps,
  Typography,
  withStyles,
} from '@material-ui/core';

type FieldErrorClassKey =
  | 'root'
  | 'error'
  | 'help'
  ;

const styles = (theme) => createStyles<FieldErrorClassKey, FieldErrorProps>({
  root: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',

    fontSize: 14,
    lineHeight: '20px',
  },
  error: {
    color: '#D44333',
  },
  help: {
    color: '#757575',
  },
});

interface FieldErrorProps {
  id?: string;
  error: boolean;
  text: string;
}

type Props = FieldErrorProps & StyledComponentProps<FieldErrorClassKey>;

const FieldError = (props: Props) => {
  const {
    classes,
    error,
    text,
    ...rest
  } = props;

  const show = Boolean(text || error);

  if (!show) {
    return null;
  }

  return (
    <Typography
      className={clsx(classes.root, {
        [classes.error]: error,
        [classes.help]: !error,
      })}
      {...rest}
    >
      {text}
    </Typography>
  );
};

const componentWithStyles = withStyles<FieldErrorClassKey>(
  styles,
  { name: 'FieldError' }
)(FieldError);

export { componentWithStyles as FieldError };
export type {
  FieldErrorProps,
  FieldErrorClassKey,
};
