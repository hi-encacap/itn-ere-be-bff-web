import { MEM_CACHING_KEY_ENUM } from '@constants/caching.constant';
import { CATEGORY_GROUP_ENUM, ESTATE_STATUS_ENUM, IREUser, slugify } from '@encacap-group/common/dist/re';
import { CategoryService } from '@modules/category/services/category.service';
import { ImageService } from '@modules/image/services/image.service';
import { ShopifyService } from '@modules/shopify/services/shopify.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemCachingService } from '@providers/mem-caching/mem-caching.service';
import { omit } from 'lodash';
import { BaseService } from 'src/base/base.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PostCreateBodyDto } from '../dtos/post-create-body.dto';
import { PostListQueryDto } from '../dtos/post-list-query.dto';
import { PostUpdateBodyDto } from '../dtos/post-update-body.dto';
import { PostEntity } from '../entities/post.entity';

@Injectable()
export class PostService extends BaseService {
  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
    private readonly imageService: ImageService,
    private readonly categoryService: CategoryService,
    private readonly cacheService: MemCachingService,
    private readonly shopifyService: ShopifyService,
  ) {
    super();
  }

  async create(body: PostCreateBodyDto, user?: IREUser) {
    let { code } = body;

    if (!code) {
      code = slugify(body.title);
    }

    const post = this.postRepository.create({
      ...omit(body, 'status'),
      websiteId: user.websiteId,
      code,
    });

    await this.clearCache(user.websiteId);

    return this.postRepository.save(post);
  }

  async get(query: FindOptionsWhere<PostEntity>) {
    // TODO: UPDATE.
    if (Number(query.id) > 99999) {
      return this.shopifyService.getProductById(String(query.id)) as Promise<PostEntity>;
    }

    const data = await this.queryBuilder.where(query).getOne();

    if (data) {
      await this.imageService.mapVariantToImage(data, 'avatar');
    }

    return data;
  }

  async getAll(query: PostListQueryDto) {
    const queryBuilder = this.queryBuilder;

    if (query.websiteId) {
      this.setFilter(queryBuilder, query.websiteId, 'post.websiteId');
    }

    if (query.categoryId) {
      const category = await this.categoryService.getOrFail({ id: query.categoryId });
      const { left, right } = category;

      queryBuilder.andWhere('category.left > :left', { left });
      queryBuilder.andWhere('category.right < :right', { right });
    }

    if (query.categoryCode) {
      const category = await this.categoryService.get({ code: query.categoryCode });

      if (category && category.categoryGroupCode === CATEGORY_GROUP_ENUM.PRODUCT) {
        return this.shopifyService.getProducts(category);
      }

      if (category) {
        const { left, right } = category;

        queryBuilder.andWhere('category.left >= :left', { left });
        queryBuilder.andWhere('category.right <= :right', { right });
      } else {
        queryBuilder.andWhere('post.categoryId IS NULL');
      }
    }

    if (query.status) {
      this.setFilter(queryBuilder, query.status, 'post.status');
    }

    if (query.statuses) {
      this.setInFilter(queryBuilder, query.statuses, 'post.status');
    }

    if (query.codes) {
      this.setInFilter(queryBuilder, query.codes, 'post.code');
    }

    this.setPagination(queryBuilder, query);

    const [data, total] = await queryBuilder.getManyAndCount();

    if (this.isExpand(query, 'category.parent')) {
      await Promise.all(data.map((item) => this.categoryService.mapParentToCategory(item.category)));
    }

    await this.imageService.mapVariantToImage(data, 'avatar');

    return this.generateGetAllResponse(data, total, query);
  }

  getRandom(query: PostListQueryDto) {
    return this.getAll({
      ...query,
      orderBy: 'RANDOM()',
    });
  }

  async unPublish(query: FindOptionsWhere<PostEntity>) {
    const record = await this.get(query);

    await this.clearCache(record.websiteId);

    return this.postRepository.update(query, { status: ESTATE_STATUS_ENUM.UNPUBLISHED });
  }

  async publish(query: FindOptionsWhere<PostEntity>) {
    const record = await this.get(query);

    await this.clearCache(record.websiteId);

    return this.postRepository.update(query, { status: ESTATE_STATUS_ENUM.PUBLISHED });
  }

  upTopById(id: number) {
    return this.postRepository.update(id, { updatedAt: new Date() });
  }

  async updateById(id: number, body: PostUpdateBodyDto) {
    const record = await this.get({ id });

    await this.clearCache(record.websiteId);

    return this.postRepository.update(id, body);
  }

  async delete(query: FindOptionsWhere<PostEntity>) {
    const record = await this.get(query);

    await this.clearCache(record.websiteId);

    return this.postRepository.softDelete(query);
  }

  private get queryBuilder() {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.avatar', 'avatar')
      .leftJoinAndSelect('post.category', 'category')
      .orderBy('post.upvotedAt', 'DESC');
  }

  private clearCache(websiteId?: number) {
    return this.cacheService.clearCacheByPattern(MEM_CACHING_KEY_ENUM.POST, websiteId);
  }
}
