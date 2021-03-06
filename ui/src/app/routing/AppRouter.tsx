import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Layout } from '../Layout';
import { MenuPageContainer } from '../menu';
import { EditMenuPageContainer } from '../menu/EditMenuPage';
import { appUrls } from './appUrls';

const AppRouter = () => (
  <Layout>
    <Switch>
      <Route
        path={appUrls.menuDetails}
        component={EditMenuPageContainer}
      />

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
