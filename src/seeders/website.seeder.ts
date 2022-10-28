import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { IWebsite } from 'src/modules/website/constants/website.interface';
import { WebsiteEntity } from 'src/modules/website/entities/website.entity';
import { Repository } from 'typeorm';

const websiteItems: IWebsite[] = [
  {
    id: 1,
    name: 'Encacap',
    url: 'https://www.encacap.com',
    description: 'This is a description',
  },
];

@Injectable()
export class WebsiteSeeder implements Seeder {
  constructor(
    @InjectRepository(WebsiteEntity) private readonly websiteRepository: Repository<WebsiteEntity>,
  ) {}

  async upsertItem(item: IWebsite) {
    const record = await this.websiteRepository.findOneBy({ id: item.id });

    if (record) {
      return this.websiteRepository.update(record.id, item);
    }

    return this.websiteRepository.save(item);
  }

  seed() {
    const seedTasks = websiteItems.map((item) => this.upsertItem(item));
    return Promise.all(seedTasks);
  }

  drop() {
    return this.websiteRepository.delete({});
  }
}
