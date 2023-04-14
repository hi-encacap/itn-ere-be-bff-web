import { IRole } from '@encacap-group/types/dist/account';
import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from '../services/role.service';

@Controller('root/roles')
export class RootRoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() body: IRole) {
    return this.roleService.create(body);
  }
}
