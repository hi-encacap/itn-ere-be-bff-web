import { CONFIG_TYPE_ENUM } from '@encacap-group/types/dist/re';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { WebsiteConfigListQueryDto } from '../dtos/website-config-list-query.dto';
import { WebsiteConfigEntity } from '../entities/website-config,entity';

@Injectable()
export class WebsiteConfigService extends BaseService {
  constructor(
    @InjectRepository(WebsiteConfigEntity)
    private readonly websiteConfigRepository: Repository<WebsiteConfigEntity>,
  ) {
    super();
  }

  async getAll(query: WebsiteConfigListQueryDto) {
    let queryBuilder = this.queryBuilder;

    if (query.websiteId) {
      queryBuilder = this.setFilter(queryBuilder, query, 'websiteConfig', 'websiteId');
    }

    const [data, total] = await queryBuilder.getManyAndCount();
    const normalizedData = data.map((item) => this.normalizeData(item));

    return this.generateGetAllResponse(normalizedData, total, query);
  }

  async get(query: FindOptionsWhere<WebsiteConfigEntity>) {
    const data = await this.websiteConfigRepository.findOneBy(query);

    if (!data) {
      throw new NotFoundException();
    }

    return this.normalizeData(data);
  }

  private get queryBuilder() {
    return this.websiteConfigRepository.createQueryBuilder('websiteConfig');
  }

  private normalizeData(data: WebsiteConfigEntity) {
    const { type } = data;

    if (type === CONFIG_TYPE_ENUM.BOOLEAN) {
      data.value = Boolean(data.value);
    }

    if (type === CONFIG_TYPE_ENUM.NUMBER) {
      data.value = Number(data.value);
    }

    return data;
  }
}
