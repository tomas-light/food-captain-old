/*******************************************************************************
 * Copyright (c) 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 ******************************************************************************/
class Logger {
  constructor() {
    if (new.target === Logger) {
      throw new TypeError('Cannot construct Logger instances directly');
    }
  }

  log(message: string, eventKind: 'debug' | 'info' | 'warning' | 'error'): void {
    throw new Error('Not implemented');
  }

  debug(message: string): void {
    throw new Error('Not implemented');
  }

  info(message: string): void {
    throw new Error('Not implemented');
  }

  warning(message: string): void {
    throw new Error('Not implemented');
  }

  error(message: string): void {
    throw new Error('Not implemented');
  }
}

export { Logger };
