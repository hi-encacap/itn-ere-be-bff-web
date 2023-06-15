import { ESTATE_STATUS_ENUM, IREUser } from '@encacap-group/common/dist/re';
import { ImageService } from '@modules/image/services/image.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PostDraftCreateBodyDto } from '../dtos/post-draft-create-body.dto';
import { PostListQueryDto } from '../dtos/post-list-query.dto';
import { PostDraftEntity } from '../entities/post-draft.entity';
import { PostEntity } from '../entities/post.entity';

@Injectable()
export class PostDraftService extends BaseService {
  constructor(
    @InjectRepository(PostDraftEntity) private readonly postDraftRepository: Repository<PostDraftEntity>,
    private readonly imageService: ImageService,
  ) {
    super();
  }

  async getAll(query: PostListQueryDto) {
    const queryBuilder = this.queryBuilder;

    if (query.websiteId) {
      this.setFilter(queryBuilder, query.websiteId, 'post.websiteId');
    }

    const [posts, total] = await queryBuilder.getManyAndCount();
    const parsedPosts = await Promise.all(
      posts.map((post) =>
        this.mapRecordRelation({
          ...post,
          ...JSON.parse(post.data),
          id: post.id,
          status: ESTATE_STATUS_ENUM.DRAFT,
        }),
      ),
    );

    return this.generateGetAllResponse(parsedPosts, total, query);
  }

  async get(query: FindOptionsWhere<PostDraftEntity>) {
    const post = await this.postDraftRepository.findOneBy(query);

    if (!post) {
      throw new NotFoundException();
    }

    const parsedPost = await this.mapRecordRelation({
      ...post,
      ...JSON.parse(post.data),
      id: post.id,
    });

    return parsedPost;
  }

  create(body: PostDraftCreateBodyDto, user: IREUser) {
    return this.postDraftRepository.save({
      userId: user.id,
      websiteId: user.websiteId,
      data: JSON.stringify(body),
    });
  }

  async updateById(query: FindOptionsWhere<PostDraftEntity>, body: PostDraftCreateBodyDto) {
    const post = await this.get(query);

    return this.postDraftRepository.save({
      ...post,
      data: JSON.stringify(body),
    });
  }

  async delete(query: FindOptionsWhere<PostDraftEntity>) {
    const post = await this.get(query);

    return this.postDraftRepository.delete(post.id);
  }

  private async mapRecordRelation(record: PostEntity) {
    const { avatarId } = record;

    if (avatarId) {
      record.avatar = await this.imageService.get(avatarId);
    }

    return record;
  }

  private get queryBuilder() {
    return this.postDraftRepository.createQueryBuilder('post');
  }
}
