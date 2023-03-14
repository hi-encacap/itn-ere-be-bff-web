import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UNIT_PRICE_TYPE_ENUM } from 'encacap/dist/re';
import { Seeder } from 'nestjs-seeder';
import { UnitPriceEntity } from 'src/modules/unit-price/entities/unit-price.entity';
import { IUnitPrice } from 'src/modules/unit-price/interfaces/unit-price.interface';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Repository } from 'typeorm';

const unitPriceItems: Partial<IUnitPrice>[] = [
  {
    name: 'ha',
    type: UNIT_PRICE_TYPE_ENUM.AREA,
  },
  {
    name: 'm2',
    type: UNIT_PRICE_TYPE_ENUM.AREA,
  },
  {
    name: 'triệu',
    type: UNIT_PRICE_TYPE_ENUM.PRICE,
  },
  {
    name: 'tỷ',
    type: UNIT_PRICE_TYPE_ENUM.PRICE,
  },
];

@Injectable()
export class UnitPriceSeeder implements Seeder {
  constructor(
    @InjectRepository(UnitPriceEntity) private readonly unitPriceRepository: Repository<UnitPriceEntity>,
    @InjectRepository(WebsiteEntity) private readonly websiteRepository: Repository<WebsiteEntity>,
  ) {}

  async upsertItem(item: Partial<IUnitPrice>) {
    const record = await this.unitPriceRepository
      .createQueryBuilder('unitPrice')
      .where('unitPrice.name = :name', { name: item.name })
      .getOne();

    if (record) {
      await this.unitPriceRepository
        .createQueryBuilder()
        .update()
        .set(item)
        .where('id = :id', { id: record.id })
        .execute();
    } else {
      await this.unitPriceRepository.save(item);
    }

    return record;
  }

  async seed() {
    const websites = await this.websiteRepository.find();
    const tasks = [];

    websites.forEach((website) => {
      const items = unitPriceItems.map((item) => ({ ...item, websiteId: website.id }));

      tasks.push(this.unitPriceRepository.save(items));
    });

    await Promise.all(tasks);
  }

  async drop() {
    await this.unitPriceRepository.createQueryBuilder().delete().execute();
  }
}
