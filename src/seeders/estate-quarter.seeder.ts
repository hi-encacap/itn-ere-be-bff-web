import { ESTATE_QUARTER_ENUM } from '@encacap-group/common/dist/re';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstateQuarterEntity } from 'src/modules/estate/entities/estate-quarter.entity';
import { IEstateQuarter } from 'src/modules/estate/interfaces/estate-quarter.interface';
import { Repository } from 'typeorm';

const estateQuarterItems: IEstateQuarter[] = [
  {
    code: ESTATE_QUARTER_ENUM.EAST,
    name: 'Đông',
    order: 1,
  },
  {
    code: ESTATE_QUARTER_ENUM.WEST,
    name: 'Tây',
    order: 2,
  },
  {
    code: ESTATE_QUARTER_ENUM.NORTH,
    name: 'Bắc',
    order: 4,
  },
  {
    code: ESTATE_QUARTER_ENUM.SOUTH,
    name: 'Nam',
    order: 3,
  },
  {
    code: ESTATE_QUARTER_ENUM.NORTH_EAST,
    name: 'Đông Bắc',
    order: 5,
  },
  {
    code: ESTATE_QUARTER_ENUM.NORTH_WEST,
    name: 'Tây Bắc',
    order: 6,
  },
  {
    code: ESTATE_QUARTER_ENUM.SOUTH_EAST,
    name: 'Đông Nam',
    order: 7,
  },
  {
    code: ESTATE_QUARTER_ENUM.SOUTH_WEST,
    name: 'Tây Nam',
    order: 8,
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
