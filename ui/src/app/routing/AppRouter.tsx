import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Layout } from '../Layout';
import { appUrls } from './appUrls';

const AppRouter = () => (
  <Layout>
    <Switch>
      <Route
        path={appUrls.rootPath}
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
