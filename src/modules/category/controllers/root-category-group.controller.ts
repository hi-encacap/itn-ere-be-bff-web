import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RootAuthGuard } from 'src/common/guards/root-auth.guard';
import { CategoryGroupService } from '../services/category-group.service';

@Controller('root/category-groups')
@UseGuards(JwtAuthGuard, RootAuthGuard)
export class RootCategoryGroupController {
  constructor(private readonly categoryGroupService: CategoryGroupService) {}

  @Get()
  getGroups() {
    return this.categoryGroupService.getGroups();
  }
}
