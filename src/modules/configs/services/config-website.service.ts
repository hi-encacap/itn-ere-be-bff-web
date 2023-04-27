import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { ConfigListQueryDto } from '../dtos/config-list-query.dto';
import { ConfigWebsiteEntity } from '../entities/config-website.entity';

@Injectable()
export class ConfigWebsiteService extends BaseService {
  constructor(
    @InjectRepository(ConfigWebsiteEntity)
    private readonly configWebsiteRepository: Repository<ConfigWebsiteEntity>,
  ) {
    super();
  }

  async getAll(query: ConfigListQueryDto) {
    let queryBuilder = this.queryBuilder;

    if (query.websiteId) {
      queryBuilder = this.setFilter(queryBuilder, query, 'configWebsite', 'websiteId');
    }

    return queryBuilder.getRawMany();
  }

  private get queryBuilder() {
    return this.configWebsiteRepository.createQueryBuilder('configWebsite');
  }
}
