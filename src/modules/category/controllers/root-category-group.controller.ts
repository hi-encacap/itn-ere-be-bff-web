import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RootGuard } from 'src/common/guards/root.guard';
import { CategoryGroupService } from '../services/category-group.service';

@Controller('root/category-groups')
@UseGuards(JwtAuthGuard, RootGuard)
export class RootCategoryGroupController {
  constructor(private readonly categoryGroupService: CategoryGroupService) {}

  @Get()
  async getGroups() {
    return this.categoryGroupService.getGroups();
  }
}
