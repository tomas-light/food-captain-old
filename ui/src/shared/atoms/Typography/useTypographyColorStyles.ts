import { makeStyles } from '@shared/theme';

import { TypographyColorVariant } from './TypographyColorVariant';

const useTypographyColorStyles = makeStyles<TypographyColorVariant>(theme => ({
  strong: {
    color: theme.colors.text.strong,
  },
  medium: {
    color: theme.colors.text.medium,
  },
  light: {
    color: theme.colors.text.light,
  },
  disabled: {
    color: theme.colors.text.disabled,
  },

  default: {
    color: theme.colors.default.main,
  },
  'default.text': {
    color: theme.colors.default.text,
  },

  primary: {
    color: theme.colors.primary.main,
  },
  'primary.text': {
    color: theme.colors.primary.text,
  },

  secondary: {
    color: theme.colors.secondary.main,
  },
  'secondary.text': {
    color: theme.colors.secondary.text,
  },

  destructive: {
    color: theme.colors.destructive.main,
  },
  'destructive.text': {
    color: theme.colors.destructive.text,
  },

  warning: {
    color: theme.colors.notify.warning.main,
  },
  'warning.text': {
    color: theme.colors.notify.warning.text,
  },

  error: {
    color: theme.colors.notify.error.main,
  },
  'error.text': {
    color: theme.colors.notify.error.text,
  },
}));

export { useTypographyColorStyles };
