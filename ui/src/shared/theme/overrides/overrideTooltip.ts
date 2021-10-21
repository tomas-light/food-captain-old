import { Components } from '@shared/reexport';

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
