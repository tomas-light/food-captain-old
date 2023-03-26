import moduleAlias from 'module-alias';
import path from 'path';
import express, { Router, RequestHandler } from 'express';
import { json, urlencoded } from 'body-parser';
import { container } from 'cheap-di';
import { MvcMiddleware } from 'mvc-middleware';
import dotenv from 'dotenv';

moduleAlias.addAliases({
  '@utils': path.join(__dirname, 'utils'),
});

import '@utils/ArrayExtensions';
import { configDependencies } from './configDependencies';
import { configureMapper } from './mapping';

dotenv.config();

configDependencies(container);
configureMapper();

const appDir = path.dirname(require.main?.filename || __dirname);
const uiBundlePath = path.join(appDir, '..', '..', 'dist');

const app = express();
app.use(json({ limit: '50mb' }) as RequestHandler);
app.use(urlencoded({ limit: '50mb', extended: true }) as RequestHandler);
app.use(express.static(uiBundlePath));

const controllersPath = path.join(__dirname, 'controllers');

new MvcMiddleware(app as any, Router as any, container)
  .registerControllers(controllersPath)
  .run();

const host = 'localhost';
const port = 5000;
app.listen(port, 'localhost',() => {
  console.log(`Server is listen http://${host}:${port}`);
});
