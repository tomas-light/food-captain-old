import { useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';

import { AppTheme } from '@shared/theme/AppTheme';
import { configureApp } from '@config/configureApp';
import { AppInitterContainer } from './AppInitter';
import { AppRouter } from './routing';
import { NotifierProvider } from './Notifier';

const store = configureApp();

const App = () => {
  const [theme] = useState(new AppTheme());

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NotifierProvider>
          <AppInitterContainer>
            <AppRouter/>
          </AppInitterContainer>
        </NotifierProvider>
      </ThemeProvider>
    </Provider>
  );
};

export { App };
