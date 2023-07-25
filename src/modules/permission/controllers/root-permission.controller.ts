import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { RootAuthGuard } from '@guards/root-auth.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PermissionListQueryDto } from '../dtos/permission-list-query.dto';
import { PermissionService } from '../services/permission.service';

@UseGuards(JwtAuthGuard, RootAuthGuard)
@Controller('root/permissions')
export class RootPermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  getAllPermissions(@Query() query: PermissionListQueryDto) {
    return this.permissionService.getAll(query);
  }
}
