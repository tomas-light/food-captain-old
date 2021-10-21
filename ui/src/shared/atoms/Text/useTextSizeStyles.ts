import { makeStyles } from '@shared/theme';
import { TextSizeVariant } from './TextSizeVariant';

const useTextSizeStyles = makeStyles<TextSizeVariant>({
	'50': {
		fontSize: 10,
		letterSpacing: '0.03333em',
		lineHeight: '14px',
	},
	'100': {
		fontSize: 12,
		lineHeight: '16px',
	},
	'175': {
		fontSize: 13.5,
		lineHeight: '18px',
	},
	'200': {
		fontSize: 14,
		letterSpacing: '0.01071em',
		lineHeight: '20px',
	},
	'300': {
		fontSize: 16,
		letterSpacing: '0.00938em',
		lineHeight: '22px',
	},
	'400': {
		fontSize: 18,
		letterSpacing: '0em',
		lineHeight: '32px',
	},
	'700': {
		fontSize: 24,
		letterSpacing: '-0.00833em',
		lineHeight: '34px',
	},
	'1200': {
		fontSize: 34,
		lineHeight: '48px',
	},
});

export { useTextSizeStyles };
