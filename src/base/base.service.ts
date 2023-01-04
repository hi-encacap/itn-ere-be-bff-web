import { get } from 'lodash';
import { parseBaseListQuery } from 'src/common/utils/request.util';
import { IAlgoliaSearchFunction } from 'src/modules/algolia/interfaces/algolia.interface';
import { FindOptionsWhere, SelectQueryBuilder } from 'typeorm';
import { ORDER_DIRECTION_ENUM } from './base.constant';
import { BaseListQueryDto } from './base.dto';

export class BaseService {
  setPagination<T = unknown>(
    queryBuilder: SelectQueryBuilder<T>,
    query: FindOptionsWhere<BaseListQueryDto>,
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
    if (!fields.length || !values?.length) {
      values = [null];
    }

    fields.forEach((field) => {
      queryBuilder.andWhere(`${field} IN (:...${field})`, { [field]: values });
    });

    return queryBuilder;
  }

  setSorting<T = unknown>(
    queryBuilder: SelectQueryBuilder<T>,
    query: FindOptionsWhere<BaseListQueryDto>,
    tableAlias: string,
  ): SelectQueryBuilder<T> {
    const { orderBy = 'createdAt', orderDirection = ORDER_DIRECTION_ENUM.DESC } = query;

    if (orderBy) {
      queryBuilder.orderBy(`${tableAlias}.${orderBy}`, orderDirection as ORDER_DIRECTION_ENUM);
    }

    return queryBuilder;
  }

  setFilter<T = unknown>(
    queryBuilder: SelectQueryBuilder<T>,
    query: FindOptionsWhere<BaseListQueryDto | unknown>,
    tableAlias: string,
    key: string,
    ...fields: string[]
  ) {
    let newQueryBuilder = queryBuilder;
    const value = get(query, key, null);
    const newFields = fields;

    if (!fields.length) {
      newFields.push(key);
    }

    fields.forEach((field) => {
      if (Array.isArray(value)) {
        newQueryBuilder = this.setInOperator(queryBuilder, value, `${tableAlias}.${field}`);
      } else if (value) {
        newQueryBuilder.andWhere(`${tableAlias}.${field} = :${field}`, { [field]: value });
      }
    });

    return queryBuilder;
  }

  async setAlgoliaSearch<T = unknown>(
    queryBuilder: SelectQueryBuilder<T>,
    query: FindOptionsWhere<BaseListQueryDto>,
    searchSynonyms: IAlgoliaSearchFunction,
    ...columns: string[]
  ) {
    if (query.searchValue) {
      const { hits } = await searchSynonyms(query.searchValue as string, [query.searchBy as string]);
      const matchedIdentities = hits.map((item) => item.objectID);

      return this.setInOperator(queryBuilder, matchedIdentities, ...columns);
    }

    return queryBuilder;
  }

  generateGetAllResponse<T = unknown>(
    items: T[],
    totalItems: number,
    query: FindOptionsWhere<BaseListQueryDto> = {},
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

  async getManyAndCount<T = unknown>(
    queryBuilder: SelectQueryBuilder<T>,
    query?: FindOptionsWhere<BaseListQueryDto>,
  ) {
    const [items, totalItems] = await queryBuilder.getManyAndCount();

    return this.generateGetAllResponse(items, totalItems, query);
  }
}
