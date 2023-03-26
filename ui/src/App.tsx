import { BaseProvider, LightTheme } from 'baseui';
import { Provider } from 'react-redux';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { AppInitterContainer } from './app/AppInitter';
import { AppRouter } from './app/routing';
import { configureApp } from './config/configureApp';

const store = configureApp();

const engine = new Styletron();

const App = () => {
	return (
		<Provider store={store}>
			<StyletronProvider value={engine}>
				<BaseProvider theme={LightTheme}>
					<AppInitterContainer>
						<AppRouter />
					</AppInitterContainer>
				</BaseProvider>
			</StyletronProvider>
		</Provider>
	);
};

export { App };
