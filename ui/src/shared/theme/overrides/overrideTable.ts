import { Components } from '@material-ui/core/styles/components';

export function overrideTable(): Components {
  return {
    MuiTableCell: {
      styleOverrides: {
        root: {
          boxSizing: 'border-box',
          padding: '0 12px',
        },
      },
    },
  };
}
