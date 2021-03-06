import clsx from 'clsx';
import React from 'react';
import {
  createStyles,
  FormControlLabel,
  Radio,
  RadioGroup,
  StyledComponentProps,
  withStyles,
} from '@material-ui/core';

import { RadioButtonItem } from './RadioButtonItem';

type RadioButtonFieldClassKey =
  | 'root'
  | 'label'
  | 'checked'
  | 'disabled'
  | 'radio'
  ;

const styles = (theme) => createStyles<RadioButtonFieldClassKey, any>({
  root: {},
  label: {
    color: theme.content.primary,
    paddingTop: 12,
  },
  checked: {
    color: theme.content.primary,
    paddingTop: 12,
  },
  disabled: {
    color: theme.disabled.main,
  },
  radio: {},
});

interface RadioButtonFieldProps {
  items: RadioButtonItem[];
  disabled?: boolean;
  name: string;
  value: string | number;
}

type Props = RadioButtonFieldProps & StyledComponentProps<RadioButtonFieldClassKey>;

const RadioButtonField = (props: Props) => {
  const {
    classes,
    disabled,
    items,
    name,
    value,
    ...rest
  } = props;

  return (
    <RadioGroup {...rest} name={name} value={value} className={classes.root}>
      {items.map((item: RadioButtonItem) => {
        const _disabled = Boolean(disabled || item.disabled);
        const checked = item.id === value;
        return (
          <FormControlLabel
            key={`${name}-radio-button-${item.id}`}
            control={(
              <Radio
                disabled={_disabled}
                color={'secondary'}
                className={classes.radio}
              />
            )}
            label={item.label}
            value={item.id}
            disabled={_disabled}
            classes={{
              root: clsx(classes.label, {
                [classes.checked]: checked,
              }),
              disabled: classes.disabled,
            }}
          />
        );
      })}
    </RadioGroup>
  );
};

const componentWithStyles = withStyles(styles)(RadioButtonField);
export { componentWithStyles as RadioButtonField };
export type { RadioButtonFieldProps };
