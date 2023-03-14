import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { EstateQuarterEntity } from '../entities/estate-quarter.entity';

@Injectable()
export class EstateQuarterService extends BaseService {
  constructor(
    @InjectRepository(EstateQuarterEntity)
    private readonly estateQuarterRepository: Repository<EstateQuarterEntity>,
  ) {
    super();
  }

  getAll() {
    return this.getManyAndCount(this.queryBuilder);
  }

  private get queryBuilder() {
    return this.estateQuarterRepository
      .createQueryBuilder('estateQuarter')
      .orderBy('estateQuarter.order', 'ASC');
  }
}
