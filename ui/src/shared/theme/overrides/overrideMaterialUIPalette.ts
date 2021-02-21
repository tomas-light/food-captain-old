import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { ThemeColors } from '../models';

export function overrideMaterialUIPalette(colors: ThemeColors): PaletteOptions {
  return {
    primary: {
      main: colors.primary.main,
      contrastText: colors.primary.text,
    },
    secondary: {
      main: colors.secondary.main,
      contrastText: colors.secondary.text,
    },
    success: {
      main: colors.notify.success.main,
      contrastText: colors.notify.success.text,
    },
    info: {
      main: colors.notify.info.main,
      contrastText: colors.notify.info.text,
    },
    warning: {
      main: colors.notify.warning.main,
      contrastText: colors.notify.warning.text,
    },
    error: {
      main: colors.notify.error.main,
      contrastText: colors.notify.error.text,
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
  };
}
