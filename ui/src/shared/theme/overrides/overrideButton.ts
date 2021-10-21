import { Components } from '@shared/reexport';
import { ThemeColors } from '../models';

export function overrideButton(colors: ThemeColors): Components {
	return {
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: 14,
					lineHeight: '20px',
				},

				containedPrimary: {
					backgroundColor: colors.primary.main,
					color: colors.primary.text,

					'&:hover': {
						backgroundColor: colors.primary.hover,
					},

					'&$disabled': {
						backgroundColor: colors.primary.disabled.main,
						color: colors.primary.disabled.text,
					},
				},
				containedSecondary: {
					backgroundColor: colors.secondary.main,
					color: colors.secondary.text,

					'&:hover': {
						backgroundColor: colors.secondary.hover,
					},
				},

				outlined: {
					'&$disabled': {
						borderWidth: 2,
					},
				},
				outlinedPrimary: {
					borderColor: colors.border.primary,
					borderWidth: 2,
					color: colors.primary.main,

					'&:hover': {
						backgroundColor: colors.primary.outline.hover,
						borderWidth: 2,
					},
				},
				outlinedSecondary: {
					borderColor: colors.border.secondary,
					borderWidth: 2,
					color: colors.secondary.main,

					'&:hover': {
						backgroundColor: colors.secondary.outline.hover,
						borderWidth: 2,
					},
				},

				textPrimary: {
					color: colors.primary.main,

					'&:hover': {
						backgroundColor: colors.primary.outline.hover,
					},
				},
				textSecondary: {
					color: colors.secondary.main,

					'&:hover': {
						backgroundColor: colors.secondary.outline.hover,
					},
				},
			},
		},

		MuiIconButton: {
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
