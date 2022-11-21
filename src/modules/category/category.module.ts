import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RootCategoryGroupController } from './controllers/root-category-group.controller';
import { CategoryGroupEntity } from './entities/category-group.entity';
import { CategoryGroupService } from './services/category-group.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryGroupEntity])],
  controllers: [RootCategoryGroupController],
  providers: [CategoryGroupService],
})
export class CategoryModule {}
