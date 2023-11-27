import { camelCase, get } from 'lodash';
import { parseBaseListQuery } from 'src/common/utils/request.util';
import { IAlgoliaSearchFunction } from 'src/modules/algolia/interfaces/algolia.interface';
import { FindOptionsWhere, SelectQueryBuilder } from 'typeorm';
import { ORDER_DIRECTION_ENUM } from './base.constant';
import { BaseListQueryDto } from './base.dto';

export class BaseService {
  setPagination<T = unknown>(
    queryBuilder: SelectQueryBuilder<T>,
    query: FindOptionsWhere<Omit<BaseListQueryDto, 'expands'>>,
  ): SelectQueryBuilder<T> {
    const { limit, offset } = parseBaseListQuery(query);
    queryBuilder.skip(offset);
    if (limit > 0) queryBuilder.take(limit);

    return queryBuilder;
  }

  setInFilter<T = unknown>(
    queryBuilder: SelectQueryBuilder<T>,
    values: unknown[],
    ...fields: string[]
  ): SelectQueryBuilder<T> {
    if (!fields.length || !values?.length) {
      return queryBuilder;
    }

    fields.forEach((field) => {
      queryBuilder.andWhere(`${field} IN (:...${field})`, { [field]: values });
    });

    return queryBuilder;
  }

  setSort<T = unknown>(
    queryBuilder: SelectQueryBuilder<T>,
    query: FindOptionsWhere<Omit<BaseListQueryDto, 'expands'>>,
    tableAlias: string,
    defaultOrderBy = 'updatedAt',
  ): SelectQueryBuilder<T> {
    const { orderBy = defaultOrderBy, orderDirection = ORDER_DIRECTION_ENUM.DESC } = query;

    if (orderBy) {
      queryBuilder.orderBy(`${tableAlias}.${orderBy}`, orderDirection as ORDER_DIRECTION_ENUM);
    }

    return queryBuilder;
  }

  setFilterOld<T = unknown>(
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
        newQueryBuilder = this.setInFilter(queryBuilder, value, `${tableAlias}.${field}`);
      } else if (value) {
        newQueryBuilder.andWhere(`${tableAlias}.${field} = :${field}`, { [field]: value });
      }
    });

    return queryBuilder;
  }

  setFilter<T = unknown>(queryBuilder: SelectQueryBuilder<T>, value: unknown, ...fields: string[]) {
    let newQueryBuilder = queryBuilder;

    if (!fields.length) {
      return queryBuilder;
    }

    fields.forEach((field) => {
      if (Array.isArray(value)) {
        newQueryBuilder = this.setInFilter(queryBuilder, value, field);
      } else if (value) {
        newQueryBuilder.andWhere(`${field} = :${field}`, { [field]: value });
      }
    });

    return queryBuilder;
  }

  async setAlgoliaSearch<T = unknown>(
    queryBuilder: SelectQueryBuilder<T>,
    query: FindOptionsWhere<Omit<BaseListQueryDto, 'expands'>>,
    searchSynonyms: IAlgoliaSearchFunction,
    ...columns: string[]
  ) {
    if (query.searchValue) {
      const { hits } = await searchSynonyms(query.searchValue as string, [query.searchBy as string]);
      const matchedIdentities = hits.length ? hits.map((item) => item.objectID) : [null];

      return this.setInFilter(queryBuilder, matchedIdentities, ...columns);
    }

    return queryBuilder;
  }

  generateGetAllResponse<T = unknown>(
    items: T[],
    totalItems: number,
    query: FindOptionsWhere<Omit<BaseListQueryDto, 'expands'>> = {},
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
    query?: FindOptionsWhere<BaseListQueryDto> | BaseListQueryDto,
  ) {
    const [items, totalItems] = await queryBuilder.getManyAndCount();

    return this.generateGetAllResponse(items, totalItems, query);
  }

  isExpand(query: BaseListQueryDto | FindOptionsWhere<unknown>, key: string) {
    const expands = get(query, 'expands', null);

    if (!expands) {
      return false;
    }

    return expands.includes(key);
  }

  /**
   * @description Deep convert object keys to camelCase.
   */
  normalizeObjectKeys<T = unknown>(object: T): T {
    if (typeof object !== 'object' || !object) {
      return object;
    }

    if (Array.isArray(object)) {
      return object.map((item) => this.normalizeObjectKeys(item)) as unknown as T;
    }

    const newObject = {};

    Object.keys(object).forEach((key) => {
      const newKey = camelCase(key);

      newObject[newKey] = this.normalizeObjectKeys(object[key]);
    });

    return newObject as T;
  }
}
