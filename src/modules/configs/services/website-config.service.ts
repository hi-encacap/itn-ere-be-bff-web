import { CONFIG_TYPE_ENUM, IConfig, IREUser } from '@encacap-group/common/dist/re';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { set } from 'lodash';
import { BaseService } from 'src/base/base.service';
import { CloudflareImageService } from 'src/modules/cloudflare/services/cloudflare-image.service';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { ConfigCreateBodyDto } from '../dtos/config-create-body.dto';
import { ConfigUpdateBodyDto } from '../dtos/config-update-body.dto';
import { WebsiteConfigListQueryDto } from '../dtos/website-config-list-query.dto';
import { WebsiteConfigEntity } from '../entities/website-config,entity';

@Injectable()
export class WebsiteConfigService extends BaseService {
  constructor(
    @InjectRepository(WebsiteConfigEntity)
    private readonly websiteConfigRepository: Repository<WebsiteConfigEntity>,
    private readonly cloudflareImageService: CloudflareImageService,
  ) {
    super();
  }

  async getAll(query: WebsiteConfigListQueryDto) {
    let queryBuilder = this.queryBuilder;

    if (query.websiteId) {
      queryBuilder = this.setFilterOld(queryBuilder, query, 'websiteConfig', 'websiteId');
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    const normalizedData = await Promise.all(data.map((item) => this.normalizeData(item as IConfig)));

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

    return this.normalizeData(data as IConfig);
  }

  async update(query: FindOptionsWhere<WebsiteConfigEntity>, data: ConfigUpdateBodyDto, user?: IREUser) {
    const record = await this.get(query, false);

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

  private get queryBuilder() {
    return this.websiteConfigRepository.createQueryBuilder('websiteConfig');
  }

  private async normalizeData(data: IConfig) {
    const { type, value } = data;

    if (type === CONFIG_TYPE_ENUM.IMAGE_ARRAY) {
      const imageIds = JSON.parse(value);
      const images = await this.cloudflareImageService.getAll({ where: { id: In(imageIds) } });

      set(data, 'value', images);

      return this.cloudflareImageService.mapVariantToImages(data, 'value');
    }

    if (type === CONFIG_TYPE_ENUM.CONTACT) {
      set(data, 'value', JSON.parse(value));

      return data;
    }

    return data;
  }
}
