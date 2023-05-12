import { CONFIG_TYPE_ENUM, IConfig } from '@encacap-group/types/dist/re';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { set } from 'lodash';
import { BaseService } from 'src/base/base.service';
import { CloudflareImageService } from 'src/modules/cloudflare/services/cloudflare-image.service';
import { FindOptionsWhere, In, Repository } from 'typeorm';
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
      queryBuilder = this.setFilter(queryBuilder, query, 'websiteConfig', 'websiteId');
    }

    const [data, total] = await queryBuilder.getManyAndCount();
    const normalizedData = await Promise.all(data.map((item) => this.normalizeData(item as IConfig)));

    return this.generateGetAllResponse(normalizedData, total, query);
  }

  async get(query: FindOptionsWhere<WebsiteConfigEntity>) {
    const data = await this.websiteConfigRepository.findOneBy(query);

    if (!data) {
      throw new NotFoundException();
    }

    return this.normalizeData(data as IConfig);
  }

  async update(query: FindOptionsWhere<WebsiteConfigEntity>, data: Partial<IConfig>) {
    const record = await this.get(query);

    return this.websiteConfigRepository.update(record.id, data);
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

    return data;
  }
}
