import { container } from 'cheap-di';
import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

import { HistoryProvider } from '~utils';
import { AddDishPage } from '../dish/AddDishPage';
import { DishDetailsPage } from '../dish/DishDetailsPage';
// import { MenuPageContainer, EditMenuPageContainer } from '../menu';
import { DishPage } from '../dish/DishPage';
import { EditDishPage } from '../dish/EditDishPage';
import { AddIngredientPage } from '../ingredient/AddIngredientPage';
import { EditIngredientPage } from '../ingredient/EditIngredientPage';

import { IngredientPage } from '../ingredient/IngredientPage';
import { Layout } from '../Layout';

import { appUrls } from './appUrls';

const AppRouter = () => (
	<Router>
		<HistoryRegistrator />

		<Layout>
			<Switch>
				{/*<Route path={appUrls.menuDetails} component={EditMenuPageContainer} />*/}
				{/*<Route path={appUrls.menu} component={MenuPageContainer} />*/}

				<Route path={appUrls.addDish} component={AddDishPage} />
				<Route path={appUrls.editDish} component={EditDishPage} />
				<Route path={appUrls.dishDetails} component={DishDetailsPage} />
				<Route path={appUrls.dish} component={DishPage} />

				<Route path={appUrls.addIngredient} component={AddIngredientPage} />
				<Route path={appUrls.editIngredient} component={EditIngredientPage} />
				<Route path={appUrls.ingredient} component={IngredientPage} />

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
