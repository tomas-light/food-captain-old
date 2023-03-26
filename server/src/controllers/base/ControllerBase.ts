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
