import { useTranslation } from 'react-i18next';
import { Typography } from '@shared/atoms/Typography';
import { makeStyles } from '@shared/theme';
import { MenuButtonsContainer } from './MenuButtons';

const useStyles = makeStyles({
	container: {
		padding: '8px 12px',
		display: 'grid',
		gridTemplateAreas: '"title . buttons"',
		gridTemplateColumns: 'auto 1fr auto',
		alignItems: 'center',
		width: '100%',
	},
	title: {
		gridArea: 'title',
	},
	buttons: {
		gridArea: 'buttons',
	},
});

const TableTitle = () => {
	const classes = useStyles();

	const { t } = useTranslation();

	return (
		<div className={classes.container}>
			<Typography color="strong" size="300" className={classes.title}>
				{t('Menu')}
			</Typography>

			<div className={classes.buttons}>
				<MenuButtonsContainer />
			</div>
		</div>
	);
};


export { TableTitle };
