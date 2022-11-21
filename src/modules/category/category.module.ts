import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudflareModule } from '../cloudflare/cloudflare.module';
import { AdminCategoryController } from './controllers/admin-category.controller';
import { RootCategoryGroupController } from './controllers/root-category-group.controller';
import { CategoryGroupEntity } from './entities/category-group.entity';
import { CategoryEntity } from './entities/category.entity';
import { CategoryGroupService } from './services/category-group.service';
import { CategoryService } from './services/category-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryGroupEntity, CategoryEntity]), CloudflareModule],
  controllers: [RootCategoryGroupController, AdminCategoryController],
  providers: [CategoryGroupService, CategoryService],
})
export class CategoryModule {}
