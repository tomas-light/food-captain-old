/*******************************************************************************
 * Copyright (c) 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 ******************************************************************************/
import path from 'path';
import { ControllerBase } from './base';

class UiController extends ControllerBase {
  static get = {
    '/': nameof<UiController>(o => o.index),
    '/schedule': nameof<UiController>(o => o.index),
    '/menu': nameof<UiController>(o => o.index),
    '/menu/:id': nameof<UiController>(o => o.index),
    '/dish': nameof<UiController>(o => o.index),
    '/user': nameof<UiController>(o => o.index),
  };

  getViewPath(viewName: string) {
    const appDir = path.dirname(require.main?.filename || __dirname);
    const htmlPath = path.join(appDir, '..', '..', 'dist');
    return path.join(htmlPath, `${viewName}.html`);
  }

  async index() {
    return this.view('index');
  }
}

export default UiController;
