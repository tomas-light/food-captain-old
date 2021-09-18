import React from 'react';
import { StyledComponentProps } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { withStyles } from '@shared/theme';

import { Spinner, SpinnerProps } from '../../Spinner';

const loaderSize = 24;

type ClassKey =
  | 'root'
  ;

interface FieldLoadingIndicatorProps extends SpinnerProps {
  right?: number | string;
}

type Props = FieldLoadingIndicatorProps & StyledComponentProps<ClassKey>;

const FieldLoadingIndicator = (props: Props) => {
  const {
    classes,
    visible,
    right = 12,
    ...rest
  } = props;

  return (
    <Spinner
      visible={visible}
      size={loaderSize}
      className={classes.root}
      {...rest}
    />
  );
};

const styles = createStyles<ClassKey, FieldLoadingIndicatorProps>({
  root: {
    position: 'absolute',
    bottom: 0,
    display: 'block',
    margin: 0,
    boxSizing: 'border-box',
    zIndex: 1,
    top: `calc(50% - ${(loaderSize / 2)}px)`,
    right: (props) => props.right,
  },
});

const componentWithStyles = withStyles<ClassKey>(
  styles,
  { name: 'FieldLoadingIndicator' }
)(FieldLoadingIndicator);

export { componentWithStyles as FieldLoadingIndicator };
export type {
  FieldLoadingIndicatorProps,
  ClassKey as FieldLoadingIndicatorClassKey,
};
