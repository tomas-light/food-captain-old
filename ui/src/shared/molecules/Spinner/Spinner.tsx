import clsx from 'clsx';
import React from 'react';
import {
  CircularProgress,
  CircularProgressClassKey,
  CircularProgressProps,
  makeStyles,
} from '@material-ui/core';

import { ClassNameMap } from '@utils/types';

const useStyles = makeStyles({
  hidden: {
    display: 'none',
  },
});

interface SpinnerProps {
  visible: boolean;
  classes?: ClassNameMap<CircularProgressClassKey>;
}

type Props = SpinnerProps & CircularProgressProps;

const Spinner = (props: Props) => {
  const {
    visible,
    classes = {},
    ...rest
  } = props;

  const loaderClasses = useStyles();

  return (
    <CircularProgress
      color="primary"
      classes={{
        root: clsx(!visible && loaderClasses.hidden, classes.root),
        ...classes,
      }}
      {...rest}
    />
  );
};

export { Spinner };
