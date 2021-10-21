import React, { FC, useEffect, useRef, useState } from 'react';
import { StyledComponentProps, createStyles } from '@shared/reexport';
import { withStyles } from '@shared/theme';

type EndAdornmentClassKey = 'root';

const styles = createStyles({
	root: {
		position: 'absolute',
		right: 8,
		display: 'block',
		margin: 0,
		boxSizing: 'border-box',
		zIndex: 1,
	},
});

type Props = StyledComponentProps<EndAdornmentClassKey>;

const EndAdornment: FC<Props> = (props) => {
	const { classes, children } = props;

	const ref = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState<number>(0);

	useEffect(() => {
		if (!ref || !ref.current) {
			return;
		}
		const typographyHeight = ref.current.offsetHeight;
		setHeight(typographyHeight);
	}, [ref, ref.current]);

	return (
		<div
			ref={ref}
			className={classes.root}
			style={{
				top: `calc(50% - ${height / 2}px)`,
			}}
		>
			{children}
		</div>
	);
};

const componentWithStyles = withStyles<EndAdornmentClassKey>(styles, { name: 'EndAdornment' })(EndAdornment);

export { componentWithStyles as EndAdornment };
export type { EndAdornmentClassKey };
