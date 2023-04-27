import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { ConfigListQueryDto } from '../dtos/config-list-query.dto';
import { ConfigWebsiteEntity } from '../entities/config-website.entity';
import { ConfigEntity } from '../entities/config.entity';

@Injectable()
export class ConfigService extends BaseService {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>,
  ) {
    super();
  }

  async getAll(query: ConfigListQueryDto) {
    let queryBuilder = this.queryBuilder;
    const { websiteId, codes } = query;

    if (websiteId) {
      queryBuilder.andWhere('configWebsite.websiteId = :websiteId OR configWebsite.websiteId IS NULL', {
        websiteId,
      });
    }

    if (codes) {
      queryBuilder = this.setInOperator(queryBuilder, codes, 'config.code');
    }

    return queryBuilder.getRawMany();
  }

  private get queryBuilder() {
    return this.configRepository
      .createQueryBuilder('config')
      .leftJoinAndMapOne(
        'config.configWebsite',
        ConfigWebsiteEntity,
        'configWebsite',
        'configWebsite.configCode = config.code',
      )
      .select('config.code', 'code')
      .addSelect('config.defaultValue', 'defaultValue')
      .addSelect('configWebsite.value', 'value');
  }
}
