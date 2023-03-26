import React, { useEffect } from 'react';

interface Props {
	loadMenu: () => void;
}

const MenuPage = (props: Props) => {
	const { loadMenu } = props;

	useEffect(() => {
		loadMenu();
	}, []);

	return null;
};

export type { Props };
export { MenuPage };
