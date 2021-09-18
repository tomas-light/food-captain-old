import {
  Pool,
  Submittable,
  QueryArrayConfig,
  QueryArrayResult,
  QueryResultRow,
  QueryConfig,
  QueryResult
} from 'pg';

import { Logger } from '@utils/loggers';

export class Query {
  constructor(
    private readonly logger: Logger,
    private readonly pool: Pool
  ) {
  }

  protected query<T extends Submittable>(queryStream: T): T;

  // @ts-ignore
  protected query<R extends any[] = any[], I extends any[] = any[]>(
    queryConfig: QueryArrayConfig<I>,
    values?: I,
  ): Promise<QueryArrayResult<R>>;

  protected query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryConfig: QueryConfig<I>,
  ): Promise<QueryResult<R>>;

  protected query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryTextOrConfig: string | QueryConfig<I>,
    values?: I,
  ): Promise<QueryResult<R>>;

  protected query<R extends any[] = any[], I extends any[] = any[]>(
    queryConfig: QueryArrayConfig<I>,
    callback: (err: Error, result: QueryArrayResult<R>) => void,
  ): void;

  protected query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryTextOrConfig: string | QueryConfig<I>,
    callback: (err: Error, result: QueryResult<R>) => void,
  ): void;

  protected query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryText: string,
    values: I,
    callback: (err: Error, result: QueryResult<R>) => void,
  ): void;

  protected async query(arg1, arg2?, arg3?) {
    try {
      // await this.pool.connect();
      const queryResult = await this.pool.query(arg1, arg2, arg3);
      // await this.pool.end();

      return queryResult;
    }
    catch (error: any) {
      this.logger.error(error);

      this.logger.debug(arg1);

      if (arg2) {
        this.logger.debug(arg2);
      }

      if (arg3) {
        this.logger.debug(arg3);
      }
    }

    return undefined;
  }
}
