import { Injectable } from '@nestjs/common';
import { parseBaseListQuery } from 'src/common/utils/request';
import { FindOperator, FindOptionsWhere, SelectQueryBuilder } from 'typeorm';
import { ORDER_DIRECTION_ENUM } from './base.constant';
import { BaseQueryListParamsDto } from './base.dto';

@Injectable()
export class BaseService {
  setOrder<T = unknown>(
    queryBuilder: SelectQueryBuilder<T>,
    orderBy: string,
    orderDirection:
      | FindOperator<ORDER_DIRECTION_ENUM.ASC>
      | FindOperator<ORDER_DIRECTION_ENUM.DESC>
      | ORDER_DIRECTION_ENUM = ORDER_DIRECTION_ENUM.ASC,
  ): SelectQueryBuilder<T> {
    if (!orderBy) {
      orderBy = 'createdAt';
    }

    return queryBuilder.orderBy(orderBy as string, orderDirection as ORDER_DIRECTION_ENUM);
  }

  setPagination<T = unknown>(
    queryBuilder: SelectQueryBuilder<T>,
    query: FindOptionsWhere<BaseQueryListParamsDto>,
  ): SelectQueryBuilder<T> {
    const { limit, offset } = parseBaseListQuery(query);
    queryBuilder.skip(offset);
    if (limit > 0) queryBuilder.take(limit);

    return queryBuilder;
  }

  generateGetAllResponse<T = unknown>(
    items: T[],
    totalItems: number,
    query: FindOptionsWhere<BaseQueryListParamsDto>,
  ) {
    const { page = 1, limit = 0 } = query;
    const totalPages = Math.ceil(totalItems / Number(limit));

    return {
      items,
      meta: {
        total: totalItems,
        page: Number(page),
        limit: Number(limit),
        totalPages,
      },
    };
  }
}
