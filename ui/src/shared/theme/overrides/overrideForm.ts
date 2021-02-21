import { Components } from '@material-ui/core/styles/components';
import { ThemeColors } from '../models';

export function overrideForm(colors: ThemeColors): Components {
  return {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginBottom: 0,
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: colors.text.medium,
          '&$disabled': {
            color: colors.text.disabled,
          },
        },
      },
    },
  };
}
