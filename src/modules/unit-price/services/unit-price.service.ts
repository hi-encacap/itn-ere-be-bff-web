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
}
