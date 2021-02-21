import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from '@material-ui/core';
import AdapterMoment from '@material-ui/lab/AdapterMoment';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

import { AppTheme } from '@shared/theme/AppTheme';
import { configureApp } from '@config/configureApp';
import { AppInitterContainer } from './AppInitter';
import { AppRouter } from './routing';
import { NotifierProvider } from './Notifier';

const {
  store,
  history,
} = configureApp();

const App = () => {
  const [theme] = useState(new AppTheme());

  return (
    <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <NotifierProvider>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <AppInitterContainer>
                  <AppRouter/>
                </AppInitterContainer>
              </LocalizationProvider>
            </NotifierProvider>
          </ThemeProvider>
        </ConnectedRouter>
    </Provider>
  );
};

export { App };
