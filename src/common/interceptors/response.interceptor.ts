import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface IResponse<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const { meta, items = [] } = data;
        const baseResponseBody = {
          message: 'Success',
          code: 0,
          data,
          error: null,
        };

        if (!meta) {
          return baseResponseBody;
        }

        return {
          ...baseResponseBody,
          data: items,
          meta,
        };
      }),
    );
  }
}
