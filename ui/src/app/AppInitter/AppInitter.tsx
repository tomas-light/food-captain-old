import React, { PropsWithChildren, ReactElement, useState } from 'react';

// import { SpinnerBlock } from '~shared/molecules';

type Props = PropsWithChildren<{
	initialized: boolean;
	initialize: () => void;
}>;

const AppInitter = (props: Props): ReactElement => {
	const { initialized, initialize, children } = props;

	useState(() => {
		initialize();
	});

	if (!initialized) {
		// return <SpinnerBlock visible />;
		return 'Loading...' as any;
	}

	return children as any;
};

export { AppInitter };
export type { Props as AppInitterProps };
