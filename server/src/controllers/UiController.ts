/*******************************************************************************
 * Copyright (c) 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 ******************************************************************************/
import { ControllerBase } from './base';

class UiController extends ControllerBase {
  static get = {
    '/': nameof<UiController>(o => o.index),
  };

  async index() {
    return this.ok('Server works OK');
  }
}

export default UiController;
