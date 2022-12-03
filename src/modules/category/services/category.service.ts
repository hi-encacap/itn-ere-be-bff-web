import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { slugify } from 'src/common/utils/helpers.util';
import { CloudflareVariantWebsiteEntity } from 'src/modules/cloudflare/entities/cloudflare-variant-website.entity';
import { CloudflareVariantEntity } from 'src/modules/cloudflare/entities/cloudflare-variant.entity';
import { CloudflareImageService } from 'src/modules/cloudflare/services/cloudflare-image.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { IUser } from 'src/modules/user/interfaces/user.interface';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { AlgoliaService } from 'src/providers/algolia/algolia.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { QueryCategoryListDto } from '../dto/query-category-list.dto';
import { UpdateCategoryBodyDto } from '../dto/update-category-body.dto';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryService extends BaseService {
  constructor(
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
    private readonly cloudflareImageService: CloudflareImageService,
    private readonly algoliaService: AlgoliaService,
  ) {
    super();
  }

  async getOne(query: FindOptionsWhere<CategoryEntity>) {
    const queryBuilder = this.getQueryBuilder();

    if (query.code) {
      queryBuilder.andWhere('category.code = :code', { code: query.code });
    }

    if (query.websiteId) {
      queryBuilder.andWhere('user.website_id = :websiteId', { websiteId: query.websiteId });
    }

    const record = await queryBuilder.getOne();

    if (!record) {
      throw new NotFoundException('CATEGORY_NOT_FOUND');
    }

    return record;
  }

  async getAll(query: QueryCategoryListDto) {
    let queryBuilder = this.getQueryBuilder();

    if (query.websiteId) {
      queryBuilder.andWhere('user.website_id = :websiteId', { websiteId: query.websiteId });
    }

    if (query.userId) {
      queryBuilder.andWhere('user.id = :userId', { userId: query.userId });
    }

    if (query.categoryGroupCodes) {
      queryBuilder.andWhere('category_group.code IN (:...categoryGroup)', {
        categoryGroup: query.categoryGroupCodes,
      });
    }

    const { orderDirection } = query;
    let { orderBy } = query;

    if (orderBy === 'categoryGroupName') {
      orderBy = 'category_group.name';
    } else {
      orderBy = `category.${orderBy ?? 'created_at'}`;
    }

    queryBuilder.orderBy(orderBy, orderDirection);
    queryBuilder = this.setPagination(queryBuilder, query);

    if (query.searchValue) {
      const { hits: matchedCategories } = await this.algoliaService.searchCategories(query.searchValue, [
        query.searchBy,
      ]);
      const matchedCategoryCodes = matchedCategories.map((category) => category.objectID);

      queryBuilder = this.setInOperator(queryBuilder, matchedCategoryCodes, 'category.code');
    }

    const [categories, items] = await queryBuilder.getManyAndCount();

    this.cloudflareImageService.mapVariantToImage(categories, 'thumbnail');

    return this.generateGetAllResponse(categories, items, query);
  }

  async create(body: CreateCategoryDto, user: IUser) {
    const { code } = body;

    if (!code) {
      body.code = slugify(body.name);
    }

    const record = await this.categoryRepository.save({
      ...body,
      userId: user.id,
    });
    const category = await this.getOne({ code: record.code });

    this.algoliaService.addCategory({
      objectID: category.code,
      name: category.name,
      categoryGroupName: category.categoryGroup.name,
    });

    return category;
  }

  async update(code: string, body: UpdateCategoryBodyDto, user: IUser) {
    await this.categoryRepository.update(code, {
      ...body,
      userId: user.id,
    });

    const category = await this.getOne({ code });

    this.algoliaService.updateCategory({
      objectID: category.code,
      name: category.name,
      categoryGroupName: category.categoryGroup.name,
    });

    return category;
  }

  delete(code: string) {
    this.algoliaService.removeCategory(code);
    return this.categoryRepository.delete(code);
  }

  private getQueryBuilder() {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.user', 'user')
      .leftJoinAndSelect('category.thumbnail', 'thumbnail')
      .leftJoin(UserEntity, 'thumbnail_user', 'thumbnail_user.id = thumbnail.user_id')
      .leftJoin(
        WebsiteEntity,
        'thumbnail_user_website',
        'thumbnail_user_website.id = thumbnail_user.website_id',
      )
      .leftJoin(
        CloudflareVariantWebsiteEntity,
        'thumbnail_variant_website',
        'thumbnail_variant_website.website_id = thumbnail_user_website.id',
      )
      .leftJoinAndMapMany(
        'thumbnail.variants',
        CloudflareVariantEntity,
        'thumbnail_variant',
        'thumbnail_variant.id = thumbnail_variant_website.variant_id',
      )
      .leftJoinAndSelect('category.category_group', 'category_group');
  }
}
