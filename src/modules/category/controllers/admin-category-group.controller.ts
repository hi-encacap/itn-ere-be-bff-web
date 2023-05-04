import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from 'src/common/guards/admin-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CategoryGroupService } from '../services/category-group.service';

@UseGuards(JwtAuthGuard, AdminAuthGuard)
@Controller('admin/category-groups')
export class AdminCategoryGroupController {
  constructor(private readonly categoryGroupService: CategoryGroupService) {}

  @Get()
  getAll(@Request() { user }) {
    return this.categoryGroupService.getGroups({ websiteId: user.websiteId });
  }
}
