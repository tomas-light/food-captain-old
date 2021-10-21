import React, { ComponentType, forwardRef, ForwardRefRenderFunction, Ref } from 'react';
import {
	Button as MuiButton,
	ButtonClassKey as MuiButtonClassKey,
	ButtonProps as MuiButtonProps,
	CircularProgress,
	StyledComponentProps,
} from '@shared/reexport';
import { withStyles } from '@shared/theme';

import { ButtonState } from '../ButtonState';
import { ButtonWrapper } from './ButtonWrapper';

type ClassKey = MuiButtonClassKey | 'wrapper' | 'progress';

type Props = MuiButtonProps &
	StyledComponentProps<ClassKey> & {
		state?: ButtonState;
	};

const Button: ForwardRefRenderFunction<any, Props> = (props: Props, ref: Ref<any>) => {
	const { state = {}, classes: { wrapper, progress, ...buttonClasses } = {}, title, disabled, ...rest } = props;

	const _disabled = state.loading || state.disabled || state.pristine || disabled;

	return (
		<ButtonWrapper className={wrapper} title={title} disabled={_disabled}>
			<MuiButton ref={ref} classes={buttonClasses} disabled={_disabled} {...rest} />

			{state.loading && <CircularProgress size={24} thickness={4} className={progress} />}
		</ButtonWrapper>
	);
};

const componentWithRef: ComponentType<Props> = forwardRef(Button);
const componentWithStyles = withStyles<ClassKey>({
	wrapper: {
		position: 'relative',
	},
	progress: {
		color: 'rgba(0, 0, 0, 0.5)',
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},

	root: {},
	text: {},
	textPrimary: {},
	textSecondary: {},
	outlined: {},
	outlinedPrimary: {},
	outlinedSecondary: {},
	contained: {},
	containedPrimary: {},
	containedSecondary: {},
	disableElevation: {},
	focusVisible: {},
	disabled: {},
	colorInherit: {},
	textSizeSmall: {},
	textSizeLarge: {},
	outlinedSizeSmall: {},
	outlinedSizeLarge: {},
	containedSizeSmall: {},
	containedSizeLarge: {},
	sizeSmall: {},
	sizeLarge: {},
	fullWidth: {},
	startIcon: {},
	endIcon: {},
	iconSizeSmall: {},
	iconSizeMedium: {},
	iconSizeLarge: {},
	containedInherit: {},
	containedSizeMedium: {},
	outlinedInherit: {},
	outlinedSizeMedium: {},
	sizeMedium: {},
	textInherit: {},
	textSizeMedium: {},
})(componentWithRef);

export { componentWithStyles as Button };
