import { Container } from 'cheap-di';

import { registerDependency as registerLogger } from './utils/loggers';
import { registerDependency as registerDatabase } from './database';

function configDependencies(container: Container) {
  registerLogger(container);
  registerDatabase(container);
}

export { configDependencies };
