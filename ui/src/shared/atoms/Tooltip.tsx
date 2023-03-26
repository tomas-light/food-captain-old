import { StatefulTooltip } from 'baseui/tooltip';
import { FC } from 'react';

type Props = {
	title: string;
};

const Tooltip: FC<Props> = (props) => {
	const { title, children } = props;

	return <StatefulTooltip content={<p>{title}</p>}>{children}</StatefulTooltip>;
};

export { Tooltip };
export type { Props as TooltipProps };
