import { Components } from '@shared/reexport';
import { ThemeColors } from '../models';

export function overrideInput(colors: ThemeColors): Components {
	return {
		MuiInputBase: {
			styleOverrides: {
				root: {
					color: colors.text.strong,
					'&$focused': {
						color: colors.primary.main,
					},
					'&$disabled': {
						color: colors.text.disabled,
					},
				},
			},
		},

		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'&$disabled': {
						color: colors.text.disabled,
					},

					'&$disabled $notchedOutline': {
						borderColor: colors.border.disabled,
					},
				},
				notchedOutline: {
					borderColor: colors.border.main,
				},
			},
		},
	};
}
