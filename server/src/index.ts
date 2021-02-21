/*******************************************************************************
 * Copyright (c) 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 ******************************************************************************/
import moduleAlias from 'module-alias';
import path from 'path';
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { container } from 'cheap-di';
import { MvcMiddleware } from 'mvc-middleware';

moduleAlias.addAliases({
  '@utils': path.join(__dirname, 'utils'),
})

import { configDependencies } from './configDependencies';

configDependencies(container);

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const controllersPath = path.join(__dirname, 'controllers');

new MvcMiddleware(app as any, Router as any, container)
  .registerControllers(controllersPath)
  .run();

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listen http://localhost:${port}`);
});
