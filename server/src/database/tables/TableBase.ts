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

export class TableBase<TEntity> {
  constructor(
    private readonly logger: Logger,
    private readonly pool: Pool
  ) {
  }

  query<T extends Submittable>(queryStream: T): T;
  // @ts-ignore
  query<R extends any[] = any[], I extends any[] = any[]>(
    queryConfig: QueryArrayConfig<I>,
    values?: I,
  ): Promise<QueryArrayResult<R>>;
  query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryConfig: QueryConfig<I>,
  ): Promise<QueryResult<R>>;
  query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryTextOrConfig: string | QueryConfig<I>,
    values?: I,
  ): Promise<QueryResult<R>>;
  query<R extends any[] = any[], I extends any[] = any[]>(
    queryConfig: QueryArrayConfig<I>,
    callback: (err: Error, result: QueryArrayResult<R>) => void,
  ): void;
  query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryTextOrConfig: string | QueryConfig<I>,
    callback: (err: Error, result: QueryResult<R>) => void,
  ): void;
  query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryText: string,
    values: I,
    callback: (err: Error, result: QueryResult<R>) => void,
  ): void;

  async query(arg1, arg2?, arg3?) {
    try {
      // await this.pool.connect();
      const queryResult = await this.pool.query(arg1, arg2, arg3);
      // await this.pool.end();

      return queryResult;
    }
    catch (error) {
      this.logger.error(error);
    }

    return undefined;
  }
}
