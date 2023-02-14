import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UnitPriceEntity } from '../entities/unit-price.entity';

@Injectable()
export class UnitPriceService extends BaseService {
  constructor(
    @InjectRepository(UnitPriceEntity) private readonly unitPriceRepository: Repository<UnitPriceEntity>,
  ) {
    super();
  }

  get(query: FindOptionsWhere<UnitPriceEntity>) {
    return this.unitPriceRepository.findOneBy(query);
  }

  getAll(query: FindOptionsWhere<UnitPriceEntity>) {
    const queryBuilder = this.queryBuilder;

    if (query.websiteId) {
      queryBuilder.andWhere('unitPrice.website_id = :websiteId', { websiteId: query.websiteId });
    }

    if (query.type) {
      queryBuilder.andWhere('unitPrice.type = :type', { type: query.type });
    }

    return this.getManyAndCount(queryBuilder);
  }

  private get queryBuilder() {
    return this.unitPriceRepository.createQueryBuilder('unitPrice');
  }
}
