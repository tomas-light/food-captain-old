import { Components } from '@material-ui/core/styles/components';

export function overrideTooltip(): Components {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 12,
        },
      },
    },
  };
}
