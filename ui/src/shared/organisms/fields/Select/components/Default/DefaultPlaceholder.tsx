import clsx from 'clsx';
import React, { FC } from 'react';
import { components } from 'react-select';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@shared/theme';

import { SelectFieldOption } from '../../types';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.colors.text.medium,
  },
  error: {
    color: theme.palette.error.main,
  },
}));

type Props = PlaceholderProps<SelectFieldOption, boolean>;

const DefaultPlaceholder: FC<Props> = (props) => {
  const {
    children,
    selectProps: { error, required },
  } = props;

  const classes = useStyles();

  return (
    <components.Placeholder {...props}>
      <Typography
        className={clsx(classes.root, {
          [classes.error]: !!error,
        })}
      >
        {children}
        {required ? (
          <span> *</span>
        ) : ''}
      </Typography>
    </components.Placeholder>
  );
};

export { DefaultPlaceholder };
