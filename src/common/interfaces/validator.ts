import { ValidationArguments } from 'class-validator';
import { EXIST_VALIDATOR_TYPE } from '../constants/validator.constant';

export interface ExistsConstraintValidationArguments extends ValidationArguments {
  constraints: [EXIST_VALIDATOR_TYPE];
}
