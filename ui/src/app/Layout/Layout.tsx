import { useStyletron } from 'baseui';
import { FC } from 'react';
import { Notifier } from '~Notifier/Notifier';
import { Navbar } from './Navbar';

const Layout: FC = ({ children }) => {
	const [css, theme] = useStyletron();

	return (
		<div
			className={css({
				backgroundColor: theme.colors.background,
				height: '100vh',
				position: 'relative',
				display: 'grid',
				gridTemplateRows: 'auto 1fr',
			})}
		>
			<Navbar />

			<main
				className={css({
					height: '100%',
					overflow: 'auto',
					padding: '16px',
					boxSizing: 'border-box',
				})}
			>
				{/*<Breadcrumbs>
					<StyledLink href="#parent">Parent Page</StyledLink>
					<StyledLink href="#sub">Sub-Parent Page</StyledLink>
					<span>Current Page</span>
				</Breadcrumbs>*/}

				{children}
			</main>

			<Notifier />
		</div>
	);
};

export { Layout };
