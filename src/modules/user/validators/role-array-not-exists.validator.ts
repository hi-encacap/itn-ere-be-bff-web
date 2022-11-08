import { Injectable } from '@nestjs/common';
import { map } from 'bluebird';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ROLE_ENUM } from 'src/common/constants/role.constant';
import { RoleService } from '../services/role.service';

interface RoleArrayNotExistsValidatorValidationArguments extends ValidationArguments {
  constraints: ROLE_ENUM[];
}

@ValidatorConstraint({ name: 'RoleArrayNotExistsValidator', async: true })
@Injectable()
export class RoleArrayNotExistsValidator implements ValidatorConstraintInterface {
  private invalidRoleIds: number[] = [];
  private notExistsRoleIds: number[] = [];

  constructor(private readonly roleService: RoleService) {}

  async validate(roleIds: number[], args: RoleArrayNotExistsValidatorValidationArguments) {
    const validRoles = args.constraints;

    this.invalidRoleIds = [];
    this.notExistsRoleIds = [];

    await map(roleIds, async (roleId) => {
      try {
        const role = await this.roleService.findOne({ id: roleId });

        if (!validRoles.includes(role.slug as ROLE_ENUM)) {
          this.invalidRoleIds.push(roleId);
        }
      } catch (error) {
        this.notExistsRoleIds.push(roleId);
      }
    });

    return !this.invalidRoleIds.length && !this.notExistsRoleIds.length;
  }

  defaultMessage() {
    return [
      this.invalidRoleIds.join(', ') &&
        `You don't have permission to assign role(s) with id(s) ${this.invalidRoleIds.join(', ')}.`,
      this.notExistsRoleIds.join(', ') &&
        `Role(s) with id(s) ${this.notExistsRoleIds.join(', ')} does not exists.`,
    ]
      .join(' ')
      .trim();
  }
}
