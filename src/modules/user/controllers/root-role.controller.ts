import { Body, Controller, Post } from '@nestjs/common';
import { RoleEntity } from '../entities/role.entity';
import { RoleService } from '../services/role.service';

@Controller('root/roles')
export class RootRoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() body: RoleEntity) {
    return this.roleService.create(body);
  }
}
