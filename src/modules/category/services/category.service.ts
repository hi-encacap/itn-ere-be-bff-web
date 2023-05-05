import { IREUser, slugify } from '@encacap-group/types/dist/re';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pick } from 'lodash';
import { BaseService } from 'src/base/base.service';
import { AlgoliaCategoryService } from 'src/modules/algolia/services/algolia-category.service';
import { CloudflareImageService } from 'src/modules/cloudflare/services/cloudflare-image.service';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CategoryCreateBodyDto } from '../dtos/category-create-body.dto';
import { CategoryListQueryDto } from '../dtos/category-list-query.dto';
import { CategoryUpdateBodyDto } from '../dtos/category-update-body.dto';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryService extends BaseService {
  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly cloudflareImageService: CloudflareImageService,
    private readonly algoliaService: AlgoliaCategoryService,
  ) {
    super();
  }

  async get(query: FindOptionsWhere<CategoryEntity>) {
    const record = await this.getQueryBuilder().where(query).getOne();

    if (!record) {
      throw new NotFoundException('CATEGORY_NOT_FOUND');
    }

    return record;
  }

  async getAll(query: CategoryListQueryDto) {
    let queryBuilder = this.getQueryBuilder();

    if (query.websiteId) {
      queryBuilder.andWhere('website.id = :websiteId', { websiteId: query.websiteId });
    }

    if (query.categoryGroupCodes) {
      queryBuilder.andWhere('categoryGroup.code IN (:...categoryGroup)', {
        categoryGroup: query.categoryGroupCodes,
      });
    }

    const { orderDirection } = query;
    let { orderBy } = query;

    if (orderBy === 'categoryGroupName') {
      orderBy = 'categoryGroup.name';
    } else {
      orderBy = `category.${orderBy ?? 'createdAt'}`;
    }

    queryBuilder.orderBy(orderBy, orderDirection);
    queryBuilder = this.setPagination(queryBuilder, query);
    queryBuilder = await this.setAlgoliaSearch(
      queryBuilder,
      query,
      this.algoliaService.search.bind(this.algoliaService),
      'category.code',
    );

    const [categories, items] = await queryBuilder.getManyAndCount();

    await this.cloudflareImageService.mapVariantToImage(categories, 'thumbnail');

    return this.generateGetAllResponse(categories, items, query);
  }

  async create(body: CategoryCreateBodyDto, user: IREUser) {
    const { code } = body;

    if (!code) {
      body.code = slugify(body.name);
    }

    const record = await this.categoryRepository.save({
      ...body,
      websiteId: user.websiteId,
    });
    const category = await this.get({ code: record.code });

    this.algoliaService.save({
      objectID: category.code,
      name: category.name,
      categoryGroupName: category.categoryGroup.name,
    });

    return category;
  }

  async update(id: number, body: CategoryUpdateBodyDto) {
    await this.categoryRepository.update({ id }, pick(body, ['name', 'categoryGroupId', 'thumbnailId']));

    const category = await this.get({ id });

    this.algoliaService.update({
      objectID: String(category.id),
      name: category.name,
      categoryGroupName: category.categoryGroup.name,
    });

    return category;
  }

  delete(id: number) {
    this.algoliaService.remove(String(id));
    return this.categoryRepository.delete({ id });
  }

  private getQueryBuilder() {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.thumbnail', 'thumbnail')
      .leftJoinAndMapOne('category.website', WebsiteEntity, 'website', 'website.id = category.websiteId')
      .leftJoinAndSelect('category.categoryGroup', 'categoryGroup');
  }
}
