import { Components } from '@material-ui/core/styles/components';

export function overrideDialog(): Components {
  return {
    MuiDialog: {
      styleOverrides: {
        paperWidthSm: {
          width: 600,
        },
      },
    },
  };
}
