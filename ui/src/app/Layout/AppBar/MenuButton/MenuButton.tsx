import { IconButton, StyledComponentProps, ChevronLeftIcon, MenuIcon } from '@shared/reexport';
import { withStyles } from '@shared/theme';

interface IMenuButtonProps {
	open: boolean;
}

interface IMenuButtonCallProps {
	toggle: () => void;
}

type Props = IMenuButtonProps & IMenuButtonCallProps & StyledComponentProps<MenuButtonClassKey>;

const MenuButton = (props: Props) => {
	const { classes, open, toggle } = props;

	return (
		<IconButton color="inherit" aria-label="open drawer" onClick={toggle} className={classes.root}>
			{open ? <ChevronLeftIcon /> : <MenuIcon />}
		</IconButton>
	);
};

type MenuButtonClassKey = 'root';

const componentWithStyles = withStyles<MenuButtonClassKey>(
	(theme) => ({
		root: {
			padding: 6,
		},
	}),
	{ name: 'MenuButton' }
)(MenuButton);
export { componentWithStyles as MenuButton };
