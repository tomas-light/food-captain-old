import { Container } from 'cheap-di';
import DishController from './controllers/DishController';
import MenuController from './controllers/MenuController';
import ScheduleController from './controllers/ScheduleController';
import UiController from './controllers/UiController';
import UserController from './controllers/UserController';
import {
  DishService,
  ImageService,
  MenuService,
  ScheduleService,
  UserService,
} from './services';

import { registerDependency as registerLogger } from './utils/loggers';
import { registerDependency as registerDatabase } from './database';

function configDependencies(container: Container) {
  registerLogger(container);
  // registerDatabase(container);
  registerControllers(container);
  registerServices(container);
}

function registerControllers(container: Container) {
  container.registerType(DishController);
  container.registerType(MenuController);
  container.registerType(ScheduleController);
  container.registerType(UiController);
  container.registerType(UserController);
}

function registerServices(container: Container) {
  container.registerType(DishService);
  container.registerType(ImageService);
  container.registerType(MenuService);
  container.registerType(ScheduleService);
  container.registerType(UserService);
}

export { configDependencies };
