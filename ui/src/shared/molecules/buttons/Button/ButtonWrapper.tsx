import React, { FC } from 'react';

import { Tooltip } from '@shared/reexport';

interface ButtonWrapperProps {
	className?: string;
	title?: string;
	disabled?: boolean;
}

type Props = ButtonWrapperProps;

const ButtonWrapper: FC<Props> = (props) => {
	const { className, title, disabled, children } = props;

	if (title && disabled) {
		return (
			<Tooltip title={title}>
				<span className={className}>{children}</span>
			</Tooltip>
		);
	}

	return <div className={className}>{children}</div>;
};

export { ButtonWrapper };
