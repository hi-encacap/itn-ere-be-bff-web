import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryGroupListQueryDto } from '../dto/category-group-list-query.dto';
import { CategoryGroupWebsiteEntity } from '../entities/category-group-website.entity';
import { CategoryGroupEntity } from '../entities/category-group.entity';

@Injectable()
export class CategoryGroupService {
  constructor(
    @InjectRepository(CategoryGroupEntity)
    private readonly categoryGroupRepository: Repository<CategoryGroupEntity>,
  ) {}

  getGroups(query?: CategoryGroupListQueryDto) {
    const queryBuilder = this.categoryGroupRepository
      .createQueryBuilder('categoryGroup')
      .leftJoinAndSelect('categoryGroup.user', 'user');

    if (query.websiteId) {
      queryBuilder
        .leftJoin(
          CategoryGroupWebsiteEntity,
          'categoryGroupWebsite',
          'categoryGroupWebsite.categoryGroupCode = categoryGroup.code',
        )
        .andWhere('categoryGroupWebsite.websiteId = :websiteId', { websiteId: query.websiteId });
    }

    return queryBuilder.getMany();
  }
}
