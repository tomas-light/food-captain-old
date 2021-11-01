import React, { ReactElement } from 'react';
import { Tooltip, TooltipProps } from '~shared/atoms';

// import { Spinner } from '~shared/molecules/Spinner';
import { ButtonState } from '../ButtonState';

type Props = Partial<TooltipProps> & {
	icon: ReactElement;
	state?: ButtonState;
	onClick?: () => void;
};

const IconButton = (props: Props) => {
	const { icon, state = {}, title } = props;

	// const IconButtonBaseComponent = (
	// 	<MuiIconButton disabled={state.loading || state.disabled || state.pristine} ref={ref} classes={restClasses}>
	// 		<Spinner visible={state.loading} />
	// 		{icon}
	// 	</MuiIconButton>
	// );
	const IconButtonBaseComponent = null;

	if (title) {
		if (state.disabled) {
			return (
				<Tooltip title={title}>
					<span>{IconButtonBaseComponent}</span>
				</Tooltip>
			);
		}

		return <Tooltip title={title}>{IconButtonBaseComponent}</Tooltip>;
	}

	return IconButtonBaseComponent;
};

export { IconButton };
