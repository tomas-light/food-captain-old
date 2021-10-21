import { Components } from '@shared/reexport';
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
