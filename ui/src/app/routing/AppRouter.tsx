import { HistoryProvider } from '@utils';
import { container } from 'cheap-di';
import { useEffect, useRef } from 'react';
import { Route, Switch, BrowserRouter as Router, useHistory } from 'react-router-dom';

import { Layout } from '../Layout';
import { MenuPageContainer, EditMenuPageContainer } from '../menu';
import { appUrls } from './appUrls';

const AppRouter = () => (
	<Router>
		<HistoryRegistrator />

		<Layout>
			<Switch>
				<Route path={appUrls.menuDetails} component={EditMenuPageContainer} />

				<Route path={appUrls.menu} component={MenuPageContainer} />

				<Route path={appUrls.root} component={() => <div>Root page</div>} />
			</Switch>
		</Layout>
	</Router>
);

const HistoryRegistrator = () => {
	let history = useHistory();

	const historyRef = useRef<HistoryProvider>({ get: () => history });
	historyRef.current.get = () => history;

	useEffect(() => {
		container.registerInstance(historyRef.current).as(HistoryProvider);
	}, []);

	return null;
};

export { AppRouter };
