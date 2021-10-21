import React, { FC } from 'react';

import { makeStyles } from '@shared/theme';
import { NotifierContainer } from '@Notifier';
import { AppBar } from './AppBar';
import { DrawerContainer } from './Drawer';

const useStyles = makeStyles((theme) => ({
	layout: {
		backgroundColor: theme.colors.background,
		height: '100vh',
		position: 'relative',
		display: 'grid',

		gridTemplateAreas: `
      "drawer navbar"
      "drawer content"
    `,
		gridTemplateColumns: 'auto 1fr',
		gridTemplateRows: 'auto 1fr',
	},
	navbar: {
		gridArea: 'navbar',
	},
	drawer: {
		gridArea: 'drawer',
	},
	content: {
		gridArea: 'content',
	},
}));

const Layout: FC = ({ children }) => {
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);
	const toggle = () => setOpen((isOpen) => !isOpen);

	return (
		<div className={classes.layout}>
			<AppBar
				className={classes.navbar}
				// title={title}
				// name={name}
				open={open}
				toggle={toggle}
			/>

			<DrawerContainer className={classes.drawer} open={open} onClose={() => setOpen(false)} />

			<main className={classes.content}>{children}</main>

			<NotifierContainer />
		</div>
	);
};

export { Layout };
