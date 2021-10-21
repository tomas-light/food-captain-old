import { SnackbarProvider } from 'notistack';
import React, { FC } from 'react';
import { makeStyles } from '@shared/theme';

const useStyles = makeStyles((theme) => ({
	variantSuccess: {
		backgroundColor: theme.colors.notify.success.main,
		color: theme.colors.notify.success.text,
	},
	variantInfo: {
		backgroundColor: theme.colors.notify.info.main,
		color: theme.colors.notify.info.text,
	},
	variantWarning: {
		backgroundColor: theme.colors.notify.warning.main,
		color: theme.colors.notify.warning.text,
	},
	variantError: {
		backgroundColor: theme.colors.notify.error.main,
		color: theme.colors.notify.error.text,
	},
}));

const NotifierProvider: FC = ({ children }) => {
	const classes = useStyles();

	const notistackRef = React.createRef<SnackbarProvider>();

	return (
		<SnackbarProvider
			maxSnack={5}
			autoHideDuration={5000}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			classes={classes}
			ref={notistackRef}
		>
			{children}
		</SnackbarProvider>
	);
};

export { NotifierProvider };
