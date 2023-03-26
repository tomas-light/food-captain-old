import { Button as UiButton } from 'baseui/button';
import { ProgressBar } from 'baseui/progress-bar';
import { PropsWithChildren } from 'react';

import { ButtonState } from '../ButtonState';
import { ButtonWrapper, ButtonWrapperProps } from './ButtonWrapper';

type Props = PropsWithChildren<
	ButtonWrapperProps & {
		state?: ButtonState;
		onClick?: () => void;
	}
>;

const Button = (props: Props) => {
	const { state = {}, title, disabled, ...rest } = props;

	const _disabled = state.loading || state.disabled || state.pristine || disabled;

	return (
		<ButtonWrapper title={title} disabled={_disabled}>
			<UiButton disabled={_disabled} {...rest} />

			{state.loading && <ProgressBar />}
		</ButtonWrapper>
	);
};

export { Button };
