import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ESTATE_QUARTER_ENUM } from 'src/modules/estate/constants/estate-quarter.constant';
import { EstateQuarterEntity } from 'src/modules/estate/entities/estate-quarter.entity';
import { Repository } from 'typeorm';

const estateQuarterItems = [
  {
    code: ESTATE_QUARTER_ENUM.EAST,
    name: 'Đông',
  },
  {
    code: ESTATE_QUARTER_ENUM.WEST,
    name: 'Tây',
  },
  {
    code: ESTATE_QUARTER_ENUM.NORTH,
    name: 'Bắc',
  },
  {
    code: ESTATE_QUARTER_ENUM.SOUTH,
    name: 'Nam',
  },
  {
    code: ESTATE_QUARTER_ENUM.NORTH_EAST,
    name: 'Đông Bắc',
  },
  {
    code: ESTATE_QUARTER_ENUM.NORTH_WEST,
    name: 'Tây Bắc',
  },
  {
    code: ESTATE_QUARTER_ENUM.SOUTH_EAST,
    name: 'Đông Nam',
  },
  {
    code: ESTATE_QUARTER_ENUM.SOUTH_WEST,
    name: 'Tây Nam',
  },
];

@Injectable()
export class EstateQuarterSeeder {
  constructor(
    @InjectRepository(EstateQuarterEntity)
    private readonly estateQuarterRepository: Repository<EstateQuarterEntity>,
  ) {}

  async upsertItem(item) {
    const record = await this.estateQuarterRepository.findOneBy({
      code: item.code,
    });

    if (record) {
      return this.estateQuarterRepository.update(record.code, item);
    }

    return this.estateQuarterRepository.save(item);
  }

  seed() {
    const seedTasks = estateQuarterItems.map((item) => this.upsertItem(item));
    return Promise.all(seedTasks);
  }

  drop() {
    return this.estateQuarterRepository.delete({});
  }
}
