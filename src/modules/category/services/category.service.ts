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

  async getAll(query: FindOptionsWhere<QueryCategoryListDto>) {
    let queryBuilder = this.getQueryBuilder();

    if (query.websiteId) {
      queryBuilder.andWhere('user.website_id = :websiteId', { websiteId: query.websiteId });
    }

    if (query.userId) {
      queryBuilder.andWhere('user.id = :userId', { userId: query.userId });
    }

    if (query.categoryGroupCode) {
      queryBuilder.andWhere('category_group.code = :categoryGroup', {
        categoryGroup: query.categoryGroupCode,
      });
    }

    const { orderDirection } = query;
    let { orderBy } = query;

    if (orderBy === 'categoryGroupName') {
      orderBy = 'category_group.name';
    } else {
      orderBy = 'category.' + orderBy;
    }

    queryBuilder = this.setOrder(queryBuilder, orderBy, orderDirection);
    queryBuilder = this.setPagination(queryBuilder, query);

    const [categories, items] = await queryBuilder.getManyAndCount();

    this.cloudflareImageService.mapVariantToImage(categories, 'thumbnail');

    return this.generateGetAllResponse(categories, items, query);
  }

  create(body: CreateCategoryDto, user: IUser) {
    const { code } = body;

    if (!code) {
      body.code = slugify(body.name);
    }

    return this.categoryRepository.save({
      ...body,
      userId: user.id,
    });
  }

  async update(code: string, body: UpdateCategoryBodyDto, user: IUser) {
    await this.categoryRepository.update(code, {
      ...body,
      userId: user.id,
    });

    return this.getOne({ code });
  }

  delete(code: string) {
    return this.categoryRepository.delete(code);
  }

  private getQueryBuilder() {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.user', 'user')
      .leftJoinAndSelect('category.thumbnail', 'thumbnail')
      .leftJoin(UserEntity, 'thumbnail_user', 'thumbnail_user.id = thumbnail.userId')
      .leftJoin(
        WebsiteEntity,
        'thumbnail_user_website',
        'thumbnail_user_website.id = thumbnail_user.websiteId',
      )
      .leftJoin(
        CloudflareVariantWebsiteEntity,
        'thumbnail_variant_website',
        'thumbnail_variant_website.websiteId = thumbnail_user_website.id',
      )
      .leftJoinAndMapMany(
        'thumbnail.variants',
        CloudflareVariantEntity,
        'thumbnail_variant',
        'thumbnail_variant.id = thumbnail_variant_website.variantId',
      )
      .leftJoinAndSelect('category.categoryGroup', 'category_group');
  }
}
