import { ESTATE_STATUS_ENUM, IREUser, slugify } from '@encacap-group/common/dist/re';
import { CategoryService } from '@modules/category/services/category.service';
import { ImageService } from '@modules/image/services/image.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {
    super();
  }

  create(body: PostCreateBodyDto, user?: IREUser) {
    let { code } = body;

    if (!code) {
      code = slugify(body.title);
    }

    const post = this.postRepository.create({
      ...omit(body, 'status'),
      websiteId: user.websiteId,
      code,
    });

    return this.postRepository.save(post);
  }

  async get(query: FindOptionsWhere<PostEntity>) {
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
      const { left, right } = category;

      queryBuilder.andWhere('category.left >= :left', { left });
      queryBuilder.andWhere('category.right <= :right', { right });
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

    if (this.isExpanding(query, 'category.parent')) {
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

  unPublish(query: FindOptionsWhere<PostEntity>) {
    return this.postRepository.update(query, { status: ESTATE_STATUS_ENUM.UNPUBLISHED });
  }

  publish(query: FindOptionsWhere<PostEntity>) {
    return this.postRepository.update(query, { status: ESTATE_STATUS_ENUM.PUBLISHED });
  }

  upTopById(id: number) {
    return this.postRepository.update(id, { updatedAt: new Date() });
  }

  updateById(id: number, body: PostUpdateBodyDto) {
    return this.postRepository.update(id, body);
  }

  delete(query: FindOptionsWhere<PostEntity>) {
    return this.postRepository.softDelete(query);
  }

  private get queryBuilder() {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.avatar', 'avatar')
      .leftJoinAndSelect('post.category', 'category')
      .orderBy('post.upvotedAt', 'DESC');
  }
}
