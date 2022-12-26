import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CategoryPropertyListQueryDto } from '../dto/category-property-list-query.dto';
import { CategoryPropertyUpdateBodyDto } from '../dto/category-property-update-body.dto';
import { CategoryPropertyEntity } from '../entities/category-property.entity';
import { CategoryService } from './category.service';

@Injectable()
export class CategoryPropertyService extends BaseService {
  constructor(
    @InjectRepository(CategoryPropertyEntity)
    private readonly categoryPropertyRepository: Repository<CategoryPropertyEntity>,
    private readonly categoryService: CategoryService,
  ) {
    super();
  }

  get(query: FindOptionsWhere<CategoryPropertyEntity>) {
    let queryBuilder = this.queryBuilder;

    queryBuilder = this.setFilter(queryBuilder, query, 'category', 'websiteId');
    queryBuilder = this.setFilter(queryBuilder, query, 'categoryProperty', 'id');

    return queryBuilder.getOne();
  }

  getAll(query: CategoryPropertyListQueryDto) {
    let queryBuilder = this.queryBuilder;

    queryBuilder = this.setFilter(queryBuilder, query, 'categoryProperty', 'name');
    queryBuilder = this.setFilter(queryBuilder, query, 'categoryProperty', 'categoryId');
    queryBuilder = this.setInOperator(queryBuilder, query.categoryIds, 'category.id');
    queryBuilder = this.setPagination(queryBuilder, query);

    return this.getManyAndCount(queryBuilder);
  }

  async create(body: CategoryPropertyListQueryDto) {
    const category = await this.categoryService.getOne({
      id: body.categoryId,
      websiteId: body.websiteId,
    });

    return this.categoryPropertyRepository.save({
      ...body,
      categoryId: category.id,
    });
  }

  async update(id: number, body: CategoryPropertyUpdateBodyDto) {
    const categoryProperty = await this.get({ id });

    return this.categoryPropertyRepository.save({
      ...categoryProperty,
      ...body,
    });
  }

  delete(id: number) {
    return this.categoryPropertyRepository.delete({ id });
  }

  private get queryBuilder() {
    return this.categoryPropertyRepository
      .createQueryBuilder('categoryProperty')
      .leftJoinAndSelect('categoryProperty.category', 'category');
  }
}
