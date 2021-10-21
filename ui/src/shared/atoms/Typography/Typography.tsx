import React, { ElementType, FC, HtmlHTMLAttributes } from 'react';
import { Tooltip } from '@shared/reexport';

import { TextSizeVariant } from '../Text';
import { TypographyClassNameBuilder } from './TypographyClassNameBuilder';
import { TypographyColorVariant } from './TypographyColorVariant';

type Props = HtmlHTMLAttributes<HTMLParagraphElement> & {
	size?: TextSizeVariant;
	color?: TypographyColorVariant;
	bold?: boolean;
	disabled?: boolean;
	noWrap?: boolean;
	tooltip?: string;
	component?: ElementType;
};

const Typography: FC<Props> = (props) => {
	const {
		size = '200',
		color = 'medium',
		disabled = false,
		noWrap = false,
		bold = false,
		className,
		tooltip,
		component,
		...rest
	} = props;

	const classNameBuilder = new TypographyClassNameBuilder(className);
	const typographyClassName: string = classNameBuilder
		.appendColor(disabled, color)
		.appendSize(size)
		.appendNoWrap(noWrap)
		.appendBold(bold)
		.build();

	const Component = component || 'span';
	const Rendered = <Component className={typographyClassName} {...rest} />;

	if (tooltip) {
		return (
			<Tooltip title={tooltip} enterDelay={1000}>
				{Rendered}
			</Tooltip>
		);
	}

	return Rendered;
};

export { Typography };
export type { Props as TypographyProps };
