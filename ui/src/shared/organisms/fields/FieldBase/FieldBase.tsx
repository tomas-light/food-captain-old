import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import { makeStyles } from '@shared/theme';
import { EndAdornment } from '@shared/atoms';
import {
  FieldError,
  FieldLabel,
  FieldLoadingIndicator,
} from '@shared/molecules/fields';
import { guid } from '@utils';
import { correctClasses } from './correctClasses';

import { FieldBaseClasses, RootClassKey } from './FieldBase.classes';
import { getHelperTextId } from './getHelperTextId';
import { getLabelTextId } from './getLabelTextId';
import { FieldBaseComponentProps } from './FieldBaseComponentProps';

const useStyles = makeStyles<RootClassKey>({
  root: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridGap: 8,
  },
  control: {
    position: 'relative',
  },
});

interface FieldBaseProps<ClassKey extends string = string> extends FieldBaseComponentProps {
  label?: string;
  htmlFor?: string;

  helperText?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  isLoading?: boolean;

  classes?: FieldBaseClasses<ClassKey>;

  customEndAdornment?: ReactNode;
}

type Props<ClassKey extends string = string> = FieldBaseProps<ClassKey>;

const FieldBase: FC<Props> = (props) => {
  const {
    htmlFor = guid(),
    label,
    helperText,
    children,
    customEndAdornment,

    disabled = false,
    readonly = false,
    error = false,
    required = false,
    isLoading = false,

    classes = {},
    LabelProps,
    ErrorProps,
    LoadingIndicatorProps,
    ...rest
  } = props;

  const _classes = useStyles();
  correctClasses(classes);
  const helperTextId = getHelperTextId(htmlFor);
  const labelId = getLabelTextId(htmlFor);

  return (
    <div className={clsx(_classes.root, classes.root.root)} {...rest}>
      <FieldLabel
        label={label}
        classes={classes.label}
        htmlFor={htmlFor}
        id={labelId}
        disabled={disabled}
        {...LabelProps}
      />

      <div className={clsx(_classes.control, classes.root.control)}>
        {children}

        {Boolean(customEndAdornment) && (
          <EndAdornment classes={classes.endAdornment}>
            {customEndAdornment}
          </EndAdornment>
        )}

        <FieldLoadingIndicator
          visible={isLoading}
          right={17}
          {...LoadingIndicatorProps}
          classes={classes.indicator}
        />
      </div>

      <FieldError
        id={helperTextId}
        error={error}
        text={helperText}
        {...ErrorProps}
        classes={classes.error}
      />
    </div>
  );
};

export type { Props as FieldBaseProps };
export { FieldBase };
