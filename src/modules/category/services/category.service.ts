import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { slugify } from 'src/common/utils/helpers.util';
import { AlgoliaCategoryService } from 'src/modules/algolia/services/algolia-category.service';
import { CloudflareVariantWebsiteEntity } from 'src/modules/cloudflare/entities/cloudflare-variant-website.entity';
import { CloudflareVariantEntity } from 'src/modules/cloudflare/entities/cloudflare-variant.entity';
import { CloudflareImageService } from 'src/modules/cloudflare/services/cloudflare-image.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CategoryCreateBodyDto } from '../dtos/category-create-body.dto';
import { CategoryListQueryDto } from '../dtos/category-list-query.dto';
import { CategoryUpdateBodyDto } from '../dtos/category-update-body.dto';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryService extends BaseService {
  constructor(
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
    private readonly cloudflareImageService: CloudflareImageService,
    private readonly algoliaService: AlgoliaCategoryService,
  ) {
    super();
  }

  async getOne(query: FindOptionsWhere<CategoryEntity>) {
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

    this.cloudflareImageService.mapVariantToImage(categories, 'thumbnail');

    return this.generateGetAllResponse(categories, items, query);
  }

  async create(body: CategoryCreateBodyDto, user: IUser) {
    const { code } = body;

    if (!code) {
      body.code = slugify(body.name);
    }

    const record = await this.categoryRepository.save({
      ...body,
      websiteId: user.websiteId,
    });
    const category = await this.getOne({ code: record.code });

    this.algoliaService.save({
      objectID: category.code,
      name: category.name,
      categoryGroupName: category.categoryGroup.name,
    });

    return category;
  }

  async update(code: string, body: CategoryUpdateBodyDto) {
    await this.categoryRepository.update(code, body);

    const category = await this.getOne({ code });

    this.algoliaService.update({
      objectID: category.code,
      name: category.name,
      categoryGroupName: category.categoryGroup.name,
    });

    return category;
  }

  delete(code: string) {
    this.algoliaService.remove(code);
    return this.categoryRepository.delete(code);
  }

  private getQueryBuilder() {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.thumbnail', 'thumbnail')
      .leftJoinAndMapOne('category.website', WebsiteEntity, 'website', 'website.id = category.websiteId')
      .leftJoin(UserEntity, 'thumbnailUser', 'thumbnailUser.id = thumbnail.userId')
      .leftJoin(WebsiteEntity, 'thumbnailUserWebsite', 'thumbnailUserWebsite.id = thumbnailUser.websiteId')
      .leftJoin(
        CloudflareVariantWebsiteEntity,
        'thumbnailVariantWebsite',
        'thumbnailVariantWebsite.websiteId = thumbnailUserWebsite.id',
      )
      .leftJoinAndMapMany(
        'thumbnail.variants',
        CloudflareVariantEntity,
        'thumbnailVariant',
        'thumbnailVariant.code = thumbnailVariantWebsite.variantCode',
      )
      .leftJoinAndSelect('category.categoryGroup', 'categoryGroup');
  }
}
