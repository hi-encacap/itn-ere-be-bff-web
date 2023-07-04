import { MEM_CACHING_KEY_ENUM } from '@constants/caching.constant';
import { CONFIG_TYPE_ENUM, IREUser, IWebsiteConfig } from '@encacap-group/common/dist/re';
import { ImageService } from '@modules/image/services/image.service';
import { PostService } from '@modules/post/services/post.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemCachingService } from '@providers/mem-caching/mem-caching.service';
import { set } from 'lodash';
import { BaseService } from 'src/base/base.service';
import { FindOptionsWhere, In, QueryRunner, Repository } from 'typeorm';
import { ConfigCreateBodyDto } from '../dtos/config-create-body.dto';
import { ConfigUpdateBodyDto } from '../dtos/config-update-body.dto';
import { WebsiteConfigListQueryDto } from '../dtos/website-config-list-query.dto';
import { WebsiteConfigEntity } from '../entities/website-config,entity';

@Injectable()
export class WebsiteConfigService extends BaseService {
  constructor(
    @InjectRepository(WebsiteConfigEntity)
    private readonly websiteConfigRepository: Repository<WebsiteConfigEntity>,
    private readonly cacheService: MemCachingService,
    private readonly imageService: ImageService,
    private readonly postService: PostService,
  ) {
    super();
  }

  async getAll(query: WebsiteConfigListQueryDto) {
    let queryBuilder = this.queryBuilder;

    if (query.websiteId) {
      queryBuilder = this.setFilterOld(queryBuilder, query, 'websiteConfig', 'websiteId');
    }

    if (query.codes) {
      this.setInFilter(queryBuilder, query.codes, 'websiteConfig.code');
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    const normalizedData = await Promise.all(data.map((item) => this.normalizeData(item as IWebsiteConfig)));

    return this.generateGetAllResponse(normalizedData, total, query);
  }

  async get(query: FindOptionsWhere<WebsiteConfigEntity>, throwError = true) {
    const data = await this.websiteConfigRepository.findOneBy(query);

    if (!data && throwError) {
      throw new NotFoundException();
    }

    if (!data) {
      return null;
    }

    return this.normalizeData(data as IWebsiteConfig);
  }

  async update(query: FindOptionsWhere<WebsiteConfigEntity>, data: ConfigUpdateBodyDto, user?: IREUser) {
    const record = await this.get(query, false);

    this.clearCache(record.websiteId);

    if (!record && user) {
      return this.create(
        {
          ...data,
          code: query.code,
        } as Required<ConfigUpdateBodyDto>,
        user,
      );
    }

    return this.websiteConfigRepository.update(record.id, data);
  }

  create(data: ConfigCreateBodyDto, user: IREUser) {
    return this.websiteConfigRepository.save({
      ...data,
      websiteId: user.websiteId,
      userId: user.id,
    });
  }

  /**
   * @description Bulk update configs, using `transaction` to ensure data integrity.
   */
  async bulkUpdate(data: ConfigUpdateBodyDto[], user: IREUser) {
    const queryRunner = this.websiteConfigRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await Promise.all(
        data.map((item) =>
          this.createOrUpdateRunner(
            {
              ...item,
              websiteId: user.websiteId,
            },
            queryRunner,
          ),
        ),
      );

      await queryRunner.commitTransaction();

      this.clearCache(user.websiteId);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error);
    } finally {
      await queryRunner.release();
    }
  }

  private get queryBuilder() {
    return this.websiteConfigRepository.createQueryBuilder('websiteConfig');
  }

  private async createOrUpdateRunner(data: ConfigUpdateBodyDto, runner: QueryRunner) {
    const { code, websiteId } = data;

    const record = await runner.manager.findOneBy(WebsiteConfigEntity, { code });

    if (!record) {
      return runner.manager.save(WebsiteConfigEntity, data);
    }

    return runner.manager.update(WebsiteConfigEntity, { code, websiteId }, data);
  }

  private async normalizeData(data: IWebsiteConfig) {
    const { type, value } = data;

    if (type === CONFIG_TYPE_ENUM.IMAGE_ARRAY) {
      const imageIds = JSON.parse(value);
      const images = await this.imageService.getAll({ where: { id: In(imageIds) } });

      set(data, 'value', images);

      return this.imageService.mapVariantToImages(data, 'value');
    }

    if (type === CONFIG_TYPE_ENUM.CONTACT) {
      set(data, 'value', JSON.parse(value));

      return data;
    }

    if (type === CONFIG_TYPE_ENUM.POST) {
      const post = await this.postService.get({ id: Number(value) });

      set(data, 'value', post);

      return data;
    }

    return data;
  }

  private clearCache(websiteId?: number) {
    return this.cacheService.clearCacheByPattern(MEM_CACHING_KEY_ENUM.WEBSITE_CONFIG, websiteId);
  }
}
