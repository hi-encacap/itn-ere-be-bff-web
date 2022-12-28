import { ESTATE_QUARTER_ENUM } from '../constants/estate-quarter.constant';

export interface IEstateQuarter {
  code: ESTATE_QUARTER_ENUM;
  name: string;
  order: number;
}
