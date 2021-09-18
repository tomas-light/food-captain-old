import React, { ComponentType, forwardRef, ForwardRefRenderFunction, ReactElement, Ref } from 'react';
import {
  IconButton as MuiIconButton,
  IconButtonClassKey,
  StyledComponentProps,
  Tooltip,
} from '@material-ui/core';
import { IconButtonProps as MuiIconButtonProps } from '@material-ui/core/IconButton/IconButton';
import { withStyles } from '@shared/theme';

import { Spinner } from '@shared/molecules/Spinner';
import { ButtonState } from '../ButtonState';

type ClassKey = IconButtonClassKey | 'spinner';

interface IconButtonProps {
  icon: ReactElement;
  state?: ButtonState;
}

type Props = Omit<MuiIconButtonProps, 'variant' | 'size' | 'children'>
  & IconButtonProps
  & StyledComponentProps<ClassKey>;

const IconButton: ForwardRefRenderFunction<any, Props> = (props: Props, ref: Ref<any>) => {
  const {
    icon,
    classes: { spinner, ...restClasses },
    state = {},
    title,
    ...rest
  } = props;

  const IconButtonBaseComponent = (
    <MuiIconButton
      disabled={state.loading || state.disabled || state.pristine}
      ref={ref}
      classes={restClasses}
      {...rest}
    >
      <Spinner visible={state.loading} className={spinner}/>
      {icon}
    </MuiIconButton>
  );

  if (title) {
    if (state.disabled) {
      return (
        <Tooltip title={title}>
          <span>
            {IconButtonBaseComponent}
          </span>
        </Tooltip>
      );
    }

    return (
      <Tooltip title={title}>
        {IconButtonBaseComponent}
      </Tooltip>
    );
  }

  return IconButtonBaseComponent;
};

const componentWithRef: ComponentType<Props> = forwardRef(IconButton);
const componentWithStyles = withStyles<ClassKey>({
  root: {
    position: 'relative',
  },
  spinner: {
    position: 'absolute',
  },
  edgeStart: {},
  edgeEnd: {},
  colorInherit: {},
  colorPrimary: {},
  colorSecondary: {},
  disabled: {},
  sizeSmall: {},
  label: {},
})(componentWithRef);

export { componentWithStyles as IconButton };
export type { Props as IconButtonProps, ClassKey as IconButtonClassKey };

