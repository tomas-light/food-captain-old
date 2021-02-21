import { Components } from '@material-ui/core/styles/components';
import { ThemeColors } from '../models';

export function overrideMenu(colors: ThemeColors): Components {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: colors.text.strong,
          padding: '0 12px',
          display: 'grid',
          gridAutoFlow: 'column',
          gridGap: 8,
          height: 54,

          '& > svg': {
            color: colors.text.medium,
          },
        },
      },
    },
  };
}
