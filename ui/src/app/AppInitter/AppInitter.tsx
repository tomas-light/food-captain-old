import React, { PropsWithChildren, ReactElement, useState } from 'react';

// import { SpinnerBlock } from '~shared/molecules';

type Props = PropsWithChildren<{
	initialized: boolean;
	initialize: () => void;
}>;

const AppInitter = (props: Props) => {
	const { initialized, initialize, children } = props;

	useState(() => {
		initialize();
	});

	if (!initialized) {
		// return <SpinnerBlock visible />;
		return 'Loading...' as unknown as ReactElement;
	}

	return children as ReactElement;
};

export { AppInitter };
export type { Props as AppInitterProps };
