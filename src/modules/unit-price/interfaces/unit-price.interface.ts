import { UNIT_PRICE_TYPE_ENUM } from '@encacap-group/common/dist/re';

export interface IUnitPrice {
  id: number;
  name: string;
  type: UNIT_PRICE_TYPE_ENUM;
}
