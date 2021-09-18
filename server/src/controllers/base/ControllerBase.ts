/*******************************************************************************
 * Copyright (c) 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 ******************************************************************************/
import { Request, Response } from 'express';
import { MvcController } from 'mvc-middleware';
import { Logger } from '@utils/loggers';
import { metadata } from '@utils/metadata';

@metadata
export class ControllerBase extends MvcController {
  constructor(protected readonly logger: Logger, request: Request, response: Response) {
    super(request, response);

    if (new.target === ControllerBase) {
      throw new TypeError('Cannot construct ControllerBase instances directly');
    }

    const message = `${request.method.toUpperCase()}: ${request.url}`;
    this.logger.info(message);
  }
}
