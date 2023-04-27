import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
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

    return this.getManyAndCount(queryBuilder, query);
  }

  private get queryBuilder() {
    return this.websiteConfigRepository.createQueryBuilder('websiteConfig');
  }
}
