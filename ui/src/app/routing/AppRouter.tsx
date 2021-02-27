import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Layout } from '../Layout';
import { MenuPageContainer } from '../MenuPage';
import { appUrls } from './appUrls';

const AppRouter = () => (
  <Layout>
    <Switch>
      <Route
        path={appUrls.menu}
        component={MenuPageContainer}
      />

      <Route
        path={appUrls.root}
        component={() => (
          <div>
            Root page
          </div>
        )}
      />
    </Switch>
  </Layout>
);

export { AppRouter };
