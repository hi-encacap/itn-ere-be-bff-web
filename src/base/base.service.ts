import { parseBaseListQuery } from 'src/common/utils/request.util';
import { FindOptionsWhere, SelectQueryBuilder } from 'typeorm';
import { BaseQueryListParamsDto } from './base.dto';

export class BaseService {
  setPagination<T = unknown>(
    queryBuilder: SelectQueryBuilder<T>,
    query: FindOptionsWhere<BaseQueryListParamsDto>,
  ): SelectQueryBuilder<T> {
    const { limit, offset } = parseBaseListQuery(query);
    queryBuilder.skip(offset);
    if (limit > 0) queryBuilder.take(limit);

    return queryBuilder;
  }

  setInOperator<T = unknown>(
    queryBuilder: SelectQueryBuilder<T>,
    values: unknown[],
    ...fields: string[]
  ): SelectQueryBuilder<T> {
    const fieldValues = values.length > 0 ? values : [null];
    fields.forEach((field) => {
      queryBuilder.andWhere(`${field} IN (:...${field})`, { [field]: fieldValues });
    });

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
        totalRows: totalItems,
        page: Number(page),
        limit: Number(limit),
        totalPages,
      },
    };
  }
}
