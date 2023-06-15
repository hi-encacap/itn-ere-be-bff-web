import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlgoliaModule } from 'src/modules/algolia/algolia.module';
import { CloudflareModule } from '../image/cloudflare.module';
import { AdminCategoryGroupController } from './controllers/admin-category-group.controller';
import { AdminCategoryPropertyController } from './controllers/admin-category-property.controller';
import { AdminCategoryController } from './controllers/admin-category.controller';
import { PublicCategoryController } from './controllers/public-category.controller';
import { RootCategoryGroupController } from './controllers/root-category-group.controller';
import { RootCategoryController } from './controllers/root-category.controller';
import { CategoryGroupWebsiteEntity } from './entities/category-group-website.entity';
import { CategoryGroupEntity } from './entities/category-group.entity';
import { CategoryPropertyEntity } from './entities/category-property.entity';
import { CategoryEntity } from './entities/category.entity';
import { CategoryGroupService } from './services/category-group.service';
import { CategoryPropertyService } from './services/category-property.service';
import { CategoryService } from './services/category.service';
import { CategoryCanDeleteValidator } from './validators/category-can-delete.validator';
import { CategoryCanModifyValidator } from './validators/category-can-modify.validator';
import { CategoryExistsValidator } from './validators/category-exists.validator';
import { CategoryPropertyExistsValidator } from './validators/category-property-exists.validator';

@Module({
  imports: [
    AlgoliaModule,
    TypeOrmModule.forFeature([
      CategoryGroupEntity,
      CategoryGroupWebsiteEntity,
      CategoryEntity,
      CategoryPropertyEntity,
    ]),
    CloudflareModule,
  ],
  controllers: [
    RootCategoryGroupController,
    AdminCategoryGroupController,
    AdminCategoryController,
    AdminCategoryPropertyController,
    PublicCategoryController,
    RootCategoryController,
  ],
  providers: [
    CategoryGroupService,
    CategoryService,
    CategoryPropertyService,
    CategoryExistsValidator,
    CategoryCanModifyValidator,
    CategoryCanDeleteValidator,
    CategoryPropertyExistsValidator,
  ],
  exports: [
    CategoryExistsValidator,
    CategoryService,
    CategoryPropertyExistsValidator,
    CategoryPropertyService,
  ],
})
export class CategoryModule {}
