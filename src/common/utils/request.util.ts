import { isNumber } from 'lodash';
import { BaseListQueryDto } from 'src/base/base.dto';
import { FindOptionsWhere } from 'typeorm';

interface BaseListQueryInterface {
  limit: number;
  offset: number;
}

export const parseBaseListQuery = (query: FindOptionsWhere<BaseListQueryDto>): BaseListQueryInterface => {
  let limit = -1;
  let offset = 0;

  if ('limit' in query && isNumber(query.limit) && query.limit > 0) limit = query.limit;
  if ('page' in query) offset = query.page && query.page > 0 ? (Number(query.page) - 1) * limit : 0;

  return { limit, offset };
};
