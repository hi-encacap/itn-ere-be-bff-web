import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryCategoryGroupListDto } from '../dto/query-category-group-list.dto';
import { CategoryGroupWebsiteEntity } from '../entities/category-group-website.entity';
import { CategoryGroupEntity } from '../entities/category-group.entity';

@Injectable()
export class CategoryGroupService {
  constructor(
    @InjectRepository(CategoryGroupEntity)
    private readonly categoryGroupRepository: Repository<CategoryGroupEntity>,
  ) {}

  getGroups(query?: QueryCategoryGroupListDto) {
    const queryBuilder = this.categoryGroupRepository
      .createQueryBuilder('category_group')
      .leftJoinAndSelect('category_group.user', 'user');

    if (query.websiteId) {
      queryBuilder
        .leftJoin(
          CategoryGroupWebsiteEntity,
          'category_group_website',
          'category_group_website.category_group_code = category_group.code',
        )
        .andWhere('category_group_website.website_id = :websiteId', { websiteId: query.websiteId });
    }

    return queryBuilder.getMany();
  }
}
