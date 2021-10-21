import { Components } from '@shared/reexport';
import { ThemeColors } from '../models';

export function overrideRadio(colors: ThemeColors): Components {
	return {
		MuiRadio: {
			styleOverrides: {
				root: {
					padding: 8,
				},
				colorPrimary: {
					'&$checked': {
						color: colors.primary.main,
					},
				},
				colorSecondary: {
					'&$checked': {
						color: colors.secondary.main,
					},
				},
			},
		},
	};
}
