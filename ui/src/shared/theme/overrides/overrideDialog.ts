import { Components } from '@shared/reexport';

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
