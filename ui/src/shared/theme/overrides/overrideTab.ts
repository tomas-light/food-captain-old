import { Components } from '@material-ui/core/styles/components';
import { ThemeColors } from '@shared/theme/models';

export function overrideTab(colors: ThemeColors): Components {
  return {
    MuiTabs: {
      styleOverrides: {
        root: {
          filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))',
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surface,
          '@media (min-width: 600px)': {
            minWidth: 100,
          },
          maxWidth: 200,
        },

        textColorInherit: {
          opacity: 1,
        },

        labelIcon: {
          minHeight: 76,
          paddingTop: 4,
          paddingBottom: 4,
        },

        wrapper: {
          display: 'grid',
          justifyItems: 'center',
          gridRowGap: 4,
          textTransform: 'none',
        },
      },
    },
  };
}
